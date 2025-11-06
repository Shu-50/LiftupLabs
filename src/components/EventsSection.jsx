import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import apiService from '../services/api'
import EventDetails from './EventDetails'
import CreateEventForm from './CreateEventForm'
import EventRegistrationForm from './EventRegistrationForm'

const EventsSection = () => {
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [registering, setRegistering] = useState(new Set())
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showRegistrationForm, setShowRegistrationForm] = useState(false)
    const [eventToRegister, setEventToRegister] = useState(null)
    const { user } = useAuth()
    const { showSuccess, showError } = useNotification()

    // Filter states
    const [filters, setFilters] = useState({
        // Only include non-empty values
        sort: 'latest',
        page: 1,
        limit: 12
    })

    // Fetch events from API
    const fetchEvents = async () => {
        try {
            setLoading(true)
            const response = await apiService.getEvents(filters)
            setEvents(response.data.events || [])
        } catch (error) {
            console.error('Error fetching events:', error)
            showError('Failed to load events')
            setEvents([])
        } finally {
            setLoading(false)
        }
    }

    // Load events on component mount and filter changes
    useEffect(() => {
        fetchEvents()
    }, [filters])

    // Handle event registration
    const handleEventRegistration = async (eventId, isCurrentlyRegistered) => {
        if (!user) {
            showError('Please login to register for events')
            return
        }

        if (isCurrentlyRegistered) {
            // Handle unregistration
            if (registering.has(eventId)) return // Prevent double-clicking

            try {
                setRegistering(prev => new Set(prev).add(eventId))
                await apiService.unregisterFromEvent(eventId)
                showSuccess('Successfully unregistered from event')
                await fetchEvents()
            } catch (error) {
                console.error('Unregistration error:', error)
                showError(error.message || 'Unregistration failed')
            } finally {
                setRegistering(prev => {
                    const newSet = new Set(prev)
                    newSet.delete(eventId)
                    return newSet
                })
            }
        } else {
            // Show registration form for new registration
            const event = events.find(e => e._id === eventId)
            setEventToRegister(event)
            setShowRegistrationForm(true)
        }
    }

    const handleRegistrationSuccess = () => {
        fetchEvents() // Refresh events to get updated registration status
        setShowRegistrationForm(false)
        setEventToRegister(null)
    }

    const updateFilter = (key, value) => {
        setFilters(prev => {
            const newFilters = { ...prev, page: 1 };

            // Only add the filter if it has a meaningful value
            if (value && value !== '' && value !== 'all') {
                newFilters[key] = value;
            } else {
                // Remove the filter if it's empty
                delete newFilters[key];
            }

            return newFilters;
        });
    }

    const clearFilters = () => {
        setFilters({
            sort: 'latest',
            page: 1,
            limit: 12
        })
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

    // Format prize amount
    const formatPrize = (prizes) => {
        if (!prizes || prizes.length === 0) return 'Certificate'
        const topPrize = prizes[0]
        if (topPrize.amount > 0) {
            return `₹${topPrize.amount.toLocaleString()}`
        }
        return topPrize.description || 'Certificate'
    }

    const EventCard = ({ event }) => {
        const isRegistered = event.isUserRegistered || false
        const isRegistering = registering.has(event._id)

        return (
            <div className="bg-white border border-orange-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                    <span className="text-4xl">
                        {event.category === 'hackathon' ? '🤖' :
                            event.category === 'workshop' ? '📚' :
                                event.category === 'quiz' ? '❓' :
                                    event.category === 'seminar' ? '💡' : '🎯'}
                    </span>
                </div>

                <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                                {event.title}
                            </h3>
                            <p className="text-orange-600 text-sm mb-2">
                                By {event.organizer?.name || 'Unknown'} •
                                Deadline: {formatDate(event.registration?.deadline)} •
                                Reward: {formatPrize(event.prizes)}
                            </p>
                            <p className="text-gray-600 text-sm">
                                📅 {formatDate(event.dateTime?.start)} •
                                📍 {event.location?.city || event.location?.venue || 'TBD'}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded capitalize">
                            {event.category}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {event.mode}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            {event.registration?.teamSize?.max > 1 ?
                                `Team of ${event.registration.teamSize.min}-${event.registration.teamSize.max}` :
                                'Individual'
                            }
                        </span>
                        {event.registration?.fee?.isFree && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                                Free
                            </span>
                        )}
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setSelectedEvent(event._id)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
                        >
                            View Details
                        </button>
                        <button
                            onClick={() => handleEventRegistration(event._id, isRegistered)}
                            disabled={isRegistering}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${isRegistered
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-orange-600 text-white hover:bg-orange-700'
                                }`}
                        >
                            {isRegistering ? '...' : isRegistered ? '✓ Registered' : 'Register'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // If an event is selected, show the event details
    if (selectedEvent) {
        return (
            <EventDetails
                eventId={selectedEvent}
                onBack={() => setSelectedEvent(null)}
            />
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-orange-900 mb-2">Browse Events</h1>
                        <p className="text-gray-700">Discover and participate in exciting events and competitions</p>
                    </div>
                    <button
                        onClick={() => {
                            if (!user) {
                                showError('Please login to host events')
                                return
                            }
                            setShowCreateForm(true)
                        }}
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700"
                    >
                        🎯 Host Event
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={filters.search || ''}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                </div>

                {/* Filter Controls */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                    {/* Category */}
                    <select
                        value={filters.category || ''}
                        onChange={(e) => updateFilter('category', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option value="">All Categories</option>
                        <option value="hackathon">Hackathon</option>
                        <option value="workshop">Workshop</option>
                        <option value="quiz">Quiz</option>
                        <option value="seminar">Seminar</option>
                        <option value="tech-fest">Tech Fest</option>
                        <option value="competition">Competition</option>
                    </select>

                    {/* Mode */}
                    <select
                        value={filters.mode || ''}
                        onChange={(e) => updateFilter('mode', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option value="">All Modes</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>

                    {/* City */}
                    <input
                        type="text"
                        placeholder="City"
                        value={filters.city || ''}
                        onChange={(e) => updateFilter('city', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />

                    {/* Sort */}
                    <select
                        value={filters.sort}
                        onChange={(e) => updateFilter('sort', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="prize">Prize Amount</option>
                        <option value="deadline">Deadline</option>
                        <option value="participants">Participants</option>
                    </select>

                    {/* Clear Filters */}
                    <button
                        onClick={clearFilters}
                        className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            {/* Events Count */}
            {!loading && (
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Found {events.length} event(s)
                        {Object.values(filters).some(v => v && v !== 'latest') && ' matching your filters'}
                    </p>
                </div>
            )}

            {/* Events Grid */}
            <div>
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white border border-orange-200 rounded-lg p-6 animate-pulse">
                                <div className="aspect-video bg-gray-200 rounded mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                                <div className="flex space-x-2 mb-4">
                                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                                </div>
                                <div className="flex space-x-3">
                                    <div className="h-8 flex-1 bg-gray-200 rounded"></div>
                                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-orange-200">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-600 mb-4">
                            {Object.values(filters).some(v => v && v !== 'latest')
                                ? 'Try adjusting your filters to see more events'
                                : 'No events are currently available'
                            }
                        </p>
                        {Object.values(filters).some(v => v && v !== 'latest') && (
                            <button
                                onClick={clearFilters}
                                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Create Event Form Modal */}
            {showCreateForm && (
                <CreateEventForm
                    onClose={() => setShowCreateForm(false)}
                    onEventCreated={() => {
                        fetchEvents() // Refresh events list
                        setShowCreateForm(false)
                    }}
                />
            )}

            {/* Event Registration Form Modal */}
            {showRegistrationForm && eventToRegister && (
                <EventRegistrationForm
                    event={eventToRegister}
                    onClose={() => {
                        setShowRegistrationForm(false)
                        setEventToRegister(null)
                    }}
                    onRegistrationSuccess={handleRegistrationSuccess}
                />
            )}
        </div>
    )
}

export default EventsSection