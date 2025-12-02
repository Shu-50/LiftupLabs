import { useState } from 'react'

const DiscoverCourses = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilters, setSelectedFilters] = useState({
        category: 'All',
        level: 'All',
        duration: 'All'
    })

    const courses = [
        {
            id: 1,
            title: 'Data Structures in C++',
            instructor: 'Prof. Rajesh Kumar',
            institution: 'IIT Delhi',
            category: 'Computer Science',
            level: 'Intermediate',
            duration: '8 weeks',
            rating: 4.8,
            students: '2.3k',
            price: 'Free',
            image: '/api/placeholder/300/200',
            tags: ['Programming', 'Algorithms', 'C++']
        },
        {
            id: 2,
            title: 'Machine Learning Fundamentals',
            instructor: 'Dr. Priya Sharma',
            institution: 'IISC Bangalore',
            category: 'Data Science',
            level: 'Beginner',
            duration: '12 weeks',
            rating: 4.7,
            students: '1.8k',
            price: '₹2,999',
            image: '/api/placeholder/300/200',
            tags: ['ML', 'Python', 'Statistics']
        },
        {
            id: 3,
            title: 'Business Analytics Basics',
            instructor: 'Prof. Amit Gupta',
            institution: 'IIM Ahmedabad',
            category: 'Business',
            level: 'Beginner',
            duration: '6 weeks',
            rating: 4.6,
            students: '950',
            price: '₹1,999',
            image: '/api/placeholder/300/200',
            tags: ['Analytics', 'Excel', 'Business']
        },
        {
            id: 4,
            title: 'Digital Electronics',
            instructor: 'Dr. Suresh Patel',
            institution: 'NIT Trichy',
            category: 'Electronics',
            level: 'Intermediate',
            duration: '10 weeks',
            rating: 4.5,
            students: '1.2k',
            price: 'Free',
            image: '/api/placeholder/300/200',
            tags: ['Electronics', 'Logic Gates', 'Circuits']
        }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-orange-900">Discover Courses & Lectures</h1>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                        Create Course
                    </button>
                </div>
                <p className="text-gray-700">
                    Access high-quality courses and lectures from top institutions and industry experts
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                    <select
                        value={selectedFilters.category}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, category: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option>All Categories</option>
                        <option>Computer Science</option>
                        <option>Data Science</option>
                        <option>Business</option>
                        <option>Electronics</option>
                        <option>Mathematics</option>
                    </select>
                    <select
                        value={selectedFilters.level}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, level: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option>All Levels</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                    <select
                        value={selectedFilters.duration}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, duration: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option>All Durations</option>
                        <option>1-4 weeks</option>
                        <option>5-8 weeks</option>
                        <option>9-12 weeks</option>
                        <option>12+ weeks</option>
                    </select>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-lg border border-orange-200 overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="bg-gray-800 h-48 flex items-center justify-center">
                            <span className="text-white">Course Preview</span>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{course.title}</h3>
                                    <p className="text-gray-600 text-sm">by {course.instructor}</p>
                                    <p className="text-gray-500 text-xs">{course.institution}</p>
                                </div>
                                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                                    {course.level}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                                <div>
                                    <span className="font-medium">Duration:</span> {course.duration}
                                </div>
                                <div>
                                    <span className="font-medium">Students:</span> {course.students}
                                </div>
                                <div>
                                    <span className="font-medium">Rating:</span> ⭐ {course.rating}
                                </div>
                                <div>
                                    <span className="font-medium">Price:</span> {course.price}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {course.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex space-x-3">
                                <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                                    Enroll Now
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                    Preview
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DiscoverCourses