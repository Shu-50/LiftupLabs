import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import UploadNotesModal from './UploadNotesModal'

const NotesSection = () => {
    const { user } = useAuth()
    const [selectedSubject, setSelectedSubject] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [uploadModalOpen, setUploadModalOpen] = useState(false)

    const subjects = [
        { id: 'all', label: 'All Subjects' },
        { id: 'Computer Science', label: 'Computer Science' },
        { id: 'Mathematics', label: 'Mathematics' },
        { id: 'Electronics', label: 'Electronics' },
        { id: 'Physics', label: 'Physics' },
        { id: 'Chemistry', label: 'Chemistry' }
    ]

    const categories = [
        { id: 'Notes', label: 'Notes', icon: '📝' },
        { id: 'PYQ', label: 'PYQs', icon: '❓' },
        { id: 'Lab Manual', label: 'Lab Manuals', icon: '🔬' },
        { id: 'Slides', label: 'Slides', icon: '📊' }
    ]

    useEffect(() => {
        fetchNotes()
    }, [selectedSubject, searchQuery])

    const fetchNotes = async () => {
        setLoading(true)
        try {
            const filters = {
                limit: 6,
                sort: 'latest'
            }

            if (selectedSubject !== 'all') filters.subject = selectedSubject
            if (searchQuery) filters.search = searchQuery

            const response = await api.getNotes(filters)
            if (response.success) {
                setNotes(response.data.notes)
            }
        } catch (err) {
            console.error('Fetch notes error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = async (noteId, fileUrl, fileName) => {
        try {
            const response = await api.downloadNote(noteId)
            if (response.success) {
                // Fetch the file as a blob to force download
                const fileResponse = await fetch(response.data.fileUrl)
                const blob = await fileResponse.blob()
                
                // Create blob URL and trigger download
                const blobUrl = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = blobUrl
                link.download = fileName
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                
                // Clean up blob URL
                window.URL.revokeObjectURL(blobUrl)

                setNotes(prev => prev.map(note =>
                    note.id === noteId ? { ...note, downloads: note.downloads + 1 } : note
                ))
            }
        } catch (err) {
            console.error('Download error:', err)
        }
    }

    const handlePreview = (fileUrl) => {
        window.open(fileUrl, '_blank')
    }

    const handleUploadSuccess = () => {
        fetchNotes()
    }

    const filteredNotes = notes.filter(note => {
        const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject
        const matchesSearch = !searchQuery || 
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.author_name?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSubject && matchesSearch
    })

    const NoteCard = ({ note }) => (
        <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 text-xl">
                            {categories.find(c => c.id === note.type)?.icon || '📄'}
                        </span>
                    </div>
                    <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {note.type}
                        </span>
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{note.title}</h3>
            <p className="text-orange-600 font-medium mb-1">{note.author_name || 'Anonymous'}</p>
            <p className="text-gray-600 text-sm mb-3">
                {note.university || 'University'} • {note.semester || 'All Semesters'}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                    <span>📥</span>
                    <span>{note.downloads} downloads</span>
                </div>
                <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{note.rating.toFixed(1)}/5</span>
                </div>
                {note.pages > 0 && (
                    <div className="flex items-center space-x-1">
                        <span>📄</span>
                        <span>{note.pages} pages</span>
                    </div>
                )}
                {note.file_size && (
                    <div className="flex items-center space-x-1">
                        <span>💾</span>
                        <span>{(note.file_size / (1024 * 1024)).toFixed(1)} MB</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                    {new Date(note.created_at).toLocaleDateString()}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {note.subject}
                </span>
            </div>

            <div className="flex space-x-3">
                <button
                    onClick={() => handleDownload(note.id, note.file_url, note.file_name)}
                    className="flex-1 bg-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700"
                >
                    📥 Download
                </button>
                <button
                    onClick={() => handlePreview(note.file_url)}
                    className="px-4 py-2 border border-orange-300 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-50"
                >
                    👁️ Preview
                </button>
            </div>
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-orange-900 mb-2">Notes & PYQs</h1>
                        <p className="text-gray-700">Access study materials, notes, and previous year questions</p>
                    </div>
                    {user && (
                        <button
                            onClick={() => setUploadModalOpen(true)}
                            className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700"
                        >
                            📤 Upload Notes
                        </button>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search notes, authors, or topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                            />
                            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {subjects.map((subject) => (
                            <button
                                key={subject.id}
                                onClick={() => setSelectedSubject(subject.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    selectedSubject === subject.id
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                }`}
                            >
                                {subject.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                    {categories.map((category) => {
                        const count = notes.filter(n => n.type === category.id).length
                        return (
                            <div key={category.id} className="flex items-center space-x-2 px-3 py-2 bg-orange-50 rounded-lg">
                                <span>{category.icon}</span>
                                <span className="text-sm font-medium text-orange-700">{category.label}</span>
                                <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full">
                                    {count}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                    <p className="mt-4 text-gray-600">Loading notes...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotes.map((note) => (
                            <NoteCard key={note.id} note={note} />
                        ))}
                    </div>

                    {filteredNotes.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-lg border border-orange-200">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes found</h3>
                            <p className="text-gray-600">Try adjusting your search or filters</p>
                        </div>
                    )}
                </>
            )}

            <UploadNotesModal
                isOpen={uploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                onSuccess={handleUploadSuccess}
            />
        </div>
    )
}

export default NotesSection