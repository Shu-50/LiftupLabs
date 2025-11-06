import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import apiService from '../services/api'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview')
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({})
    const [events, setEvents] = useState([])
    const [users, setUsers] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [eventParticipants, setEventParticipants] = useState([])
    const { user } = useAuth()
    const { showSuccess, showError } = useNotification()

    // Fetch dashboard statistics
    const fetchStats = async () => {
        try {
            const response = await apiService.getDashboardStats()
            setStats(response.data)
        } catch (error) {
            console.error('Error fetching stats:', error)
            showError('Failed to load dashboard statistics')
        }
    }

    // Fetch all events
    const fetchEvents = async () => {
        try {
            const response = await apiService.getEvents({ limit: 100 })
            setEvents(response.data.events || [])
        } catch (error) {
            console.error('Error fetching events:', error)
            showError('Failed to load events')
        }
    }

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await apiService.getUsers({ limit: 100 })
            setUsers(response.data.users || [])
        } catch (error) {
            console.error('Error fetching users:', error)
            showError('Failed to load users')
        }
    }

    // Load data on component mount
    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await Promise.all([
                fetchStats(),
                fetchEvents(),
                fetchUsers()
            ])
            setLoading(false)
        }

        if (user?.role === 'admin') {
            loadData()
        }
    }, [user])

    // Register user for event (admin action)
    const registerUserForEvent = async (eventId, userId) => {
        try {
            // This would need a special admin endpoint
            await apiService.post(`/events/${eventId}/admin-register`, { userId })
            showSuccess('User registered for event successfully')
            await fetchEvents() // Refresh events
        } catch (error) {
            console.error('Error registering user:', error)
            showError('Failed to register user for event')
        }
    }

    // Update user status
    const updateUserStatus = async (userId, isActive) => {
        try {
            await apiService.updateUserStatus(userId, isActive)
            showSuccess(`User ${isActive ? 'activated' : 'deactivated'} successfully`)
            await fetchUsers() // Refresh users
        } catch (error) {
            console.error('Error updating user status:', error)
            showError('Failed to update user status')
        }
    }

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    // Check if user is admin
    if (user?.role !== 'admin') {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">🚫</div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Access Denied</h2>
                <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 border border-orange-200 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-6 border border-orange-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <span className="text-2xl">👥</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.overview?.totalUsers || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-orange-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Events</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.overview?.totalEvents || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-orange-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <span className="text-2xl">🔥</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Events</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.overview?.activeEvents || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-orange-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <span className="text-2xl">📝</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.overview?.totalRegistrations || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-orange-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Users by Role</h3>
                    <div className="space-y-3">
                        {stats.usersByRole?.map((item) => (
                            <div key={item._id} className="flex items-center justify-between">
                                <span className="capitalize text-gray-700">{item._id}</span>
                                <span className="font-semibold text-gray-900">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-orange-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Events by Category</h3>
                    <div className="space-y-3">
                        {stats.eventsByCategory?.map((item) => (
                            <div key={item._id} className="flex items-center justify-between">
                                <span className="capitalize text-gray-700">{item._id}</span>
                                <span className="font-semibold text-gray-900">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    const renderEvents = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-orange-200">
                <div className="px-6 py-4 border-b border-orange-200">
                    <h3 className="text-lg font-semibold text-gray-900">All Events</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Event
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Organizer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Participants
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {events.map((event) => (
                                <tr key={event._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                            <div className="text-sm text-gray-500 capitalize">{event.category}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{event.organizer?.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{formatDate(event.dateTime?.start)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {event.registration?.currentParticipants || 0}/{event.registration?.maxParticipants || '∞'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${event.status === 'published' ? 'bg-green-100 text-green-800' :
                                            event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => setSelectedEvent(event)}
                                            className="text-orange-600 hover:text-orange-900 mr-3"
                                        >
                                            Manage
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

    const renderUsers = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-orange-200">
                <div className="px-6 py-4 border-b border-orange-200">
                    <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Institution
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                                <span>{user.avatar || '👤'}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs rounded-full capitalize bg-blue-100 text-blue-800">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.profile?.institution || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{formatDate(user.createdAt)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => updateUserStatus(user._id, !user.isActive)}
                                            className={`mr-3 ${user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                                                }`}
                                        >
                                            {user.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <button className="text-orange-600 hover:text-orange-900">
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

    const renderEventManagement = () => {
        if (!selectedEvent) return null

        return (
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSelectedEvent(null)}
                        className="text-orange-600 hover:text-orange-700"
                    >
                        ← Back to Events
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Event Details */}
                    <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-orange-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
                        <div className="space-y-3 text-sm">
                            <div><strong>Category:</strong> {selectedEvent.category}</div>
                            <div><strong>Mode:</strong> {selectedEvent.mode}</div>
                            <div><strong>Date:</strong> {formatDate(selectedEvent.dateTime?.start)}</div>
                            <div><strong>Location:</strong> {selectedEvent.location?.city || 'Online'}</div>
                            <div><strong>Max Participants:</strong> {selectedEvent.registration?.maxParticipants}</div>
                            <div><strong>Current Participants:</strong> {selectedEvent.registration?.currentParticipants || 0}</div>
                            <div><strong>Status:</strong> {selectedEvent.status}</div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg p-6 border border-orange-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
                                View Participants
                            </button>
                            <button className="w-full border border-orange-300 text-orange-700 py-2 rounded-lg hover:bg-orange-50">
                                Edit Event
                            </button>
                            <button className="w-full border border-red-300 text-red-700 py-2 rounded-lg hover:bg-red-50">
                                Delete Event
                            </button>
                        </div>
                    </div>
                </div>

                {/* Register Users Section */}
                <div className="bg-white rounded-lg p-6 border border-orange-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Register Users for Event</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.filter(u => u.role === 'student').map((user) => (
                            <div key={user._id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm">{user.avatar || '👤'}</span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => registerUserForEvent(selectedEvent._id, user._id)}
                                    className="w-full bg-orange-600 text-white py-1 rounded text-sm hover:bg-orange-700"
                                >
                                    Register
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <h1 className="text-3xl font-bold text-orange-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-700">Manage users, events, and platform settings</p>
            </div>

            {selectedEvent ? (
                renderEventManagement()
            ) : (
                <>
                    <div className="bg-white rounded-lg border border-orange-200">
                        <div className="border-b border-orange-200">
                            <nav className="flex space-x-8 px-6">
                                {[
                                    { id: 'overview', label: 'Overview', icon: '📊' },
                                    { id: 'events', label: 'Events', icon: '🎯' },
                                    { id: 'users', label: 'Users', icon: '👥' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                            ? 'border-orange-600 text-orange-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <span>{tab.icon}</span>
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="p-6">
                            {activeTab === 'overview' && renderOverview()}
                            {activeTab === 'events' && renderEvents()}
                            {activeTab === 'users' && renderUsers()}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default AdminDashboard