import { useState } from 'react'

const CommunityHub = () => {
    const [selectedTab, setSelectedTab] = useState('discussions')

    const discussions = [
        {
            id: 1,
            author: 'Ananya Sharma',
            title: 'Best resources to start with Transformers in 2025?',
            content: 'Looking for comprehensive resources to understand transformer architecture. Any recommendations for beginners?',
            timestamp: '2 hours ago',
            likes: 12,
            comments: 8,
            tags: ['AI', 'ML', 'Transformers']
        },
        {
            id: 2,
            author: 'Prof. R. Gupta',
            title: 'DSA practice plan before summer internships',
            content: 'A structured plan to practice data structures and algorithms effectively before the internship season.',
            timestamp: '5 hours ago',
            likes: 24,
            comments: 15,
            tags: ['DSA', 'Internships', 'Career']
        },
        {
            id: 3,
            author: 'ECE Club Lead',
            title: 'Project ideas: Open source RISC-V Lab',
            content: 'Thinking about building an educational RISC-V simulator. Looking for contributors and feedback.',
            timestamp: '1 day ago',
            likes: 18,
            comments: 12,
            tags: ['RISC-V', 'Open Source', 'Projects']
        }
    ]

    const clubs = [
        {
            id: 1,
            name: 'IIT ML Club',
            members: '2.3k',
            description: 'Machine learning enthusiasts and researchers',
            image: '/api/placeholder/60/60'
        },
        {
            id: 2,
            name: 'NIT ECE Society',
            members: '1.8k',
            description: 'Electronics and communication engineering',
            image: '/api/placeholder/60/60'
        },
        {
            id: 3,
            name: 'CSE Community',
            members: '3.1k',
            description: 'Computer science students and professionals',
            image: '/api/placeholder/60/60'
        }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-orange-900">Community Hub</h1>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                        New Post
                    </button>
                </div>
                <p className="text-gray-700">
                    Connect with students and discuss and share your thoughts. Join clubs and professional communities.
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg border border-orange-200">
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setSelectedTab('discussions')}
                        className={`px-6 py-3 font-medium text-sm ${selectedTab === 'discussions'
                            ? 'border-b-2 border-orange-600 text-orange-600'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        🗨️ Discussions
                    </button>
                    <button
                        onClick={() => setSelectedTab('clubs')}
                        className={`px-6 py-3 font-medium text-sm ${selectedTab === 'clubs'
                            ? 'border-b-2 border-orange-600 text-orange-600'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        👥 Student Clubs
                    </button>
                    <button
                        onClick={() => setSelectedTab('mentorship')}
                        className={`px-6 py-3 font-medium text-sm ${selectedTab === 'mentorship'
                            ? 'border-b-2 border-orange-600 text-orange-600'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        🎯 Mentorship
                    </button>
                    <button
                        onClick={() => setSelectedTab('topics')}
                        className={`px-6 py-3 font-medium text-sm ${selectedTab === 'topics'
                            ? 'border-b-2 border-orange-600 text-orange-600'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        📚 Topics
                    </button>
                </div>

                <div className="p-6">
                    {selectedTab === 'discussions' && (
                        <div className="space-y-6">
                            {discussions.map((discussion) => (
                                <div key={discussion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-orange-700 text-sm font-medium">
                                                {discussion.author.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="font-medium text-gray-900">{discussion.author}</span>
                                                <span className="text-gray-500 text-sm">•</span>
                                                <span className="text-gray-500 text-sm">{discussion.timestamp}</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-2">{discussion.title}</h3>
                                            <p className="text-gray-700 mb-3">{discussion.content}</p>

                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {discussion.tags.map((tag, index) => (
                                                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                <button className="flex items-center space-x-1 hover:text-orange-600">
                                                    <span>👍</span>
                                                    <span>{discussion.likes}</span>
                                                </button>
                                                <button className="flex items-center space-x-1 hover:text-orange-600">
                                                    <span>💬</span>
                                                    <span>{discussion.comments}</span>
                                                </button>
                                                <button className="hover:text-orange-600">Share</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedTab === 'clubs' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clubs.map((club) => (
                                <div key={club.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500 text-xs">Logo</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{club.name}</h3>
                                            <p className="text-gray-600 text-sm">{club.members} members</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-4">{club.description}</p>
                                    <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                                        Join Club
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedTab === 'mentorship' && (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Mentorship Program</h3>
                            <p className="text-gray-600 mb-6">Connect with experienced professionals and get guidance for your career.</p>
                            <div className="space-y-4">
                                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                                    Find a Mentor
                                </button>
                                <button className="border border-orange-300 text-orange-700 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                                    Become a Mentor
                                </button>
                            </div>
                        </div>
                    )}

                    {selectedTab === 'topics' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Machine Learning', 'Web Development', 'Data Science', 'Mobile Apps', 'DevOps', 'Blockchain', 'AI/ML', 'Cybersecurity'].map((topic, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                                    <h4 className="font-medium text-gray-900">{topic}</h4>
                                    <p className="text-gray-600 text-sm mt-1">{Math.floor(Math.random() * 500) + 100} discussions</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CommunityHub