import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import apiService from '../services/api'

const EditEventForm = ({ event, onClose, onEventUpdated }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { showSuccess, showError } = useNotification()

    const [formData, setFormData] = useState({
        // Basic Information
        title: '',
        description: '',
        category: 'hackathon',
        mode: 'Online',

        // Date & Time
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        timezone: 'Asia/Kolkata',

        // Location
        venue: '',
        city: '',
        state: '',

        // Registration
        registrationDeadline: '',
        registrationDeadlineTime: '',
        registrationFee: 0,
        isFree: true,
        teamSizeMin: 1,
        teamSizeMax: 1,
        requirements: [''],

        // Contact
        contactEmail: user?.email || '',
        contactPhone: '',
        website: '',
        organizerLinkedin: '',
        organizerTwitter: '',
        organizerInstagram: '',

        // Additional Info
        tags: [''],
        skills: [''],
        faqs: [{ question: '', answer: '' }],
        socialLinks: {
            discord: '',
            telegram: '',
            whatsapp: ''
        }
    })

    // Populate form with existing event data
    useEffect(() => {
        if (event) {
            const startDate = new Date(event.dateTime.start)
            const endDate = new Date(event.dateTime.end)
            const deadline = new Date(event.registration.deadline)

            setFormData({
                title: event.title || '',
                description: event.description || '',
                category: event.category || 'hackathon',
                mode: event.mode || 'Online',

                startDate: startDate.toISOString().split('T')[0],
                startTime: startDate.toTimeString().slice(0, 5),
                endDate: endDate.toISOString().split('T')[0],
                endTime: endDate.toTimeString().slice(0, 5),
                timezone: event.dateTime.timezone || 'Asia/Kolkata',

                venue: event.location?.venue || '',
                city: event.location?.city || '',
                state: event.location?.state || '',

                registrationDeadline: deadline.toISOString().split('T')[0],
                registrationDeadlineTime: deadline.toTimeString().slice(0, 5),
                registrationFee: event.registration?.fee?.amount || 0,
                isFree: event.registration?.fee?.isFree !== false,
                teamSizeMin: event.registration?.teamSize?.min || 1,
                teamSizeMax: event.registration?.teamSize?.max || 1,
                requirements: event.registration?.requirements?.length > 0 ? event.registration.requirements : [''],

                contactEmail: event.organizer?.contact?.email || user?.email || '',
                contactPhone: event.organizer?.contact?.phone || '',
                website: event.organizer?.contact?.website || '',
                organizerLinkedin: event.organizer?.contact?.socialMedia?.linkedin || '',
                organizerTwitter: event.organizer?.contact?.socialMedia?.twitter || '',
                organizerInstagram: event.organizer?.contact?.socialMedia?.instagram || '',

                tags: event.tags?.length > 0 ? event.tags : [''],
                skills: event.skills?.length > 0 ? event.skills : [''],
                faqs: event.faqs?.length > 0 ? event.faqs : [{ question: '', answer: '' }],
                socialLinks: {
                    discord: event.socialLinks?.discord || '',
                    telegram: event.socialLinks?.telegram || '',
                    whatsapp: event.socialLinks?.whatsapp || ''
                }
            })
        }
    }, [event, user])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleArrayChange = (arrayName, index, newValue) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) => i === index ? newValue : item)
        }))
    }

    const addArrayItem = (arrayName, newItem) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], newItem]
        }))
    }

    const removeArrayItem = (arrayName, index) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }))
    }

    const validateForm = () => {
        const errors = []

        if (!formData.title || formData.title.trim().length < 5) {
            errors.push('Title must be at least 5 characters long')
        }
        if (!formData.description || formData.description.trim().length < 20) {
            errors.push('Description must be at least 20 characters long')
        }
        if (!formData.startDate || !formData.startTime) {
            errors.push('Start date and time are required')
        }
        if (!formData.endDate || !formData.endTime) {
            errors.push('End date and time are required')
        }
        if (!formData.registrationDeadline || !formData.registrationDeadlineTime) {
            errors.push('Registration deadline is required')
        }

        // Team size validation
        if (formData.teamSizeMax < formData.teamSizeMin) {
            errors.push('Maximum team size must be greater than or equal to minimum team size')
        }

        // Date validation
        const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
        const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`)
        const deadlineDateTime = new Date(`${formData.registrationDeadline}T${formData.registrationDeadlineTime}`)

        if (endDateTime <= startDateTime) {
            errors.push('Event end date must be after start date')
        }
        if (deadlineDateTime >= startDateTime) {
            errors.push('Registration deadline must be before event start date')
        }

        // Mode-specific validation
        if (formData.mode === 'Offline' || formData.mode === 'Hybrid') {
            if (!formData.city || formData.city.trim().length === 0) {
                errors.push('City is required for offline/hybrid events')
            }
            if (!formData.venue || formData.venue.trim().length === 0) {
                errors.push('Venue is required for offline/hybrid events')
            }
        }

        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validateForm()
        if (validationErrors.length > 0) {
            showError(`Please fix the following errors:\n${validationErrors.join('\n')}`)
            return
        }

        setLoading(true)
        try {
            const eventData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                mode: formData.mode,
                location: {
                    venue: formData.venue,
                    city: formData.city,
                    state: formData.state,
                    country: 'India'
                },
                dateTime: {
                    start: new Date(`${formData.startDate}T${formData.startTime}`).toISOString(),
                    end: new Date(`${formData.endDate}T${formData.endTime}`).toISOString(),
                    timezone: formData.timezone
                },
                registration: {
                    deadline: new Date(`${formData.registrationDeadline}T${formData.registrationDeadlineTime}`).toISOString(),
                    fee: {
                        amount: formData.isFree ? 0 : formData.registrationFee,
                        currency: 'INR',
                        isFree: formData.isFree
                    },
                    requirements: formData.requirements.filter(req => req.trim()),
                    teamSize: {
                        min: formData.teamSizeMin,
                        max: formData.teamSizeMax
                    }
                },
                tags: formData.tags.filter(tag => tag.trim()),
                skills: formData.skills.filter(skill => skill.trim()),
                faqs: formData.faqs.filter(faq => faq.question && faq.answer),
                socialLinks: {
                    website: formData.website,
                    discord: formData.socialLinks.discord,
                    telegram: formData.socialLinks.telegram,
                    whatsapp: formData.socialLinks.whatsapp
                },
                // Contact information
                contactEmail: formData.contactEmail,
                contactPhone: formData.contactPhone,
                organizerLinkedin: formData.organizerLinkedin,
                organizerTwitter: formData.organizerTwitter,
                organizerInstagram: formData.organizerInstagram
            }

            await apiService.updateEvent(event._id, eventData)
            showSuccess('Event updated successfully!')
            onEventUpdated?.()
            onClose()
        } catch (error) {
            console.error('Error updating event:', error)
            showError(error.message || 'Failed to update event')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.24)' }}>
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Edit Event</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                    <p className="text-gray-600 mt-1">{event.title}</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    placeholder="Enter event title (minimum 5 characters)"
                                    required
                                />
                                <p className="text-gray-500 text-xs mt-1">{formData.title.length}/100 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    placeholder="Describe your event in detail (minimum 20 characters)"
                                    required
                                />
                                <p className="text-gray-500 text-xs mt-1">{formData.description.length}/2000 characters</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    >
                                        <option value="hackathon">Hackathon</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="quiz">Quiz</option>
                                        <option value="seminar">Seminar</option>
                                        <option value="tech-fest">Tech Fest</option>
                                        <option value="competition">Competition</option>
                                        <option value="conference">Conference</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mode *</label>
                                    <select
                                        name="mode"
                                        value={formData.mode}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    >
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Date & Time</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location (for offline/hybrid events) */}
                    {(formData.mode === 'Offline' || formData.mode === 'Hybrid') && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Venue *</label>
                                    <input
                                        type="text"
                                        name="venue"
                                        value={formData.venue}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                        placeholder="Event venue"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                        placeholder="City"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Registration Settings */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Settings</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Deadline *</label>
                                <input
                                    type="date"
                                    name="registrationDeadline"
                                    value={formData.registrationDeadline}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline Time *</label>
                                <input
                                    type="time"
                                    name="registrationDeadlineTime"
                                    value={formData.registrationDeadlineTime}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min Team Size</label>
                                <input
                                    type="number"
                                    name="teamSizeMin"
                                    value={formData.teamSizeMin}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Team Size</label>
                                <input
                                    type="number"
                                    name="teamSizeMax"
                                    value={formData.teamSizeMax}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    min="1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                                <input
                                    type="tel"
                                    name="contactPhone"
                                    value={formData.contactPhone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Updating...' : 'Update Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEventForm