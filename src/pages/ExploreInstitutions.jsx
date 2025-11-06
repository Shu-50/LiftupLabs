import { useState } from 'react'

const ExploreInstitutions = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilters, setSelectedFilters] = useState({
        type: 'All',
        location: 'All',
        category: 'All'
    })

    const institutions = [
        {
            id: 1,
            name: 'IIT Kanpur',
            type: 'Public Institute',
            location: 'Kanpur, UP',
            category: 'Engineering',
            verified: true,
            followers: '43 Events',
            students: '18 Courses',
            rating: 4.8,
            image: '/api/placeholder/100/100',
            tags: ['Engineering', 'Research', 'CSE', 'ECE', 'ME']
        },
        {
            id: 2,
            name: 'NIT Trichy - ECE Club',
            type: 'Student Club',
            location: 'Trichy, TN',
            category: 'Electronics',
            verified: true,
            followers: '8 Members',
            students: '36 Followers',
            rating: 4.6,
            image: '/api/placeholder/100/100',
            tags: ['Workshops', 'Live Sessions', 'ECE']
        },
        {
            id: 3,
            name: 'AIIMS Delhi',
            type: 'Medical Institute',
            location: 'New Delhi',
            category: 'Medicine',
            verified: true,
            followers: '12 Events',
            students: '25 Courses',
            rating: 4.9,
            image: '/api/placeholder/100/100',
            tags: ['Medicine', 'Research', 'Healthcare']
        },
        {
            id: 4,
            name: 'Open Source India',
            type: 'Community',
            location: 'Pan India',
            category: 'Technology',
            verified: false,
            followers: '9 Events',
            students: '256 Members',
            rating: 4.4,
            image: '/api/placeholder/100/100',
            tags: ['Hackathons', 'Open Source', 'DevOps']
        }
    ]

    const topHosts = [
        { name: 'Ananya Sharma', role: 'Student', followers: 'Follow' },
        { name: 'Prof. R. Gupta', role: 'Professor', followers: 'Follow' },
        { name: 'ECE Club Lead', role: 'Club Lead', followers: 'Follow' }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-orange-900">Explore Institutions & Hosts</h1>
                    <div className="flex space-x-3">
                        <button className="border border-orange-300 text-orange-700 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                            Become a Host
                        </button>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                            Create Event
                        </button>
                    </div>
                </div>
                <p className="text-gray-700">
                    Find verified colleges, universities, clubs and creators. Follow hosts to get notified about new events and courses.
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search institutions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                    <select
                        value={selectedFilters.type}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, type: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option>All Types</option>
                        <option>Universities</option>
                        <option>Institutes</option>
                        <option>Student Clubs</option>
                        <option>Communities</option>
                        <option>Professionals</option>
                    </select>
                    <select
                        value={selectedFilters.location}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, location: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option>All Locations</option>
                        <option>Delhi</option>
                        <option>Mumbai</option>
                        <option>Bangalore</option>
                        <option>Chennai</option>
                        <option>Hyderabad</option>
                        <option>Pune</option>
                    </select>
                    <select
                        value={selectedFilters.category}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, category: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option>All Categories</option>
                        <option>Engineering</option>
                        <option>Medicine</option>
                        <option>Business</option>
                        <option>Arts</option>
                        <option>Science</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Institutions List */}
                <div className="lg:col-span-2 space-y-4">
                    {institutions.map((institution) => (
                        <div key={institution.id} className="bg-white rounded-lg border border-orange-200 p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-gray-500 text-xs">Logo</span>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{institution.name}</h3>
                                                {institution.verified && (
                                                    <span className="text-blue-500">✓</span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm">{institution.type} • {institution.location}</p>
                                        </div>
                                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                                            Follow
                                        </button>
                                    </div>

                                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                                        <span>📊 {institution.followers}</span>
                                        <span>👥 {institution.students}</span>
                                        <span>⭐ {institution.rating}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {institution.tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex space-x-3">
                                        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                                            View Profile
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Top Hosts */}
                    <div className="bg-white rounded-lg border border-orange-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Hosts</h3>
                        <div className="space-y-3">
                            {topHosts.map((host, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                                            <span className="text-orange-700 text-xs font-medium">
                                                {host.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 text-sm">{host.name}</div>
                                            <div className="text-gray-600 text-xs">{host.role}</div>
                                        </div>
                                    </div>
                                    <button className="text-orange-600 hover:text-orange-700 text-xs font-medium">
                                        {host.followers}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map */}
                    <div className="bg-white rounded-lg border border-orange-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Map</h3>
                        <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Interactive Map</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white rounded-lg border border-orange-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-sm text-gray-700">
                                <span>📋</span>
                                <span>Verification Guidelines</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-700">
                                <span>📊</span>
                                <span>Host Dashboard</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-700">
                                <span>❓</span>
                                <span>Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Institution Profile Preview */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <h2 className="text-2xl font-semibold text-orange-900 mb-4">Institution Profile Preview</h2>
                <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-48 rounded-lg mb-6 flex items-center justify-center">
                    <span className="text-white text-lg">IIT Kanpur</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                        <p className="text-gray-700 mb-4">
                            Indian Institute of Technology Kanpur is a premier institute known for research and innovation across engineering and sciences.
                        </p>

                        <div className="space-y-2 mb-6">
                            <h4 className="font-semibold text-gray-900">Recent Events</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Inter-IIT Hackathon 2025</li>
                                <li>• DSA Bootcamp Week</li>
                                <li>• Quantum Summer Series</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900">Courses</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Data Structures in C/C++</li>
                                <li>• Linear Algebra for Engineers</li>
                                <li>• Intro to AI</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Contacts</h4>
                        <div className="space-y-2 mb-6 text-sm text-gray-600">
                            <div>🌐 iitk.ac.in</div>
                            <div>📧 Email</div>
                            <div>🔗 LinkedIn</div>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                                Follow
                            </button>
                            <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExploreInstitutions