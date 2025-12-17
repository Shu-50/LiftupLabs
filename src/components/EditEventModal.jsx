import { useState, useEffect } from 'react'
import { useNotification } from '../context/NotificationContext'
import apiService from '../services/api'

const EditEventModal = ({ event, onClose, onEventUpdated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'hackathon',
        mode: 'Online',
        dateTime: {
            start: '',
            end: ''
        },
        location: {
            city: '',
            venue: '',
            address: ''
        },
        registration: {
            deadline: '',
            maxParticipants: '',
            fee: {
                amount: 0,
                isFree: true
            }
        },
        prizes: [{ position: 'First', amount: 0, description: '' }],
        tags: [],
        requirements: '',
        contactEmail: '',
        contactPhone: '',
        website: '',
        status: 'published'
    })
    const [isLoading, setIsLoading] = useState(false)
    const [tagInput, setTagInput] = useState('')
    const { showSuccess, showError } = useNotification()

    // Initialize form with event data
    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title || '',
                description: event.description || '',
                category: event.category || 'hackathon',
                mode: event.mode || 'Online',
                dateTime: {
                    start: event.dateTime?.start ? new Date(event.dateTime.start).toISOString().slice(0, 16) : '',
                    end: event.dateTime?.end ? new Date(event.dateTime.end).toISOString().slice(0, 16) : ''
                },
                location: {
                    city: event.location?.city || '',
                    venue: event.location?.venue || '',
                    address: event.location?.address || ''
                },
                registration: {
                    deadline: event.registration?.deadline ? new Date(event.registration.deadline).toISOString().slice(0, 16) : '',
                    maxParticipants: event.registration?.maxParticipants || '',
                    fee: {
                        amount: event.registration?.fee?.amount || event.registration?.fee || 0,
                        isFree: event.registration?.fee?.isFree !== undefined ? event.registration.fee.isFree : true
                    }
                },
                prizes: event.prizes?.length > 0 ? event.prizes : [{ position: 'First', amount: 0, description: '' }],
                tags: event.tags || [],
                requirements: event.requirements || '',
                contactEmail: event.organizer?.contact?.email || '',
                contactPhone: event.organizer?.contact?.phone || '',
                website: event.organizer?.contact?.website || '',
                status: event.status || 'published'
            })
        }
    }, [event])

    const handleInputChange = (e) => {
        const { name, value } = e.target

        if (name.includes('.')) {
            const [parent, child] = name.split('.')
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handlePrizeChange = (index, field, value) => {
        const updatedPrizes = [...formData.prizes]
        updatedPrizes[index] = {
            ...updatedPrizes[index],
            [field]: field === 'amount' ? parseInt(value) || 0 : value
        }
        setFormData(prev => ({
            ...prev,
            prizes: updatedPrizes
        }))
    }

    const addPrize = () => {
        setFormData(prev => ({
            ...prev,
            prizes: [...prev.prizes, { position: '', amount: 0, description: '' }]
        }))
    }

    const removePrize = (index) => {
        setFormData(prev => ({
            ...prev,
            prizes: prev.prizes.filter((_, i) => i !== index)
        }))
    }

    const handleTagAdd = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }))
            setTagInput('')
        }
    }

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Validate dates
            const startDate = new Date(formData.dateTime.start)
            const endDate = new Date(formData.dateTime.end)
            const deadline = new Date(formData.registration.deadline)

            if (endDate <= startDate) {
                showError('Event end date must be after start date')
                return
            }

            if (deadline >= startDate) {
                showError('Registration deadline must be before event start date')
                return
            }

            const updateData = {
                ...formData,
                registration: {
                    ...formData.registration,
                    maxParticipants: parseInt(formData.registration.maxParticipants) || null
                }
            }

            console.log('=== FRONTEND: Updating event ===')
            console.log('Event ID:', event._id)
            console.log('Update data:', JSON.stringify(updateData, null, 2))

            const response = await apiService.updateEvent(event._id, updateData)
            
            console.log('Update response:', response)
            
            showSuccess('Event updated successfully')
            onEventUpdated()
            onClose()
        } catch (error) {
            console.error('Update event error:', error)
            console.error('Error response:', error.response?.data)
            showError(error.response?.data?.message || 'Failed to update event')
        } finally {
            setIsLoading(false)
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
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                required
                            >
                                <option value="hackathon">Hackathon</option>
                                <option value="quiz">Quiz</option>
                                <option value="workshop">Workshop</option>
                                <option value="seminar">Seminar</option>
                                <option value="tech-fest">Tech Fest</option>
                                <option value="competition">Competition</option>
                                <option value="conference">Conference</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            required
                        />
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                            <input
                                type="datetime-local"
                                name="dateTime.start"
                                value={formData.dateTime.start}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
                            <input
                                type="datetime-local"
                                name="dateTime.end"
                                value={formData.dateTime.end}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Deadline</label>
                            <input
                                type="datetime-local"
                                name="registration.deadline"
                                value={formData.registration.deadline}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Mode and Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Event Mode</label>
                        <div className="flex space-x-6">
                            {['Online', 'Offline', 'Hybrid'].map((mode) => (
                                <label key={mode} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="mode"
                                        value={mode}
                                        checked={formData.mode === mode}
                                        onChange={handleInputChange}
                                        className="text-orange-600 focus:ring-orange-300"
                                    />
                                    <span className="text-sm text-gray-700">{mode}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {(formData.mode === 'Offline' || formData.mode === 'Hybrid') && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    name="location.city"
                                    value={formData.location.city}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                                <input
                                    type="text"
                                    name="location.venue"
                                    value={formData.location.venue}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    name="location.address"
                                    value={formData.location.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                />
                            </div>
                        </div>
                    )}

                    {/* Registration Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                            <input
                                type="number"
                                name="registration.maxParticipants"
                                value={formData.registration.maxParticipants}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                min="1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Fee (₹)</label>
                            <input
                                type="number"
                                name="registration.fee.amount"
                                value={formData.registration.fee.amount}
                                onChange={(e) => {
                                    const amount = parseInt(e.target.value) || 0;
                                    handleInputChange({
                                        target: {
                                            name: 'registration',
                                            value: {
                                                ...formData.registration,
                                                fee: {
                                                    amount: amount,
                                                    isFree: amount === 0,
                                                    currency: 'INR'
                                                }
                                            }
                                        }
                                    });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Updating...' : 'Update Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEventModal