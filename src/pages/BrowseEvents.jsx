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
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-orange-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-900">Browse Events</h1>
                    <button className="w-full sm:w-auto bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-xs sm:text-sm md:text-base">
                        Host Event
                    </button>
                </div>
                <p className="text-gray-700">
                    Discover hackathons, competitions, workshops, and academic events happening across India
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-orange-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
                    />
                    <select
                        value={selectedFilters.type}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, type: e.target.value })}
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
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
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
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
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
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
                        <div key={event._id || event.id} className="border border-gray-200 rounded-lg p-2 sm:p-6 hover:shadow-md transition-shadow flex flex-col h-full bg-white">
                            <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-20 sm:h-32 md:h-40 flex items-center justify-center shrink-0">
                                <div className="text-center text-white">
                                    <h4 className="text-sm sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1">{event.category?.toUpperCase() || event.type}</h4>
                                    <p className="text-orange-100 text-[10px] sm:text-sm">{event.mode}</p>
                                </div>
                            </div>
                            <div className="p-2 sm:p-4 md:p-6 flex flex-col flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xs sm:text-lg font-semibold text-gray-900 mb-1 leading-tight line-clamp-2">{event.title}</h3>
                                        <p className="text-gray-600 text-[10px] sm:text-sm truncate">by {event.organizer?.name || event.organizer}</p>
                                    </div>
                                    <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-medium whitespace-nowrap ml-1 sm:ml-2">
                                        {event.category?.charAt(0).toUpperCase() + event.category?.slice(1) || event.type}
                                    </span>
                                </div>

                                <div className="space-y-0.5 text-[10px] sm:text-sm text-gray-600 mb-2 sm:mb-4">
                                    <div className="flex items-center truncate">
                                        <span className="mr-1 sm:mr-2">📅</span>
                                        <span className="truncate">{startDate.toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}</span>
                                    </div>
                                    <div className="flex items-center truncate">
                                        <span className="mr-1 sm:mr-2">📍</span>
                                        <span className="truncate">{event.location?.city || event.location}, {event.location?.state || ''}</span>
                                    </div>
                                    <div className="flex items-center truncate">
                                        <span className="mr-1 sm:mr-2">👥</span>
                                        <span className="truncate">{event.registration?.currentParticipants || 0} registered</span>
                                    </div>
                                    <div className="flex items-center truncate hidden sm:flex">
                                        <span className="mr-1 sm:mr-2">⏰</span>
                                        <span className="truncate">Deadline: {deadline.toLocaleDateString('en-IN')}</span>
                                    </div>
                                    {(event.registration?.fee > 0 || event.registration?.fee?.amount > 0) && (
                                        <div className="flex items-center font-semibold text-green-700">
                                            <span className="mr-1 sm:mr-2">💰</span>
                                            <span>₹{event.registration?.fee?.amount || event.registration?.fee || 0}</span>
                                        </div>
                                    )}
                                    {(!event.registration?.fee && !event.registration?.fee?.amount) || 
                                     (event.registration?.fee === 0 || event.registration?.fee?.amount === 0) ? (
                                        <div className="flex items-center text-sm font-semibold text-green-700">
                                            <span className="mr-2">🎫</span>
                                            <span>Free</span>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(event.tags || event.skills || []).slice(0, 3).map((tag, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-1.5 mt-auto sm:flex-row sm:space-x-2">
                                    <button
                                        onClick={() => handleRegister(event._id || event.id)}
                                        disabled={!isRegistrationOpen || !user}
                                        className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-[10px] sm:text-sm text-center ${isRegistrationOpen && user
                                            ? 'bg-orange-600 text-white hover:bg-orange-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {!user ? 'Login to Register' : !isRegistrationOpen ? 'Registration Closed' : 'Register'}
                                    </button>
                                    <button className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-[10px] sm:text-sm text-center">
                                        Details
                                    </button>
                                    <button className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-[10px] sm:text-sm text-center">
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