import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import apiService from '../services/api'

const CreateEventForm = ({ onClose, onEventCreated }) => {
    const [currentStep, setCurrentStep] = useState(1)
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
        // Removed maxParticipants - events can have unlimited participants
        registrationFee: 0,
        isFree: true,
        teamSizeMin: 1,
        teamSizeMax: 1,
        requirements: [''],

        // Prizes
        prizes: [{ position: 'Winner', amount: 0, description: '', benefits: [''] }],

        // Schedule
        schedule: [{ day: 'Day 1', events: [{ time: '', activity: '', description: '' }] }],

        // Organizer Contact
        organizerPhone: '',
        organizerWebsite: '',
        organizerLinkedin: '',
        organizerTwitter: '',
        organizerInstagram: '',

        // Additional Info
        tags: [''],
        skills: [''],
        faqs: [{ question: '', answer: '' }],

        // Contact
        contactEmail: user?.email || '',
        contactPhone: '',
        website: '',
        socialLinks: {
            discord: '',
            telegram: '',
            whatsapp: ''
        }
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }))
    }

    const addArrayItem = (field, defaultValue = '') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], defaultValue]
        }))
    }

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    const validateCurrentStep = () => {
        const errors = []

        switch (currentStep) {
            case 1:
                if (!formData.title || formData.title.trim().length < 5) {
                    errors.push('Title must be at least 5 characters long')
                }
                if (!formData.description || formData.description.trim().length < 20) {
                    errors.push('Description must be at least 20 characters long')
                }
                break
            case 2:
                if (!formData.startDate || !formData.startTime) {
                    errors.push('Start date and time are required')
                }
                if (!formData.endDate || !formData.endTime) {
                    errors.push('End date and time are required')
                }
                if (formData.mode === 'Offline' || formData.mode === 'Hybrid') {
                    if (!formData.city || formData.city.trim().length === 0) {
                        errors.push('City is required for offline/hybrid events')
                    }
                    if (!formData.venue || formData.venue.trim().length === 0) {
                        errors.push('Venue is required for offline/hybrid events')
                    }
                }
                break
            case 3:
                if (!formData.registrationDeadline || !formData.registrationDeadlineTime) {
                    errors.push('Registration deadline is required')
                }
                break
        }

        return errors
    }

    const nextStep = () => {
        const stepErrors = validateCurrentStep()
        if (stepErrors.length > 0) {
            showError(`Please fix the following errors:\n${stepErrors.join('\n')}`)
            return
        }
        if (currentStep < 5) setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const validateForm = () => {
        const errors = []

        // Basic validation
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
        const now = new Date()

        if (startDateTime <= now) {
            errors.push('Event start date must be in the future')
        }
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

    const handleSubmit = async () => {
        try {
            setLoading(true)

            // Validate form first
            const validationErrors = validateForm()
            if (validationErrors.length > 0) {
                showError(`Please fix the following errors:\n${validationErrors.join('\n')}`)
                setLoading(false)
                return
            }

            // Prepare event data for API
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
                    // Removed maxParticipants - unlimited participants allowed
                    requirements: formData.requirements.filter(req => req.trim()),
                    teamSize: {
                        min: formData.teamSizeMin,
                        max: formData.teamSizeMax
                    }
                },
                prizes: formData.prizes.filter(prize => prize.position && (prize.amount > 0 || prize.description)),
                schedule: formData.schedule.filter(day => day.day && day.events.some(event => event.activity)),
                tags: formData.tags.filter(tag => tag.trim()),
                skills: formData.skills.filter(skill => skill.trim()),
                faqs: formData.faqs.filter(faq => faq.question && faq.answer),
                socialLinks: {
                    website: formData.website,
                    discord: formData.socialLinks.discord,
                    telegram: formData.socialLinks.telegram,
                    whatsapp: formData.socialLinks.whatsapp
                },
                status: 'published',
                visibility: 'public'
            }

            const response = await apiService.createEvent(eventData)
            showSuccess('Event created successfully!')
            onEventCreated?.(response.data.event)
            onClose()
        } catch (error) {
            console.error('Error creating event:', error)

            // Handle validation errors specifically
            if (error.message === 'Validation failed' && error.response?.data?.errors) {
                const errorMessages = error.response.data.errors.map(err => err.msg).join('\n')
                showError(`Validation failed:\n${errorMessages}`)
            } else {
                showError(error.message || 'Failed to create event')
            }
        } finally {
            setLoading(false)
        }
    }

    const renderStep1 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 ${formData.title && formData.title.length < 5 ? 'border-red-300' : 'border-gray-300'
                        }`}
                    placeholder="Enter event title (minimum 5 characters)"
                    required
                />
                {formData.title && formData.title.length < 5 && (
                    <p className="text-red-500 text-xs mt-1">Title must be at least 5 characters long</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{formData.title.length}/100 characters</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 ${formData.description && formData.description.length < 20 ? 'border-red-300' : 'border-gray-300'
                        }`}
                    placeholder="Describe your event in detail (minimum 20 characters)"
                    required
                />
                {formData.description && formData.description.length < 20 && (
                    <p className="text-red-500 text-xs mt-1">Description must be at least 20 characters long</p>
                )}
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
    )

    const renderStep2 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Date, Time & Location</h3>

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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {formData.mode !== 'Online' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Venue {(formData.mode === 'Offline' || formData.mode === 'Hybrid') && '*'}
                        </label>
                        <input
                            type="text"
                            name="venue"
                            value={formData.venue}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 ${(formData.mode === 'Offline' || formData.mode === 'Hybrid') && !formData.venue
                                ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="Event venue"
                            required={formData.mode !== 'Online'}
                        />
                        {(formData.mode === 'Offline' || formData.mode === 'Hybrid') && !formData.venue && (
                            <p className="text-red-500 text-xs mt-1">Venue is required for {formData.mode.toLowerCase()} events</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            City {(formData.mode === 'Offline' || formData.mode === 'Hybrid') && '*'}
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 ${(formData.mode === 'Offline' || formData.mode === 'Hybrid') && !formData.city
                                ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="City"
                            required={formData.mode !== 'Online'}
                        />
                        {(formData.mode === 'Offline' || formData.mode === 'Hybrid') && !formData.city && (
                            <p className="text-red-500 text-xs mt-1">City is required for {formData.mode.toLowerCase()} events</p>
                        )}
                    </div>
                </div>
            )}

            {formData.mode !== 'Online' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                        placeholder="State"
                    />
                </div>
            )}
        </div>
    )
    const renderStep3 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Registration Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Removed Maximum Participants field - events can have unlimited participants */}

            <div>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="isFree"
                        checked={formData.isFree}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-300"
                    />
                    <span className="text-sm font-medium text-gray-700">Free Event</span>
                </label>
            </div>

            {!formData.isFree && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Fee (₹)</label>
                    <input
                        type="number"
                        name="registrationFee"
                        value={formData.registrationFee}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                        min="0"
                    />
                </div>
            )}

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

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                {formData.requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                            type="text"
                            value={req}
                            onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Enter requirement"
                        />
                        {formData.requirements.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeArrayItem('requirements', index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem('requirements', '')}
                    className="text-orange-600 text-sm hover:text-orange-700"
                >
                    + Add Requirement
                </button>
            </div>
        </div>
    )

    const renderStep4 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Prizes & Additional Info</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prizes</label>
                {formData.prizes.map((prize, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <input
                                type="text"
                                value={prize.position}
                                onChange={(e) => handleArrayChange('prizes', index, { ...prize, position: e.target.value })}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                placeholder="Position (e.g., Winner)"
                            />
                            <input
                                type="number"
                                value={prize.amount}
                                onChange={(e) => handleArrayChange('prizes', index, { ...prize, amount: parseInt(e.target.value) || 0 })}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                placeholder="Amount (₹)"
                                min="0"
                            />
                            <input
                                type="text"
                                value={prize.description}
                                onChange={(e) => handleArrayChange('prizes', index, { ...prize, description: e.target.value })}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                placeholder="Description"
                            />
                        </div>
                        {formData.prizes.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeArrayItem('prizes', index)}
                                className="text-red-600 text-sm hover:text-red-700"
                            >
                                Remove Prize
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem('prizes', { position: '', amount: 0, description: '', benefits: [''] })}
                    className="text-orange-600 text-sm hover:text-orange-700"
                >
                    + Add Prize
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                            type="text"
                            value={tag}
                            onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Enter tag"
                        />
                        {formData.tags.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeArrayItem('tags', index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem('tags', '')}
                    className="text-orange-600 text-sm hover:text-orange-700"
                >
                    + Add Tag
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Enter skill"
                        />
                        {formData.skills.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeArrayItem('skills', index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem('skills', '')}
                    className="text-orange-600 text-sm hover:text-orange-700"
                >
                    + Add Skill
                </button>
            </div>
        </div>
    )
    const renderStep5 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">FAQs & Contact Information</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequently Asked Questions</label>
                {formData.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => handleArrayChange('faqs', index, { ...faq, question: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 mb-3"
                            placeholder="Question"
                        />
                        <textarea
                            value={faq.answer}
                            onChange={(e) => handleArrayChange('faqs', index, { ...faq, answer: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Answer"
                            rows={2}
                        />
                        {formData.faqs.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeArrayItem('faqs', index)}
                                className="text-red-600 text-sm hover:text-red-700 mt-2"
                            >
                                Remove FAQ
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem('faqs', { question: '', answer: '' })}
                    className="text-orange-600 text-sm hover:text-orange-700"
                >
                    + Add FAQ
                </button>
            </div>

            <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">Organizer Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                        <input
                            type="email"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Contact email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
                        <input
                            type="tel"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Contact phone number"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                        <input
                            type="url"
                            name="organizerLinkedin"
                            value={formData.organizerLinkedin}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="LinkedIn profile"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                        <input
                            type="url"
                            name="organizerTwitter"
                            value={formData.organizerTwitter}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Twitter profile"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                        <input
                            type="url"
                            name="organizerInstagram"
                            value={formData.organizerInstagram}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Instagram profile"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    placeholder="Event website"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discord</label>
                    <input
                        type="url"
                        name="discord"
                        value={formData.socialLinks.discord}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            socialLinks: { ...prev.socialLinks, discord: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                        placeholder="Discord invite link"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telegram</label>
                    <input
                        type="url"
                        name="telegram"
                        value={formData.socialLinks.telegram}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            socialLinks: { ...prev.socialLinks, telegram: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                        placeholder="Telegram group link"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                    <input
                        type="url"
                        name="whatsapp"
                        value={formData.socialLinks.whatsapp}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            socialLinks: { ...prev.socialLinks, whatsapp: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                        placeholder="WhatsApp group link"
                    />
                </div>
            </div>
        </div>
    )

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.24)' }}>
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center space-x-4 mt-4">
                        {[1, 2, 3, 4, 5].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {step}
                                </div>
                                {step < 5 && (
                                    <div className={`w-12 h-1 mx-2 ${step < currentStep ? 'bg-orange-600' : 'bg-gray-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-2 text-sm text-gray-600">
                        Step {currentStep} of 5: {
                            currentStep === 1 ? 'Basic Information' :
                                currentStep === 2 ? 'Date, Time & Location' :
                                    currentStep === 3 ? 'Registration Details' :
                                        currentStep === 4 ? 'Prizes & Additional Info' :
                                            'FAQs & Contact Information'
                        }
                    </div>
                </div>

                <div className="p-6">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                    {currentStep === 5 && renderStep5()}
                </div>

                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <div className="flex space-x-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            {currentStep < 5 ? (
                                <button
                                    onClick={nextStep}
                                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                                >
                                    {loading ? 'Creating...' : 'Create Event'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEventForm