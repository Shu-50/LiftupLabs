import { useState, useEffect } from 'react'
import apiService from '../services/api'
import { useAuth } from '../context/AuthContext'

const BrowseEvents = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilters, setSelectedFilters] = useState({
        type: 'All',
        location: 'All',
        date: 'All'
    })
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useAuth()

    // Fetch events from API
    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            setLoading(true)
            const response = await apiService.getEvents({
                search: searchQuery,
                category: selectedFilters.type !== 'All' ? selectedFilters.type.toLowerCase() : undefined,
                city: selectedFilters.location !== 'All' ? selectedFilters.location : undefined
            })
            setEvents(response.data.events || [])
            setError(null)
        } catch (err) {
            console.error('Error fetching events:', err)
            setError('Failed to load events')
            // Fallback to static data for now
            setEvents([
                {
                    id: 1,
                    title: 'Inter-IIT Hackathon 2025',
                    organizer: 'IIT Bombay',
                    date: 'Jan 15-17, 2025',
                    location: 'Mumbai, Maharashtra',
                    type: 'Hackathon',
                    image: '/api/placeholder/300/200',
                    tags: ['Coding', 'Innovation', 'Tech'],
                    participants: '500+ registered',
                    deadline: 'Jan 10, 2025'
                },
                {
                    id: 2,
                    title: 'National Coding Challenge',
                    organizer: 'CodeChef',
                    date: 'Jan 20-22, 2025',
                    location: 'Online',
                    type: 'Competition',
                    image: '/api/placeholder/300/200',
                    tags: ['Programming', 'Algorithms'],
                    participants: '1000+ registered',
                    deadline: 'Jan 18, 2025'
                },
                {
                    id: 3,
                    title: 'Data Science Workshop',
                    organizer: 'Analytics Vidhya',
                    date: 'Jan 25-26, 2025',
                    location: 'Bangalore, Karnataka',
                    type: 'Workshop',
                    image: '/api/placeholder/300/200',
                    tags: ['Data Science', 'ML', 'AI'],
                    participants: '200+ registered',
                    deadline: 'Jan 23, 2025'
                },
                {
                    id: 4,
                    title: 'The Smart Science Quiz',
                    organizer: 'Science Club',
                    date: 'Feb 1, 2025',
                    location: 'Delhi, India',
                    type: 'Quiz',
                    image: '/api/placeholder/300/200',
                    tags: ['Science', 'Knowledge'],
                    participants: '300+ registered',
                    deadline: 'Jan 28, 2025'
                }
            ])
        } finally {
            setLoading(false)
        }
    }

    // Handle search and filter changes
    const handleSearch = () => {
        fetchEvents()
    }

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }

    // Register for event
    const handleRegister = async (eventId) => {
        if (!user) {
            alert('Please login to register for events')
            return
        }

        try {
            await apiService.registerForEvent(eventId)
            alert('Successfully registered for the event!')
            fetchEvents() // Refresh events to update participant count
        } catch (error) {
            console.error('Registration error:', error)
            alert(error.message || 'Failed to register for event')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading events...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-orange-900">Browse Events</h1>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                        Host Event
                    </button>
                </div>
                <p className="text-gray-700">
                    Discover hackathons, competitions, workshops, and academic events happening across India
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                    <select
                        value={selectedFilters.type}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, type: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option>All Types</option>
                        <option>Hackathon</option>
                        <option>Competition</option>
                        <option>Workshop</option>
                        <option>Quiz</option>
                    </select>
                    <select
                        value={selectedFilters.location}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, location: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option>All Locations</option>
                        <option>Online</option>
                        <option>Mumbai</option>
                        <option>Delhi</option>
                        <option>Bangalore</option>
                    </select>
                    <select
                        value={selectedFilters.date}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, date: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option>All Dates</option>
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>Next Month</option>
                    </select>
                </div>
            </div>

            {/* Events Count */}
            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    {loading ? 'Loading events...' : `Found ${events.length} event(s)`}
                </p>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.length === 0 && !loading && (
                    <div className="col-span-2 text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🎯</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Found</h3>
                        <p className="text-gray-500">No events match your current filters. Try adjusting your search criteria.</p>
                    </div>
                )}
                {events.map((event) => {
                    const startDate = new Date(event.dateTime?.start || event.date)
                    const deadline = new Date(event.registration?.deadline || event.deadline)
                    const isRegistrationOpen = deadline > new Date()

                    return (
                        <div key={event._id || event.id} className="bg-white rounded-lg border border-orange-200 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-48 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <h4 className="text-2xl font-bold mb-2">{event.category?.toUpperCase() || event.type}</h4>
                                    <p className="text-orange-100">{event.mode}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{event.title}</h3>
                                        <p className="text-gray-600 text-sm">by {event.organizer?.name || event.organizer}</p>
                                    </div>
                                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                                        {event.category?.charAt(0).toUpperCase() + event.category?.slice(1) || event.type}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="mr-2">📅</span>
                                        <span>{startDate.toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="mr-2">📍</span>
                                        <span>{event.location?.city || event.location}, {event.location?.state || ''}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="mr-2">👥</span>
                                        <span>{event.registration?.currentParticipants || 0} registered</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="mr-2">⏰</span>
                                        <span>Deadline: {deadline.toLocaleDateString('en-IN')}</span>
                                    </div>
                                    {event.registration?.fee?.isFree === false && (
                                        <div className="flex items-center text-sm text-gray-600">
                                            <span className="mr-2">💰</span>
                                            <span>₹{event.registration.fee.amount}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(event.tags || event.skills || []).slice(0, 3).map((tag, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => handleRegister(event._id || event.id)}
                                        disabled={!isRegistrationOpen || !user}
                                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${isRegistrationOpen && user
                                            ? 'bg-orange-600 text-white hover:bg-orange-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {!user ? 'Login to Register' : !isRegistrationOpen ? 'Registration Closed' : 'Register'}
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                        Details
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BrowseEvents