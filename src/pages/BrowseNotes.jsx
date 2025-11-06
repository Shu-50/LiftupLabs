import { useState } from 'react'

const BrowseNotes = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilters, setSelectedFilters] = useState({
        subject: 'All',
        type: 'All',
        semester: 'All'
    })

    const notes = [
        {
            id: 1,
            title: 'DBMS Unit-wise Notes (2024 Updated)',
            subject: 'Computer Science',
            type: 'Notes',
            semester: 'Sem 4',
            author: 'Arjun Sharma',
            downloads: '2.3k',
            rating: 4.8,
            size: '2.5 MB',
            pages: 45,
            tags: ['Database', 'SQL', 'Normalization']
        },
        {
            id: 2,
            title: 'PYQs: Discrete Mathematics (2019-2024)',
            subject: 'Mathematics',
            type: 'PYQ',
            semester: 'Sem 3',
            author: 'Priya Patel',
            downloads: '1.8k',
            rating: 4.6,
            size: '1.2 MB',
            pages: 28,
            tags: ['Graph Theory', 'Logic', 'Combinatorics']
        },
        {
            id: 3,
            title: 'Data Structures in C++ (Comprehensive)',
            subject: 'Computer Science',
            type: 'Notes',
            semester: 'Sem 3',
            author: 'Rahul Kumar',
            downloads: '3.1k',
            rating: 4.9,
            size: '4.1 MB',
            pages: 67,
            tags: ['Arrays', 'Trees', 'Graphs', 'Algorithms']
        },
        {
            id: 4,
            title: 'The Algorithms Cheatsheet',
            subject: 'Computer Science',
            type: 'Cheatsheet',
            semester: 'All',
            author: 'Tech Community',
            downloads: '5.2k',
            rating: 4.7,
            size: '800 KB',
            pages: 12,
            tags: ['Sorting', 'Searching', 'Dynamic Programming']
        }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-orange-900">Browse Notes & PYQs</h1>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                        Upload Notes
                    </button>
                </div>
                <p className="text-gray-700">
                    Find verified study materials, previous year questions, and academic resources from students across India
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search notes, subjects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                    <select
                        value={selectedFilters.subject}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, subject: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
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
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option>All Types</option>
                        <option>Notes</option>
                        <option>PYQ</option>
                        <option>Cheatsheet</option>
                        <option>Lab Manual</option>
                    </select>
                    <select
                        value={selectedFilters.semester}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, semester: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
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
                </div>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {notes.map((note) => (
                    <div key={note.id} className="bg-white rounded-lg border border-orange-200 overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="bg-gray-100 h-32 flex items-center justify-center">
                            <span className="text-gray-500">📄 PDF Preview</span>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{note.title}</h3>
                                    <p className="text-gray-600 text-sm">by {note.author}</p>
                                </div>
                                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                                    {note.type}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                                <div>
                                    <span className="font-medium">Subject:</span> {note.subject}
                                </div>
                                <div>
                                    <span className="font-medium">Semester:</span> {note.semester}
                                </div>
                                <div>
                                    <span className="font-medium">Size:</span> {note.size}
                                </div>
                                <div>
                                    <span className="font-medium">Pages:</span> {note.pages}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>⭐ {note.rating}</span>
                                    <span>📥 {note.downloads}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {note.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex space-x-3">
                                <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                                    📥 Download
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                    👁️ Preview
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                    💾 Save
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrowseNotes