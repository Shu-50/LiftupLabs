import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import apiService from '../services/api'

const EventRegistrationForm = ({ event, onClose, onRegistrationSuccess }) => {
    const { user } = useAuth()
    const { showSuccess, showError } = useNotification()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        // Contact Information
        phone: '',
        alternateEmail: '',

        // Team Information
        teamName: '',
        teamSize: event.registration?.teamSize?.min || 1,
        teamMembers: Array.from({ length: event.registration?.teamSize?.min || 1 }, (_, index) => {
            if (index === 0) {
                // Team leader (current user)
                return {
                    name: user.name,
                    email: user.email,
                    phone: '',
                    role: 'Team Leader',
                    institution: user?.profile?.institution || ''
                }
            } else {
                // Other team members
                return {
                    name: '',
                    email: '',
                    phone: '',
                    role: '',
                    institution: ''
                }
            }
        }),

        // Additional Information
        institution: user?.profile?.institution || '',
        experience: '',
        motivation: '',
        specialRequirements: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleTeamSizeChange = (newSize) => {
        const size = Math.max(event.registration?.teamSize?.min || 1, Math.min(newSize, event.registration?.teamSize?.max || 1))
        setFormData(prev => ({
            ...prev,
            teamSize: size,
            teamMembers: Array.from({ length: size }, (_, index) => {
                if (index === 0) {
                    // Team leader (current user)
                    return {
                        name: user.name,
                        email: user.email,
                        phone: prev.phone || '',
                        role: 'Team Leader',
                        institution: prev.institution || ''
                    }
                } else {
                    // Other team members
                    return prev.teamMembers[index] || {
                        name: '',
                        email: '',
                        phone: '',
                        role: '',
                        institution: ''
                    }
                }
            })
        }))
    }

    const handleTeamMemberChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            teamMembers: prev.teamMembers.map((member, i) =>
                i === index ? { ...member, [field]: value } : member
            )
        }))
    }

    const validateForm = () => {
        const errors = []

        if (!formData.phone) {
            errors.push('Phone number is required')
        }

        if (formData.teamSize > 1) {
            if (!formData.teamName) {
                errors.push('Team name is required for team registrations')
            }

            // Only validate team members (excluding team leader at index 0)
            formData.teamMembers.slice(1).forEach((member, index) => {
                if (!member.name) {
                    errors.push(`Team member ${index + 2} name is required`)
                }
                if (!member.email) {
                    errors.push(`Team member ${index + 2} email is required`)
                }
            })
        }

        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = validateForm()
        if (errors.length > 0) {
            showError(`Please fix the following errors:\n${errors.join('\n')}`)
            return
        }

        setLoading(true)
        try {
            const registrationData = {
                ...formData,
                // Set team leader as first member if team registration
                teamMembers: formData.teamSize > 1 ? [
                    {
                        name: user.name,
                        email: user.email,
                        phone: formData.phone,
                        role: 'Team Leader',
                        institution: formData.institution
                    },
                    ...formData.teamMembers.slice(1)
                ] : []
            }

            await apiService.registerForEvent(event._id, registrationData)
            showSuccess('Successfully registered for the event!')
            onRegistrationSuccess?.()
            onClose()
        } catch (error) {
            console.error('Registration error:', error)
            showError(error.message || 'Failed to register for event')
        } finally {
            setLoading(false)
        }
    }

    const isTeamEvent = (event.registration?.teamSize?.max || 1) > 1

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.24)' }}>
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Register for Event</h2>
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
                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    placeholder="Your phone number"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Email</label>
                                <input
                                    type="email"
                                    name="alternateEmail"
                                    value={formData.alternateEmail}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    placeholder="Alternate email (optional)"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Team Information */}
                    {isTeamEvent && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Team Name *</label>
                                    <input
                                        type="text"
                                        name="teamName"
                                        value={formData.teamName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                        placeholder="Your team name"
                                        required={isTeamEvent}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                                    <select
                                        value={formData.teamSize}
                                        onChange={(e) => handleTeamSizeChange(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    >
                                        {Array.from(
                                            { length: (event.registration?.teamSize?.max || 1) - (event.registration?.teamSize?.min || 1) + 1 },
                                            (_, i) => (event.registration?.teamSize?.min || 1) + i
                                        ).map(size => (
                                            <option key={size} value={size}>{size} member{size > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Team Members */}
                            {formData.teamSize > 1 && (
                                <div>
                                    <h4 className="text-md font-semibold text-gray-800 mb-3">Team Members</h4>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                                        <p className="text-blue-800 text-sm">
                                            <strong>Team Leader:</strong> {user.name} ({user.email})
                                        </p>
                                    </div>

                                    {formData.teamMembers.slice(1).map((member, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                                            <h5 className="font-medium text-gray-900 mb-3">Team Member {index + 2}</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                                    <input
                                                        type="text"
                                                        value={member.name}
                                                        onChange={(e) => handleTeamMemberChange(index + 1, 'name', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                                        placeholder="Member name"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                                    <input
                                                        type="email"
                                                        value={member.email}
                                                        onChange={(e) => handleTeamMemberChange(index + 1, 'email', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                                        placeholder="Member email"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                                    <input
                                                        type="tel"
                                                        value={member.phone}
                                                        onChange={(e) => handleTeamMemberChange(index + 1, 'phone', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                                        placeholder="Member phone"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                                                    <input
                                                        type="text"
                                                        value={member.institution}
                                                        onChange={(e) => handleTeamMemberChange(index + 1, 'institution', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                                        placeholder="Member institution"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Additional Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                                <input
                                    type="text"
                                    name="institution"
                                    value={formData.institution}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    placeholder="Your institution/organization"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                >
                                    <option value="">Select experience level</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                    <option value="expert">Expert</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to participate?</label>
                                <textarea
                                    name="motivation"
                                    value={formData.motivation}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    placeholder="Tell us about your motivation to participate..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                                <textarea
                                    name="specialRequirements"
                                    value={formData.specialRequirements}
                                    onChange={handleInputChange}
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    placeholder="Any dietary restrictions, accessibility needs, etc."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Registration Fee */}
                    {!event.registration?.fee?.isFree && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-orange-900 mb-2">Registration Fee</h3>
                            <p className="text-orange-800">
                                <span className="text-2xl font-bold">₹{event.registration.fee.amount}</span>
                                {isTeamEvent && formData.teamSize > 1 && (
                                    <span className="text-sm ml-2">
                                        (Total: ₹{event.registration.fee.amount * formData.teamSize})
                                    </span>
                                )}
                            </p>
                            <p className="text-orange-700 text-sm mt-1">
                                Payment will be processed after registration confirmation.
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
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
                            {loading ? 'Registering...' : 'Register Now'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EventRegistrationForm