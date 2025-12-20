import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import UploadNotesModal from '../components/UploadNotesModal'

const BrowseNotes = () => {
    const { user } = useAuth()
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilters, setSelectedFilters] = useState({
        subject: 'All Subjects',
        type: 'All Types',
        semester: 'All Semesters'
    })
    const [sortBy, setSortBy] = useState('latest')
    const [pagination, setPagination] = useState({
        current: 1,
        pages: 1,
        total: 0,
        hasNext: false,
        hasPrev: false
    })
    const [uploadModalOpen, setUploadModalOpen] = useState(false)

    // Debounce search
    const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchQuery])

    const fetchNotes = useCallback(async (page = 1) => {
        setLoading(true)
        setError('')

        try {
            const filters = {
                page,
                limit: 12,
                sort: sortBy
            }

            if (debouncedSearch) filters.search = debouncedSearch
            if (selectedFilters.subject !== 'All Subjects') filters.subject = selectedFilters.subject
            if (selectedFilters.type !== 'All Types') filters.type = selectedFilters.type
            if (selectedFilters.semester !== 'All Semesters') filters.semester = selectedFilters.semester

            const response = await api.getNotes(filters)

            if (response.success) {
                setNotes(response.data.notes)
                setPagination(response.data.pagination)
            }
        } catch (err) {
            console.error('Fetch notes error:', err)
            setError('Failed to load notes. Please try again.')
        } finally {
            setLoading(false)
        }
    }, [debouncedSearch, selectedFilters, sortBy])

    useEffect(() => {
        fetchNotes(1)
    }, [fetchNotes])

    const handleDownload = async (noteId, fileUrl, fileName) => {
        try {
            const response = await api.downloadNote(noteId)
            if (response.success) {
                // Create download link
                const link = document.createElement('a')
                link.href = import.meta.env.VITE_API_URL.replace('/api', '') + fileUrl
                link.download = fileName
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                // Update download count in UI
                setNotes(prev => prev.map(note =>
                    note._id === noteId ? { ...note, downloads: note.downloads + 1 } : note
                ))
            }
        } catch (err) {
            console.error('Download error:', err)
            alert('Failed to download note')
        }
    }

    const handleSave = async (noteId, isSaved) => {
        if (!user) {
            alert('Please login to save notes')
            return
        }

        try {
            if (isSaved) {
                await api.unsaveNote(noteId)
            } else {
                await api.saveNote(noteId)
            }

            // Update UI
            setNotes(prev => prev.map(note =>
                note._id === noteId ? { ...note, isSaved: !isSaved } : note
            ))
        } catch (err) {
            console.error('Save error:', err)
            alert('Failed to save note')
        }
    }

    const handlePreview = (fileUrl) => {
        const fullUrl = import.meta.env.VITE_API_URL.replace('/api', '') + fileUrl
        window.open(fullUrl, '_blank')
    }

    const handleUploadSuccess = (newNote) => {
        // Refresh notes list
        fetchNotes(pagination.current)
    }

    const formatFileSize = (bytes) => {
        if (!bytes) return 'N/A'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-orange-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-900">Browse Notes & PYQs</h1>
                    {user && (
                        <button
                            onClick={() => setUploadModalOpen(true)}
                            className="w-full sm:w-auto bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-xs sm:text-sm md:text-base"
                        >
                            📤 Upload Notes
                        </button>
                    )}
                </div>
                <p className="text-gray-700 text-sm sm:text-base">
                    Find verified study materials, previous year questions, and academic resources from students across India
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-orange-200">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <input
                        type="text"
                        placeholder="Search notes, subjects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
                    />
                    <select
                        value={selectedFilters.subject}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, subject: e.target.value })}
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
                    >
                        <option>All Subjects</option>
                        <option>Computer Science</option>
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Electronics</option>
                    </select>
                    <select
                        value={selectedFilters.type}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, type: e.target.value })}
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
                    >
                        <option>All Types</option>
                        <option>Notes</option>
                        <option>PYQ</option>
                        <option>Cheatsheet</option>
                        <option>Lab Manual</option>
                        <option>Slides</option>
                    </select>
                    <select
                        value={selectedFilters.semester}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, semester: e.target.value })}
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
                    >
                        <option>All Semesters</option>
                        <option>Sem 1</option>
                        <option>Sem 2</option>
                        <option>Sem 3</option>
                        <option>Sem 4</option>
                        <option>Sem 5</option>
                        <option>Sem 6</option>
                        <option>Sem 7</option>
                        <option>Sem 8</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
                    >
                        <option value="latest">Latest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="downloads">Most Downloaded</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>

                {/* Results count */}
                <div className="text-xs sm:text-sm text-gray-600">
                    Showing {notes.length} of {pagination.total} notes
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                    <p className="mt-4 text-gray-600">Loading notes...</p>
                </div>
            )}

            {/* Notes Grid */}
            {!loading && notes.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                    {notes.map((note) => (
                        <div key={note._id} className="bg-white rounded-lg border border-orange-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                            <div className="bg-gradient-to-r from-orange-100 to-orange-50 h-20 sm:h-28 md:h-32 flex items-center justify-center shrink-0">
                                <span className="text-gray-500 text-2xl sm:text-4xl md:text-5xl">📄</span>
                            </div>
                            <div className="p-2 sm:p-4 md:p-6 flex flex-col flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xs sm:text-base md:text-lg font-semibold text-gray-900 mb-0.5 line-clamp-2 leading-tight">{note.title}</h3>
                                        <p className="text-gray-600 text-[10px] sm:text-sm truncate">by {note.author?.name || 'Anonymous'}</p>
                                    </div>
                                    <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-medium whitespace-nowrap ml-1 sm:ml-2">
                                        {note.type}
                                    </span>
                                </div>

                                {note.description && (
                                    <p className="text-gray-600 text-[10px] sm:text-sm mb-2 line-clamp-2 hidden sm:block">{note.description}</p>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 mb-2 sm:mb-4 text-[10px] sm:text-sm text-gray-600">
                                    <div className="truncate">
                                        <span className="font-medium">Sub:</span> {note.subject}
                                    </div>
                                    <div className="truncate">
                                        <span className="font-medium">Size:</span> {formatFileSize(note.fileSize)}
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2 text-[10px] sm:text-sm text-gray-600">
                                            <span className="flex items-center">
                                                ⭐ {note.rating.toFixed(1)}
                                            </span>
                                            <span className="flex items-center">
                                                📥 {note.downloads}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5 sm:hidden">
                                        <button
                                            onClick={() => handleDownload(note._id, note.fileUrl, note.fileName)}
                                            className="w-full bg-orange-600 text-white px-2 py-1 rounded-md font-medium text-[10px] hover:bg-orange-700 transition-colors"
                                        >
                                            Download
                                        </button>
                                        <div className="flex gap-1.5">
                                            <button
                                                onClick={() => handlePreview(note.fileUrl)}
                                                className="flex-1 border border-orange-300 text-orange-700 px-2 py-1 rounded-md font-medium text-[10px] hover:bg-orange-50 transition-colors"
                                            >
                                                Preview
                                            </button>
                                            {user && (
                                                <button
                                                    onClick={() => handleSave(note._id, note.isSaved)}
                                                    className="px-2 py-1 border border-orange-300 text-orange-700 rounded-md font-medium text-[10px] hover:bg-orange-50 transition-colors"
                                                >
                                                    {note.isSaved ? '❤️' : '🤍'}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tablet/Desktop Buttons */}
                                    <div className="hidden sm:flex items-center space-x-2">
                                        <button
                                            onClick={() => handleDownload(note._id, note.fileUrl, note.fileName)}
                                            className="flex-1 bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-xs sm:text-sm"
                                        >
                                            📥 Download
                                        </button>
                                        <button
                                            onClick={() => handlePreview(note.fileUrl)}
                                            className="px-3 py-1.5 sm:px-4 sm:py-2 border border-orange-300 text-orange-700 rounded-lg font-medium hover:bg-orange-50 transition-colors text-xs sm:text-sm"
                                        >
                                            👁️ Preview
                                        </button>
                                        {user && (
                                            <button
                                                onClick={() => handleSave(note._id, note.isSaved)}
                                                className="px-3 py-1.5 sm:px-4 sm:py-2 border border-orange-300 text-orange-700 rounded-lg font-medium hover:bg-orange-50 transition-colors text-xs sm:text-sm"
                                            >
                                                {note.isSaved ? '❤️' : '🤍'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && notes.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-orange-200">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Pagination */}
            {!loading && pagination.pages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                    <button
                        onClick={() => fetchNotes(pagination.current - 1)}
                        disabled={!pagination.hasPrev}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-gray-700">
                        Page {pagination.current} of {pagination.pages}
                    </span>
                    <button
                        onClick={() => fetchNotes(pagination.current + 1)}
                        disabled={!pagination.hasNext}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Upload Modal */}
            <UploadNotesModal
                isOpen={uploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                onSuccess={handleUploadSuccess}
            />
        </div>
    )
}

export default BrowseNotes