import { useState } from 'react'
import apiService from '../services/api'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        topic: '',
        relatedTo: 'General',
        message: '',
        sendCopy: false
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        // Clear error when user starts typing
        if (submitStatus === 'error') {
            setSubmitStatus(null)
            setErrorMessage('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)
        setErrorMessage('')

        try {
            const response = await apiService.submitContactForm(formData)

            if (response.success) {
                setSubmitStatus('success')
                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    topic: '',
                    relatedTo: 'General',
                    message: '',
                    sendCopy: false
                })
                // Clear success message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus(null)
                }, 5000)
            } else {
                setSubmitStatus('error')
                setErrorMessage(response.message || 'Failed to send message')
            }
        } catch (error) {
            console.error('Contact form error:', error)
            setSubmitStatus('error')
            setErrorMessage(error.response?.data?.message || 'Failed to send message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white rounded-lg p-6 border border-orange-200">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Send us a message</h3>
                <p className="text-gray-600 text-sm">We usually respond within 24 hours</p>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <div className="flex-1">
                            <h4 className="font-semibold text-green-800">Message Sent Successfully!</h4>
                            <p className="text-green-700 text-sm mt-1">
                                Thank you for contacting us. We'll get back to you within 24-48 hours.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <span className="text-red-500 text-xl">⚠️</span>
                        <div className="flex-1">
                            <h4 className="font-semibold text-red-800">Failed to Send Message</h4>
                            <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            name="topic"
                            placeholder="Topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <select
                            name="relatedTo"
                            value={formData.relatedTo}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-white"
                        >
                            <option value="General">General Inquiry</option>
                            <option value="Events">Events & Competitions</option>
                            <option value="Notes">Notes & Resources</option>
                            <option value="Technical">Technical Support</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Support">Customer Support</option>
                            <option value="Feedback">Feedback</option>
                        </select>
                    </div>
                </div>

                <div>
                    <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none"
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            name="sendCopy"
                            checked={formData.sendCopy}
                            onChange={handleInputChange}
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-300"
                        />
                        <span>Send me a copy</span>
                    </label>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin">⏳</span>
                                <span>Sending...</span>
                            </>
                        ) : (
                            <>
                                <span>📤</span>
                                <span>Submit</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm