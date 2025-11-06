import { useState, useEffect } from 'react'
import apiService from '../services/api'

const EventDetailsModal = ({ event, onClose }) => {
    const [participants, setParticipants] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await apiService.getEventParticipants(event._id)
                setParticipants(response.data.participants || [])
            } catch (error) {
                console.error('Error fetching participants:', error)
                setParticipants([])
            } finally {
                setLoading(false)
            }
        }

        if (event) {
            fetchParticipants()
        }
    }, [event])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'registered':
                return 'bg-blue-100 text-blue-700'
            case 'confirmed':
                return 'bg-green-100 text-green-700'
            case 'attended':
                return 'bg-purple-100 text-purple-700'
            case 'cancelled':
                return 'bg-red-100 text-red-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    const getEventStatusColor = (status) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-700'
            case 'draft':
                return 'bg-yellow-100 text-yellow-700'
            case 'cancelled':
                return 'bg-red-100 text-red-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    if (!event) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.24)' }}>
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
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
                    <div className="border-b border-gray-200 pb-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
                                <div className="flex items-center space-x-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getEventStatusColor(event.status)}`}>
                                        {event.status}
                                    </span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full capitalize">
                                        {event.category}
                                    </span>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                                        {event.mode}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-600">Event ID</div>
                                <div className="font-mono text-sm">{event._id}</div>
                            </div>
                        </div>
                        <p className="text-gray-700">{event.description}</p>
                    </div>

                    {/* Event Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Event Information</h3>

                            <div>
                                <div className="text-sm font-medium text-gray-700">Start Date & Time</div>
                                <div className="text-gray-900">{formatDate(event.dateTime?.start)}</div>
                            </div>

                            <div>
                                <div className="text-sm font-medium text-gray-700">End Date & Time</div>
                                <div className="text-gray-900">{formatDate(event.dateTime?.end)}</div>
                            </div>

                            <div>
                                <div className="text-sm font-medium text-gray-700">Registration Deadline</div>
                                <div className="text-gray-900">{formatDate(event.registration?.deadline)}</div>
                            </div>

                            {(event.mode === 'Offline' || event.mode === 'Hybrid') && (
                                <div>
                                    <div className="text-sm font-medium text-gray-700">Location</div>
                                    <div className="text-gray-900">
                                        {event.location?.venue && <div>{event.location.venue}</div>}
                                        {event.location?.address && <div>{event.location.address}</div>}
                                        {event.location?.city && <div>{event.location.city}</div>}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Registration Details</h3>

                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-sm font-medium text-orange-700">Current Participants</div>
                                    <div className="text-2xl font-bold text-orange-600">
                                        {event.registration?.currentParticipants || 0}
                                        {event.registration?.maxParticipants && (
                                            <span className="text-lg text-gray-500">
                                                /{event.registration.maxParticipants}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-xs text-orange-600">
                                    {event.registration?.maxParticipants ?
                                        `${((event.registration?.currentParticipants || 0) / event.registration.maxParticipants * 100).toFixed(1)}% capacity filled` :
                                        'Unlimited capacity'
                                    }
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <div className="text-sm font-medium text-green-700">Registration Fee</div>
                                    <div className="text-lg font-bold text-green-900">
                                        {event.registration?.fee?.isFree === false ?
                                            `₹${event.registration.fee.amount}` :
                                            'Free'
                                        }
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <div className="text-sm font-medium text-blue-700">Team Size</div>
                                    <div className="text-lg font-bold text-blue-900">
                                        {event.registration?.teamSize?.min === event.registration?.teamSize?.max ?
                                            `${event.registration.teamSize.min}` :
                                            `${event.registration?.teamSize?.min || 1}-${event.registration?.teamSize?.max || 1}`
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-700">Event Views</div>
                                    <div className="text-xl font-semibold text-gray-900">{event.views || 0}</div>
                                </div>

                                <div>
                                    <div className="text-sm font-medium text-gray-700">Created</div>
                                    <div className="text-sm text-gray-900">{formatDate(event.createdAt)}</div>
                                </div>
                            </div>

                            {event.registration?.fee?.isFree === false && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                    <div className="text-sm font-medium text-yellow-700">Revenue Generated</div>
                                    <div className="text-lg font-bold text-yellow-900">
                                        ₹{((event.registration?.fee?.amount || 0) * (event.registration?.currentParticipants || 0)).toLocaleString()}
                                    </div>
                                    <div className="text-xs text-yellow-600">
                                        From {event.registration?.currentParticipants || 0} paid registrations
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Prizes */}
                    {event.prizes && event.prizes.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prizes</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {event.prizes.map((prize, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="font-medium text-gray-900">{prize.position}</div>
                                        <div className="text-2xl font-bold text-orange-600">₹{prize.amount}</div>
                                        {prize.description && (
                                            <div className="text-sm text-gray-600 mt-1">{prize.description}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    {event.tags && event.tags.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {event.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Requirements */}
                    {event.requirements && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-700 whitespace-pre-wrap">{event.requirements}</p>
                            </div>
                        </div>
                    )}

                    {/* Contact Information */}
                    {event.organizer?.contact && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                {event.organizer.contact.email && (
                                    <div>
                                        <span className="font-medium">Email: </span>
                                        <a href={`mailto:${event.organizer.contact.email}`} className="text-orange-600 hover:text-orange-700">
                                            {event.organizer.contact.email}
                                        </a>
                                    </div>
                                )}
                                {event.organizer.contact.phone && (
                                    <div>
                                        <span className="font-medium">Phone: </span>
                                        <a href={`tel:${event.organizer.contact.phone}`} className="text-orange-600 hover:text-orange-700">
                                            {event.organizer.contact.phone}
                                        </a>
                                    </div>
                                )}
                                {event.organizer.contact.website && (
                                    <div>
                                        <span className="font-medium">Website: </span>
                                        <a href={event.organizer.contact.website} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700">
                                            {event.organizer.contact.website}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Participants List */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Participants ({participants.length})
                            </h3>
                            {participants.length > 0 && (
                                <button
                                    onClick={() => {
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
                                        a.download = `${event.title}-participants.csv`
                                        a.click()
                                        window.URL.revokeObjectURL(url)
                                    }}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                                >
                                    Export CSV
                                </button>
                            )}
                        </div>
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                                <p className="text-gray-600 mt-2">Loading participants...</p>
                            </div>
                        ) : participants.length > 0 ? (
                            <div className="bg-gray-50 rounded-lg overflow-hidden">
                                <div className="max-h-64 overflow-y-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-100 sticky top-0">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Team</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Registered</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {participants.map((participant) => (
                                                <tr key={participant._id} className="border-t border-gray-200">
                                                    <td className="px-4 py-2 text-sm">
                                                        <div className="text-gray-900 font-medium">
                                                            {participant.user?.name || 'N/A'}
                                                        </div>
                                                        {participant.institution && (
                                                            <div className="text-gray-500 text-xs">
                                                                🏢 {participant.institution}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-600">
                                                        <div>{participant.user?.email || 'N/A'}</div>
                                                        {participant.phone && (
                                                            <div className="text-xs text-gray-500">📞 {participant.phone}</div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm">
                                                        {participant.teamName ? (
                                                            <div>
                                                                <div className="font-medium text-gray-900">{participant.teamName}</div>
                                                                <div className="text-xs text-gray-500">
                                                                    {participant.teamSize || 1} member{(participant.teamSize || 1) > 1 ? 's' : ''}
                                                                </div>
                                                                {participant.teamMembers && participant.teamMembers.length > 0 && (
                                                                    <details className="mt-1">
                                                                        <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">
                                                                            Team Members ({participant.teamMembers.length})
                                                                        </summary>
                                                                        <div className="mt-1 pl-2 border-l-2 border-gray-200 space-y-1">
                                                                            {participant.teamMembers.map((member, idx) => (
                                                                                <div key={idx} className="text-xs text-gray-600">
                                                                                    <div className="font-medium">{member.name}</div>
                                                                                    {member.email && <div>📧 {member.email}</div>}
                                                                                    {member.role && <div>👤 {member.role}</div>}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </details>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-500 text-xs">Individual</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(participant.status)}`}>
                                                            {participant.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-600">
                                                        {new Date(participant.registeredAt).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <div className="text-4xl mb-2">👥</div>
                                <p className="text-gray-600">No participants yet</p>
                            </div>
                        )}
                    </div>
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

export default EventDetailsModal