import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import apiService from '../services/api'
import HostEventDashboard from '../components/HostEventDashboard'
import EditEventModal from '../components/EditEventModal'
import EventDetailsModal from '../components/EventDetailsModal'
import EventAnalyticsModal from '../components/EventAnalyticsModal'

const MyEventsDashboard = () => {
    const [activeTab, setActiveTab] = useState('registered')
    const [registeredEvents, setRegisteredEvents] = useState([])
    const [hostedEvents, setHostedEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [showHostDashboard, setShowHostDashboard] = useState(false)
    const [selectedHostEvent, setSelectedHostEvent] = useState(null)
    const [showEditForm, setShowEditForm] = useState(false)
    const [eventToEdit, setEventToEdit] = useState(null)
    const [showEventDetails, setShowEventDetails] = useState(false)
    const [eventToView, setEventToView] = useState(null)
    const [showAnalytics, setShowAnalytics] = useState(false)
    const [eventForAnalytics, setEventForAnalytics] = useState(null)
    const { user } = useAuth()
    const { showSuccess, showError } = useNotification()

    // Fetch registered events
    const fetchRegisteredEvents = async () => {
        try {
            const response = await apiService.getRegisteredEvents()
            setRegisteredEvents(response.data.registeredEvents || [])
        } catch (error) {
            console.error('Error fetching registered events:', error)
            showError('Failed to load registered events')
            setRegisteredEvents([])
        }
    }

    // Fetch hosted events
    const fetchHostedEvents = async () => {
        try {
            const response = await apiService.getHostedEvents()
            setHostedEvents(response.data.events || [])
        } catch (error) {
            console.error('Error fetching hosted events:', error)
            showError('Failed to load hosted events')
            setHostedEvents([])
        }
    }

    // Load data on component mount
    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await Promise.all([
                fetchRegisteredEvents(),
                fetchHostedEvents()
            ])
            setLoading(false)
        }

        if (user) {
            loadData()
        }
    }, [user])

    // Handle unregistration
    const handleUnregister = async (eventId, eventTitle) => {
        if (!confirm(`Are you sure you want to unregister from "${eventTitle}"?`)) {
            return
        }

        try {
            await apiService.unregisterFromEvent(eventId)
            showSuccess('Successfully unregistered from event')
            await fetchRegisteredEvents() // Refresh the list
        } catch (error) {
            console.error('Unregistration error:', error)
            showError('Failed to unregister from event')
        }
    }

    // Handle event deletion
    const handleDeleteEvent = async (eventId, eventTitle) => {
        if (!confirm(`Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`)) {
            return
        }

        try {
            await apiService.deleteEvent(eventId)
            showSuccess('Event deleted successfully')
            await fetchHostedEvents() // Refresh the list
        } catch (error) {
            console.error('Delete event error:', error)
            showError(error.response?.data?.message || 'Failed to delete event')
        }
    }

    // Handle edit event
    const handleEditEvent = (event) => {
        setEventToEdit(event)
        setShowEditForm(true)
    }

    // Handle view event details
    const handleViewDetails = (event) => {
        setEventToView(event)
        setShowEventDetails(true)
    }

    // Handle view analytics
    const handleViewAnalytics = (event) => {
        setEventForAnalytics(event)
        setShowAnalytics(true)
    }

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    // Format registration date
    const formatRegistrationDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    // Get status color
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

    const RegisteredEventCard = ({ registration }) => {
        const event = registration.event
        if (!event) return null

        return (
            <div className="border border-gray-200 rounded-lg p-2 sm:p-6 hover:shadow-md transition-shadow flex flex-col h-full bg-white">
                <div className="flex items-start justify-between mb-2 sm:mb-4 flex-1">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-lg font-semibold text-gray-900 mb-1 leading-tight line-clamp-2">{event.title}</h3>
                        <div className="space-y-0.5 text-[10px] sm:text-sm text-gray-600">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                                <span className="truncate">📅 {formatDate(event.dateTime?.start)}</span>
                                <span className="truncate">📍 {event.location?.city || event.location?.venue || 'TBD'}</span>
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-4 truncate">
                                <span className="truncate">🏢 {event.organizer?.name}</span>
                                <span className="hidden sm:inline">📝 Registered: {formatRegistrationDate(registration.registeredAt)}</span>
                            </div>
                            <div className="sm:hidden mt-1">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium capitalize ${getStatusColor(registration.status)}`}>
                                    {registration.status}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right hidden sm:block">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(registration.status)}`}>
                            {registration.status}
                        </span>
                        <div className="mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded capitalize">
                                {event.category}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-2 sm:flex-row sm:space-x-3">
                    <button
                        onClick={() => handleViewDetails(event)}
                        className="px-2 py-1 sm:px-4 sm:py-2 bg-orange-600 text-white rounded-lg text-[10px] sm:text-sm font-medium hover:bg-orange-700 text-center"
                    >
                        View
                    </button>
                    <button
                        onClick={() => handleUnregister(event._id, event.title)}
                        className="px-2 py-1 sm:px-4 sm:py-2 border border-red-300 text-red-700 rounded-lg text-[10px] sm:text-sm font-medium hover:bg-red-50 text-center"
                    >
                        Unregister
                    </button>
                </div>
            </div>
        )
    }

    const HostedEventCard = ({ event }) => (
        <div className="border border-gray-200 rounded-lg p-2 sm:p-6 hover:shadow-md transition-shadow flex flex-col h-full bg-white">
            <div className="flex items-start justify-between mb-2 sm:mb-4 flex-1">
                <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-lg font-semibold text-gray-900 mb-1 leading-tight line-clamp-2">{event.title}</h3>
                    <div className="space-y-0.5 text-[10px] sm:text-sm text-gray-600">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                            <span className="truncate">📅 {formatDate(event.dateTime?.start)}</span>
                            <span className="truncate">📍 {event.location?.city || event.location?.venue || 'TBD'}</span>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <span>👥 {event.registration?.currentParticipants || 0}</span>
                            <span>👁️ {event.views || 0}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right hidden sm:block">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${event.status === 'published' ? 'bg-green-100 text-green-700' :
                        event.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                        {event.status}
                    </span>
                    <div className="mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded capitalize">
                            {event.category}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-1 mt-2 sm:flex sm:space-x-3">
                <button
                    onClick={() => {
                        setSelectedHostEvent(event)
                        setShowHostDashboard(true)
                    }}
                    className="col-span-2 px-2 py-1 sm:px-4 sm:py-2 bg-orange-600 text-white rounded-lg text-[10px] sm:text-sm font-medium hover:bg-orange-700 text-center"
                >
                    Manage
                </button>
                <button
                    onClick={() => handleEditEvent(event)}
                    className="px-2 py-1 sm:px-4 sm:py-2 border border-blue-300 text-blue-700 rounded-lg text-[10px] sm:text-sm font-medium hover:bg-blue-50 text-center"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleViewDetails(event)}
                    className="px-2 py-1 sm:px-4 sm:py-2 border border-orange-300 text-orange-700 rounded-lg text-[10px] sm:text-sm font-medium hover:bg-orange-50 text-center"
                >
                    View
                </button>
                <button
                    onClick={() => handleViewAnalytics(event)}
                    className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-gray-700 rounded-lg text-[10px] sm:text-sm font-medium hover:bg-gray-50 text-center"
                >
                    Stats
                </button>
                <button
                    onClick={() => handleDeleteEvent(event._id, event.title)}
                    className="px-2 py-1 sm:px-4 sm:py-2 border border-red-300 text-red-700 rounded-lg text-[10px] sm:text-sm font-medium hover:bg-red-50 text-center"
                >
                    Del
                </button>
            </div>
        </div>
    )

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 border border-orange-200">
                    <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="bg-white rounded-lg border border-orange-200">
                    <div className="p-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="border border-gray-200 rounded-lg p-6 mb-4 animate-pulse">
                                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                <div className="flex space-x-3">
                                    <div className="h-8 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-8 w-24 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-3 sm:p-6 border border-orange-200">
                <h1 className="text-xl sm:text-3xl font-bold text-orange-900 mb-1 sm:mb-2 text-center sm:text-left">My Events</h1>
                <p className="text-gray-700 text-xs sm:text-base text-center sm:text-left">Manage your events</p>
            </div>

            <div className="bg-white rounded-lg border border-orange-200">
                <div className="border-b border-orange-200">
                    <nav className="flex space-x-4 sm:space-x-8 px-3 sm:px-6 overflow-x-auto">
                        {[
                            { id: 'registered', label: 'Registered Events', count: registeredEvents.length },
                            { id: 'hosted', label: 'Hosted Events', count: hostedEvents.length }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                    ? 'border-orange-600 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <span>{tab.label}</span>
                                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-3 sm:p-6">
                    {activeTab === 'registered' && (
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:space-y-4 sm:gap-0">
                            {registeredEvents.length > 0 ? (
                                registeredEvents.map((registration) => (
                                    <RegisteredEventCard key={registration._id} registration={registration} />
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📅</div>
                                    <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2">No registered events</h3>
                                    <p className="text-gray-600 mb-4 text-xs sm:text-base">You haven't registered for any events yet</p>
                                    <button
                                        onClick={() => window.location.href = '#events'}
                                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
                                    >
                                        Browse Events
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'hosted' && (
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:space-y-4 sm:gap-0">
                            {hostedEvents.length > 0 ? (
                                hostedEvents.map((event) => (
                                    <HostedEventCard key={event._id} event={event} />
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🎯</div>
                                    <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2">No hosted events</h3>
                                    <p className="text-gray-600 mb-4 text-xs sm:text-base">You haven't hosted any events yet</p>
                                    <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
                                        Create Event
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Host Event Dashboard Modal */}
            {showHostDashboard && selectedHostEvent && (
                <HostEventDashboard
                    event={selectedHostEvent}
                    onClose={() => {
                        setShowHostDashboard(false)
                        setSelectedHostEvent(null)
                    }}
                />
            )}

            {/* Edit Event Modal */}
            {showEditForm && eventToEdit && (
                <EditEventModal
                    event={eventToEdit}
                    onClose={() => {
                        setShowEditForm(false)
                        setEventToEdit(null)
                    }}
                    onEventUpdated={() => {
                        fetchHostedEvents()
                        setShowEditForm(false)
                        setEventToEdit(null)
                    }}
                />
            )}

            {/* Event Details Modal */}
            {showEventDetails && eventToView && (
                <EventDetailsModal
                    event={eventToView}
                    onClose={() => {
                        setShowEventDetails(false)
                        setEventToView(null)
                    }}
                />
            )}

            {/* Event Analytics Modal */}
            {showAnalytics && eventForAnalytics && (
                <EventAnalyticsModal
                    event={eventForAnalytics}
                    onClose={() => {
                        setShowAnalytics(false)
                        setEventForAnalytics(null)
                    }}
                />
            )}
        </div>
    )
}

export default MyEventsDashboard