import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import apiService from '../services/api'
import EventRegistrationForm from './EventRegistrationForm'

const EventDetails = ({ eventId, onBack }) => {
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isRegistered, setIsRegistered] = useState(false)
    const [showRegistrationForm, setShowRegistrationForm] = useState(false)
    const { user } = useAuth()
    const { showSuccess, showError } = useNotification()

    // Fetch event details
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true)
                const response = await apiService.getEvent(eventId)
                setEvent(response.data.event)
                setIsRegistered(response.data.isUserRegistered || false)
            } catch (error) {
                console.error('Error fetching event:', error)
                showError('Failed to load event details')
            } finally {
                setLoading(false)
            }
        }

        if (eventId) {
            fetchEvent()
        }
    }, [eventId])

    // Handle registration
    const handleRegistration = async () => {
        if (!user) {
            showError('Please login to register for events')
            return
        }

        if (isRegistered) {
            // Handle unregistration
            try {
                await apiService.unregisterFromEvent(eventId)
                setIsRegistered(false)
                showSuccess('Successfully unregistered from event')
                // Refresh event details
                const response = await apiService.getEvent(eventId)
                setEvent(response.data.event)
            } catch (error) {
                console.error('Unregistration error:', error)
                showError(error.message || 'Unregistration failed')
            }
        } else {
            // Show registration form
            setShowRegistrationForm(true)
        }
    }

    const handleRegistrationSuccess = () => {
        setIsRegistered(true)
        setShowRegistrationForm(false)
        // Refresh event details
        const fetchEvent = async () => {
            try {
                const response = await apiService.getEvent(eventId)
                setEvent(response.data.event)
            } catch (error) {
                console.error('Error refreshing event:', error)
            }
        }
        fetchEvent()
    }

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Format date range
    const formatDateRange = (start, end) => {
        const startDate = new Date(start)
        const endDate = new Date(end)

        if (startDate.toDateString() === endDate.toDateString()) {
            return `${startDate.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })} • ${startDate.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
            })} - ${endDate.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
            })}`
        } else {
            return `${formatDate(start)} - ${formatDate(end)}`
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading event details...</p>
                </div>
            </div>
        )
    }

    if (!event) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">❌</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Event Not Found</h3>
                <p className="text-gray-500 mb-4">The event you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={onBack}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
                >
                    Go Back
                </button>
            </div>
        )
    }

    const isRegistrationOpen = new Date() < new Date(event.registration?.deadline)
    const isEventFull = false // Events can have unlimited participants

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center text-orange-600 hover:text-orange-700 mb-4"
                >
                    ← Back to Events
                </button>

                <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg p-8 text-white">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="text-4xl">
                                    {event.category === 'hackathon' ? '🤖' :
                                        event.category === 'workshop' ? '📚' :
                                            event.category === 'quiz' ? '❓' :
                                                event.category === 'seminar' ? '💡' : '🎯'}
                                </span>
                                <div>
                                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                                        {event.category}
                                    </span>
                                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium ml-2">
                                        {event.mode}
                                    </span>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                            <p className="text-orange-100 text-lg">{event.description}</p>
                        </div>

                        <div className="text-right">
                            <div className="text-orange-100 text-sm mb-1">Organized by</div>
                            <div className="font-semibold">{event.organizer?.name}</div>
                            {event.organizer?.institution && (
                                <div className="text-orange-100 text-sm">{event.organizer.institution}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Event Details */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">📅 Date & Time</h3>
                                <p className="text-gray-700">{formatDateRange(event.dateTime.start, event.dateTime.end)}</p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">📍 Location</h3>
                                <p className="text-gray-700">
                                    {event.mode === 'Online' ? 'Online Event' :
                                        `${event.location?.venue || ''} ${event.location?.city || ''}, ${event.location?.state || ''}`}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">👥 Participants</h3>
                                <p className="text-gray-700">
                                    {event.registration?.currentParticipants || 0} registered
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">⏰ Registration Deadline</h3>
                                <p className="text-gray-700">{formatDate(event.registration?.deadline)}</p>
                            </div>

                            {!event.registration?.fee?.isFree && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">💰 Registration Fee</h3>
                                    <p className="text-gray-700">₹{event.registration.fee.amount}</p>
                                </div>
                            )}

                            {event.registration?.teamSize && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">👥 Team Size</h3>
                                    <p className="text-gray-700">
                                        {event.registration.teamSize.min === event.registration.teamSize.max
                                            ? `${event.registration.teamSize.min} member${event.registration.teamSize.min > 1 ? 's' : ''}`
                                            : `${event.registration.teamSize.min} - ${event.registration.teamSize.max} members`}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills & Tags */}
                    {(event.skills?.length > 0 || event.tags?.length > 0) && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills & Tags</h2>

                            {event.skills?.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-medium text-gray-900 mb-2">Required Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {event.skills.map((skill, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {event.tags?.length > 0 && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {event.tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Prizes */}
                    {event.prizes?.length > 0 && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">🏆 Prizes</h2>
                            <div className="space-y-4">
                                {event.prizes.map((prize, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-medium text-gray-900">{prize.position}</h3>
                                            {prize.amount > 0 && (
                                                <span className="text-green-600 font-semibold">₹{prize.amount}</span>
                                            )}
                                        </div>
                                        {prize.description && (
                                            <p className="text-gray-700 text-sm">{prize.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Requirements */}
                    {event.registration?.requirements?.length > 0 && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Requirements</h2>
                            <ul className="space-y-2">
                                {event.registration.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-orange-500 mr-2">•</span>
                                        <span className="text-gray-700">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Schedule */}
                    {event.schedule?.length > 0 && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">📅 Schedule</h2>
                            <div className="space-y-4">
                                {event.schedule.map((day, index) => (
                                    <div key={index}>
                                        <h3 className="font-medium text-gray-900 mb-2">{day.day}</h3>
                                        <div className="space-y-2">
                                            {day.events?.map((scheduleEvent, eventIndex) => (
                                                <div key={eventIndex} className="flex items-start space-x-3 text-sm">
                                                    <span className="text-orange-600 font-medium min-w-16">{scheduleEvent.time}</span>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{scheduleEvent.activity}</div>
                                                        {scheduleEvent.description && (
                                                            <div className="text-gray-600">{scheduleEvent.description}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQs */}
                    {event.faqs?.length > 0 && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">❓ Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {event.faqs.map((faq, index) => (
                                    <div key={index}>
                                        <h3 className="font-medium text-gray-900 mb-1">{faq.question}</h3>
                                        <p className="text-gray-700 text-sm">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Registration Card */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration</h3>

                        {!user ? (
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">Please login to register for this event</p>
                                <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg">
                                    Login Required
                                </button>
                            </div>
                        ) : isRegistered ? (
                            <div className="text-center">
                                <div className="text-green-600 text-4xl mb-2">✅</div>
                                <p className="text-green-700 font-medium mb-4">You're registered!</p>
                                <button
                                    onClick={handleRegistration}
                                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                                >
                                    Unregister
                                </button>
                            </div>
                        ) : !isRegistrationOpen ? (
                            <div className="text-center">
                                <div className="text-red-600 text-4xl mb-2">⏰</div>
                                <p className="text-red-700 font-medium mb-2">Registration Closed</p>
                                <p className="text-gray-600 text-sm">Deadline was {formatDate(event.registration?.deadline)}</p>
                            </div>
                        ) : isEventFull ? (
                            <div className="text-center">
                                <div className="text-yellow-600 text-4xl mb-2">👥</div>
                                <p className="text-yellow-700 font-medium mb-2">Event Full</p>
                                <p className="text-gray-600 text-sm">Maximum participants reached</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="text-orange-600 text-4xl mb-2">🎯</div>
                                <p className="text-gray-700 mb-4">Ready to join this event?</p>
                                <button
                                    onClick={handleRegistration}
                                    className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
                                >
                                    Register Now
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Organizer Contact */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Organizer</h3>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-400">👤</span>
                                <span className="text-gray-700">{event.organizer?.name}</span>
                            </div>

                            {event.organizer?.contact?.email && (
                                <div className="flex items-center space-x-3">
                                    <span className="text-gray-400">📧</span>
                                    <a href={`mailto:${event.organizer.contact.email}`} className="text-orange-600 hover:underline">
                                        {event.organizer.contact.email}
                                    </a>
                                </div>
                            )}

                            {event.organizer?.contact?.phone && (
                                <div className="flex items-center space-x-3">
                                    <span className="text-gray-400">📞</span>
                                    <a href={`tel:${event.organizer.contact.phone}`} className="text-orange-600 hover:underline">
                                        {event.organizer.contact.phone}
                                    </a>
                                </div>
                            )}

                            {event.organizer?.contact?.website && (
                                <div className="flex items-center space-x-3">
                                    <span className="text-gray-400">🌐</span>
                                    <a href={event.organizer.contact.website} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                                        Website
                                    </a>
                                </div>
                            )}

                            {/* Social Media Links */}
                            {(event.organizer?.contact?.socialMedia?.linkedin ||
                                event.organizer?.contact?.socialMedia?.twitter ||
                                event.organizer?.contact?.socialMedia?.instagram) && (
                                    <div>
                                        <div className="text-sm font-medium text-gray-900 mb-2">Social Media</div>
                                        <div className="flex space-x-2">
                                            {event.organizer.contact.socialMedia.linkedin && (
                                                <a href={event.organizer.contact.socialMedia.linkedin} target="_blank" rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700">
                                                    LinkedIn
                                                </a>
                                            )}
                                            {event.organizer.contact.socialMedia.twitter && (
                                                <a href={event.organizer.contact.socialMedia.twitter} target="_blank" rel="noopener noreferrer"
                                                    className="text-blue-400 hover:text-blue-500">
                                                    Twitter
                                                </a>
                                            )}
                                            {event.organizer.contact.socialMedia.instagram && (
                                                <a href={event.organizer.contact.socialMedia.instagram} target="_blank" rel="noopener noreferrer"
                                                    className="text-pink-600 hover:text-pink-700">
                                                    Instagram
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>

                    {/* Social Links */}
                    {(event.socialLinks?.discord || event.socialLinks?.telegram || event.socialLinks?.whatsapp) && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Join Community</h3>

                            <div className="space-y-3">
                                {event.socialLinks.discord && (
                                    <a href={event.socialLinks.discord} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                                        <span className="text-indigo-600">💬</span>
                                        <span className="text-gray-700">Join Discord</span>
                                    </a>
                                )}

                                {event.socialLinks.telegram && (
                                    <a href={event.socialLinks.telegram} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                                        <span className="text-blue-600">✈️</span>
                                        <span className="text-gray-700">Join Telegram</span>
                                    </a>
                                )}

                                {event.socialLinks.whatsapp && (
                                    <a href={event.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                                        <span className="text-green-600">📱</span>
                                        <span className="text-gray-700">Join WhatsApp</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Registration Form Modal */}
            {showRegistrationForm && (
                <EventRegistrationForm
                    event={event}
                    onClose={() => setShowRegistrationForm(false)}
                    onRegistrationSuccess={handleRegistrationSuccess}
                />
            )}
        </div>
    )
}

export default EventDetails