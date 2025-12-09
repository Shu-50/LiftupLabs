import { useState } from 'react'
import api from '../services/api'

const UploadNotesModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        type: 'Notes',
        semester: '',
        university: '',
        tags: '',
        pages: ''
    })
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [dragActive, setDragActive] = useState(false)

    const subjects = [
        'Computer Science',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Electronics',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electrical Engineering',
        'Other'
    ]

    const types = ['Notes', 'PYQ', 'Cheatsheet', 'Lab Manual', 'Slides']

    const semesters = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8']

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('')
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        validateAndSetFile(selectedFile)
    }

    const validateAndSetFile = (selectedFile) => {
        if (!selectedFile) return

        // Validate file type
        if (selectedFile.type !== 'application/pdf') {
            setError('Only PDF files are allowed')
            return
        }

        // Validate file size (50MB - Supabase free tier limit)
        const maxSize = 50 * 1024 * 1024
        if (selectedFile.size > maxSize) {
            setError('File size must be less than 50MB')
            return
        }

        setFile(selectedFile)
        setError('')
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validation
        if (!formData.title.trim()) {
            setError('Title is required')
            return
        }

        if (!formData.subject) {
            setError('Subject is required')
            return
        }

        if (!file) {
            setError('Please select a PDF file')
            return
        }

        setUploading(true)

        try {
            // Create FormData
            const uploadData = new FormData()
            uploadData.append('file', file)
            uploadData.append('title', formData.title.trim())
            uploadData.append('description', formData.description.trim())
            uploadData.append('subject', formData.subject)
            uploadData.append('type', formData.type)
            
            if (formData.semester) uploadData.append('semester', formData.semester)
            if (formData.university) uploadData.append('university', formData.university)
            if (formData.pages) uploadData.append('pages', formData.pages)
            
            // Parse tags
            if (formData.tags) {
                const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                uploadData.append('tags', JSON.stringify(tagsArray))
            }

            const response = await api.uploadNote(uploadData)

            if (response.success) {
                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    subject: '',
                    type: 'Notes',
                    semester: '',
                    university: '',
                    tags: '',
                    pages: ''
                })
                setFile(null)
                
                if (onSuccess) onSuccess(response.data.note)
                onClose()
            }
        } catch (err) {
            console.error('Upload error:', err)
            setError(err.message || 'Failed to upload note. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-orange-900">Upload Notes</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                            disabled={uploading}
                        >
                            ×
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            PDF File <span className="text-red-500">*</span>
                        </label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center ${
                                dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            {file ? (
                                <div className="space-y-2">
                                    <div className="text-4xl">📄</div>
                                    <div className="font-medium text-gray-900">{file.name}</div>
                                    <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
                                    <button
                                        type="button"
                                        onClick={() => setFile(null)}
                                        className="text-red-600 hover:text-red-700 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="text-4xl mb-2">📁</div>
                                    <p className="text-gray-600 mb-2">
                                        Drag and drop your PDF here, or click to browse
                                    </p>
                                    <input
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-700"
                                    >
                                        Choose File
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">Maximum file size: 50MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="e.g., Data Structures Complete Notes"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Brief description of the content..."
                        />
                    </div>

                    {/* Subject and Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                required
                            >
                                <option value="">Select Subject</option>
                                {subjects.map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                required
                            >
                                {types.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Semester and Pages */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Semester
                            </label>
                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            >
                                <option value="">Select Semester</option>
                                {semesters.map(sem => (
                                    <option key={sem} value={sem}>{sem}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Pages
                            </label>
                            <input
                                type="number"
                                name="pages"
                                value={formData.pages}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                                placeholder="e.g., 45"
                            />
                        </div>
                    </div>

                    {/* University */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            University/College
                        </label>
                        <input
                            type="text"
                            name="university"
                            value={formData.university}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="e.g., IIT Delhi"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="e.g., Arrays, Trees, Algorithms"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="submit"
                            disabled={uploading}
                            className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {uploading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Uploading...
                                </span>
                            ) : (
                                '📤 Upload Note'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={uploading}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadNotesModal
