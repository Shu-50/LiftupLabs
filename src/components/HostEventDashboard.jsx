import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import apiService from '../services/api'

const HostEventDashboard = ({ event, onClose, onEditEvent, onDeleteEvent }) => {
    const { user } = useAuth()
    const { showSuccess, showError } = useNotification()
    const [participants, setParticipants] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('participants')

    useEffect(() => {
        fetchEventDetails()
    }, [event._id])

    const fetchEventDetails = async () => {
        try {
            setLoading(true)
            const response = await apiService.getEventParticipants(event._id)
            setParticipants(response.data.participants || [])
        } catch (error) {
            console.error('Error fetching event details:', error)
            showError('Failed to load event details')
        } finally {
            setLoading(false)
        }
    }

    const updateParticipantStatus = async (participantId, newStatus) => {
        try {
            await apiService.updateParticipantStatus(event._id, participantId, newStatus)
            showSuccess(`Participant status updated to ${newStatus}`)
            fetchEventDetails()
        } catch (error) {
            console.error('Error updating participant status:', error)
            showError('Failed to update participant status')
        }
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
        a.download = `${event.title}-participants-with-teams.csv`
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800'
            case 'attended': return 'bg-blue-100 text-blue-800'
            case 'cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-yellow-100 text-yellow-800'
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.24)' }}>
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
                            <p className="text-gray-600">{event.title}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-6 mt-4">
                        <button
                            onClick={() => setActiveTab('participants')}
                            className={`pb-2 border-b-2 font-medium text-sm ${activeTab === 'participants'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Participants ({participants.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`pb-2 border-b-2 font-medium text-sm ${activeTab === 'analytics'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Analytics
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`pb-2 border-b-2 font-medium text-sm ${activeTab === 'settings'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Settings
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {activeTab === 'participants' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Registered Participants</h3>
                                    <p className="text-gray-600">
                                        {participants.length} participants registered
                                    </p>
                                </div>
                                <button
                                    onClick={exportParticipants}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700"
                                >
                                    Export CSV
                                </button>
                            </div>

                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                                    <p className="text-gray-600 mt-2">Loading participants...</p>
                                </div>
                            ) : participants.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-6xl mb-4">👥</div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Participants Yet</h3>
                                    <p className="text-gray-500">Participants will appear here once they register for your event.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Participant
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Contact
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Team Info
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Registered
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {participants.map((participant, index) => (
                                                <tr key={participant._id || index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {participant.user?.name || 'N/A'}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {participant.user?.email || 'N/A'}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {participant.institution || 'No institution'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            📞 {participant.phone || 'N/A'}
                                                        </div>
                                                        {participant.alternateEmail && (
                                                            <div className="text-sm text-gray-500">
                                                                📧 {participant.alternateEmail}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {participant.teamName ? (
                                                                <>
                                                                    <div className="font-medium">{participant.teamName}</div>
                                                                    <div className="text-gray-500">
                                                                        {participant.teamSize || 1} member{(participant.teamSize || 1) > 1 ? 's' : ''}
                                                                    </div>
                                                                    {participant.teamMembers && participant.teamMembers.length > 0 && (
                                                                        <div className="mt-1">
                                                                            <details className="cursor-pointer">
                                                                                <summary className="text-xs text-blue-600 hover:text-blue-800">
                                                                                    View Team Members ({participant.teamMembers.length})
                                                                                </summary>
                                                                                <div className="mt-2 pl-2 border-l-2 border-gray-200">
                                                                                    {participant.teamMembers.map((member, idx) => (
                                                                                        <div key={idx} className="text-xs text-gray-600 mb-1">
                                                                                            <div className="font-medium">{member.name}</div>
                                                                                            {member.email && <div>📧 {member.email}</div>}
                                                                                            {member.phone && <div>📞 {member.phone}</div>}
                                                                                            {member.role && <div>👤 {member.role}</div>}
                                                                                            {member.institution && <div>🏢 {member.institution}</div>}
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </details>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <span className="text-gray-500">Individual</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(participant.status)}`}>
                                                            {participant.status || 'registered'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(participant.registeredAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <select
                                                            value={participant.status || 'registered'}
                                                            onChange={(e) => updateParticipantStatus(participant._id, e.target.value)}
                                                            className="text-sm border border-gray-300 rounded px-2 py-1"
                                                        >
                                                            <option value="registered">Registered</option>
                                                            <option value="confirmed">Confirmed</option>
                                                            <option value="attended">Attended</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Analytics</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                    <div className="text-blue-600 text-3xl mb-2">👥</div>
                                    <div className="text-2xl font-bold text-blue-900">{participants.length}</div>
                                    <div className="text-blue-700">Total Registrations</div>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                    <div className="text-green-600 text-3xl mb-2">✅</div>
                                    <div className="text-2xl font-bold text-green-900">
                                        {participants.filter(p => p.status === 'confirmed').length}
                                    </div>
                                    <div className="text-green-700">Confirmed</div>
                                </div>

                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                                    <div className="text-orange-600 text-3xl mb-2">👁️</div>
                                    <div className="text-2xl font-bold text-orange-900">{event.views || 0}</div>
                                    <div className="text-orange-700">Event Views</div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Registration Timeline</h4>
                                <div className="space-y-2">
                                    {participants.slice(0, 5).map((participant, index) => (
                                        <div key={index} className="flex items-center justify-between py-2">
                                            <span className="text-sm text-gray-700">
                                                {participant.user?.name} registered
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(participant.registeredAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Settings</h3>

                            <div className="space-y-6">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-yellow-900 mb-2">Event Status</h4>
                                    <p className="text-yellow-800 text-sm mb-3">
                                        Current status: <span className="font-medium capitalize">{event.status}</span>
                                    </p>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onEditEvent?.(event)}
                                            className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                                        >
                                            Edit Event
                                        </button>
                                        <button
                                            onClick={() => onDeleteEvent?.(event._id, event.title)}
                                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                        >
                                            Delete Event
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-900 mb-3">Registration Settings</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-700 text-sm">Deadline:</span>
                                            <span className="text-blue-900 font-medium text-sm">
                                                {new Date(event.registration?.deadline).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-700 text-sm">Max Participants:</span>
                                            <span className="text-blue-900 font-medium text-sm">
                                                {event.registration?.maxParticipants || 'Unlimited'}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-700 text-sm">Registration Fee:</span>
                                            <span className="text-blue-900 font-medium text-sm">
                                                {event.registration?.fee?.isFree === false ?
                                                    `₹${event.registration.fee.amount} ${event.registration.fee.currency || 'INR'}` :
                                                    'Free'
                                                }
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-700 text-sm">Team Size:</span>
                                            <span className="text-blue-900 font-medium text-sm">
                                                {event.registration?.teamSize?.min === event.registration?.teamSize?.max ?
                                                    `${event.registration.teamSize.min} member${event.registration.teamSize.min > 1 ? 's' : ''}` :
                                                    `${event.registration?.teamSize?.min || 1} - ${event.registration?.teamSize?.max || 1} members`
                                                }
                                            </span>
                                        </div>

                                        {event.registration?.fee?.isFree === false && (
                                            <div className="border-t border-blue-200 pt-3 mt-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-blue-700 text-sm">Revenue Generated:</span>
                                                    <span className="text-blue-900 font-bold text-sm">
                                                        ₹{((event.registration?.fee?.amount || 0) * participants.length).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                                    <div className="text-gray-700 text-sm space-y-1">
                                        <p>📧 {event.organizer?.contact?.email}</p>
                                        {event.organizer?.contact?.phone && (
                                            <p>📞 {event.organizer?.contact?.phone}</p>
                                        )}
                                        {event.organizer?.contact?.website && (
                                            <p>🌐 <a href={event.organizer.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {event.organizer.contact.website}
                                            </a></p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HostEventDashboard