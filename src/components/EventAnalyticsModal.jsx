import { useState, useEffect } from 'react'
import apiService from '../services/api'

const EventAnalyticsModal = ({ event, onClose }) => {
    const [participants, setParticipants] = useState([])
    const [loading, setLoading] = useState(true)
    const [analytics, setAnalytics] = useState({
        totalRegistrations: 0,
        confirmedParticipants: 0,
        attendedParticipants: 0,
        cancelledRegistrations: 0,
        registrationTrend: [],
        statusDistribution: {},
        dailyRegistrations: {}
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try to fetch analytics from backend first
                try {
                    const analyticsResponse = await apiService.getEventAnalytics(event._id)
                    if (analyticsResponse.data.analytics) {
                        setAnalytics(analyticsResponse.data.analytics)
                    }
                } catch (analyticsError) {
                    console.log('Analytics endpoint not available, calculating client-side')
                }

                // Always fetch participants for the table
                const response = await apiService.getEventParticipants(event._id)
                const participantData = response.data.participants || []
                setParticipants(participantData)

                // Calculate analytics client-side as fallback
                calculateAnalytics(participantData)
            } catch (error) {
                console.error('Error fetching participants:', error)
                setParticipants([])
            } finally {
                setLoading(false)
            }
        }

        if (event) {
            fetchData()
        }
    }, [event])

    const calculateAnalytics = (participantData) => {
        const statusCounts = {
            registered: 0,
            confirmed: 0,
            attended: 0,
            cancelled: 0
        }

        const dailyRegistrations = {}

        participantData.forEach(participant => {
            // Count by status
            statusCounts[participant.status] = (statusCounts[participant.status] || 0) + 1

            // Count by registration date
            const regDate = new Date(participant.registeredAt).toDateString()
            dailyRegistrations[regDate] = (dailyRegistrations[regDate] || 0) + 1
        })

        // Calculate registration trend (last 7 days)
        const last7Days = []
        const today = new Date()
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            const dateStr = date.toDateString()
            last7Days.push({
                date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
                count: dailyRegistrations[dateStr] || 0
            })
        }

        setAnalytics({
            totalRegistrations: participantData.length,
            confirmedParticipants: statusCounts.confirmed,
            attendedParticipants: statusCounts.attended,
            cancelledRegistrations: statusCounts.cancelled,
            registrationTrend: last7Days,
            statusDistribution: statusCounts,
            dailyRegistrations
        })
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'registered':
                return 'bg-blue-500'
            case 'confirmed':
                return 'bg-green-500'
            case 'attended':
                return 'bg-purple-500'
            case 'cancelled':
                return 'bg-red-500'
            default:
                return 'bg-gray-500'
        }
    }

    const calculatePercentage = (value, total) => {
        return total > 0 ? ((value / total) * 100).toFixed(1) : 0
    }

    const exportParticipants = () => {
        const csvRows = []

        // Header row
        csvRows.push([
            'Participant Name', 'Participant Email', 'Phone', 'Institution',
            'Team Name', 'Team Size', 'Status', 'Registered At',
            'Team Member Name', 'Team Member Email', 'Team Member Phone',
            'Team Member Role', 'Team Member Institution'
        ].join(','))

        // Data rows
        participants.forEach(p => {
            const baseData = [
                p.user?.name || 'N/A',
                p.user?.email || 'N/A',
                p.phone || 'N/A',
                p.institution || 'N/A',
                p.teamName || 'Individual',
                p.teamSize || 1,
                p.status || 'registered',
                new Date(p.registeredAt).toLocaleDateString()
            ]

            if (p.teamMembers && p.teamMembers.length > 0) {
                // Add a row for each team member
                p.teamMembers.forEach(member => {
                    csvRows.push([
                        ...baseData,
                        member.name || 'N/A',
                        member.email || 'N/A',
                        member.phone || 'N/A',
                        member.role || 'N/A',
                        member.institution || 'N/A'
                    ].join(','))
                })
            } else {
                // Add a single row for individual participant
                csvRows.push([
                    ...baseData,
                    '', '', '', '', '' // Empty team member fields
                ].join(','))
            }
        })

        const csvContent = csvRows.join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${event.title}-analytics-export.csv`
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const maxRegistrationsInDay = Math.max(...analytics.registrationTrend.map(day => day.count), 1)

    if (!event) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.24)' }}>
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Event Analytics</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Event Header */}
                    <div className="border-b border-gray-200 pb-4">
                        <h1 className="text-xl font-bold text-gray-900">{event.title}</h1>
                        <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Event Date: {formatDate(event.dateTime?.start)}</span>
                            <span className="text-sm text-gray-600">Views: {event.views || 0}</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                            <p className="text-gray-600 mt-4">Loading analytics...</p>
                        </div>
                    ) : (
                        <>
                            {/* Key Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-blue-600 text-sm font-medium">Total Registrations</p>
                                            <p className="text-3xl font-bold text-blue-900">{analytics.totalRegistrations}</p>
                                        </div>
                                        <div className="text-blue-500 text-2xl">📊</div>
                                    </div>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-green-600 text-sm font-medium">Confirmed</p>
                                            <p className="text-3xl font-bold text-green-900">{analytics.confirmedParticipants}</p>
                                            <p className="text-green-600 text-xs">
                                                {calculatePercentage(analytics.confirmedParticipants, analytics.totalRegistrations)}% of total
                                            </p>
                                        </div>
                                        <div className="text-green-500 text-2xl">✅</div>
                                    </div>
                                </div>

                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-purple-600 text-sm font-medium">Attended</p>
                                            <p className="text-3xl font-bold text-purple-900">{analytics.attendedParticipants}</p>
                                            <p className="text-purple-600 text-xs">
                                                {calculatePercentage(analytics.attendedParticipants, analytics.totalRegistrations)}% of total
                                            </p>
                                        </div>
                                        <div className="text-purple-500 text-2xl">🎯</div>
                                    </div>
                                </div>

                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-orange-600 text-sm font-medium">Event Views</p>
                                            <p className="text-3xl font-bold text-orange-900">{event.views || 0}</p>
                                            <p className="text-orange-600 text-xs">
                                                {analytics.totalRegistrations > 0 ?
                                                    `${((analytics.totalRegistrations / (event.views || 1)) * 100).toFixed(1)}% conversion` :
                                                    'No conversions yet'
                                                }
                                            </p>
                                        </div>
                                        <div className="text-orange-500 text-2xl">👁️</div>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Trend */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Trend (Last 7 Days)</h3>
                                <div className="flex items-end space-x-2 h-32">
                                    {analytics.registrationTrend.map((day, index) => (
                                        <div key={index} className="flex-1 flex flex-col items-center">
                                            <div
                                                className="bg-orange-500 rounded-t w-full min-h-[4px] transition-all duration-300"
                                                style={{
                                                    height: `${(day.count / maxRegistrationsInDay) * 100}%`
                                                }}
                                                title={`${day.count} registrations`}
                                            ></div>
                                            <div className="text-xs text-gray-600 mt-2 text-center">{day.date}</div>
                                            <div className="text-xs font-medium text-gray-900">{day.count}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Status Distribution */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
                                    <div className="space-y-3">
                                        {Object.entries(analytics.statusDistribution).map(([status, count]) => (
                                            <div key={status} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                                                    <span className="capitalize text-gray-700">{status}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium text-gray-900">{count}</span>
                                                    <span className="text-sm text-gray-500">
                                                        ({calculatePercentage(count, analytics.totalRegistrations)}%)
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Performance</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Capacity Utilization</span>
                                            <span className="font-medium">
                                                {event.registration?.maxParticipants ?
                                                    `${calculatePercentage(analytics.totalRegistrations, event.registration.maxParticipants)}%` :
                                                    'Unlimited'
                                                }
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Attendance Rate</span>
                                            <span className="font-medium">
                                                {calculatePercentage(analytics.attendedParticipants, analytics.confirmedParticipants)}%
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Cancellation Rate</span>
                                            <span className="font-medium">
                                                {calculatePercentage(analytics.cancelledRegistrations, analytics.totalRegistrations)}%
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Revenue Generated</span>
                                            <span className="font-medium">
                                                ₹{((event.registration?.fee || 0) * analytics.totalRegistrations).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Registrations */}
                            {participants.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Recent Registrations</h3>
                                        <button
                                            onClick={exportParticipants}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                                        >
                                            Export All Data (CSV)
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-2 text-sm font-medium text-gray-700">Name</th>
                                                    <th className="text-left py-2 text-sm font-medium text-gray-700">Email</th>
                                                    <th className="text-left py-2 text-sm font-medium text-gray-700">Status</th>
                                                    <th className="text-left py-2 text-sm font-medium text-gray-700">Registered</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {participants.slice(0, 5).map((participant) => (
                                                    <tr key={participant._id} className="border-b border-gray-100">
                                                        <td className="py-2 text-sm text-gray-900">
                                                            {participant.user?.name || 'N/A'}
                                                        </td>
                                                        <td className="py-2 text-sm text-gray-600">
                                                            {participant.user?.email || 'N/A'}
                                                        </td>
                                                        <td className="py-2">
                                                            <span className={`px-2 py-1 text-xs rounded-full capitalize ${participant.status === 'registered' ? 'bg-blue-100 text-blue-700' :
                                                                participant.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                                    participant.status === 'attended' ? 'bg-purple-100 text-purple-700' :
                                                                        'bg-red-100 text-red-700'
                                                                }`}>
                                                                {participant.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-2 text-sm text-gray-600">
                                                            {new Date(participant.registeredAt).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {participants.length > 5 && (
                                        <div className="text-center mt-4">
                                            <span className="text-sm text-gray-600">
                                                Showing 5 of {participants.length} participants
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventAnalyticsModal