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
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-orange-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-900">Discover Courses & Lectures</h1>
                    <button className="w-full sm:w-auto bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-xs sm:text-sm md:text-base">
                        Create Course
                    </button>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">
                    Access high-quality courses and lectures from top institutions and industry experts
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-orange-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
                    />
                    <select
                        value={selectedFilters.category}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, category: e.target.value })}
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
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
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
                    >
                        <option>All Levels</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                    <select
                        value={selectedFilters.duration}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, duration: e.target.value })}
                        className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-xs sm:text-sm"
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-lg border border-orange-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                        <div className="bg-gradient-to-r from-orange-100 to-orange-50 h-20 sm:h-28 md:h-40 flex items-center justify-center shrink-0">
                            <span className="text-gray-500 text-2xl sm:text-4xl md:text-5xl">🎓</span>
                        </div>
                        <div className="p-2 sm:p-4 md:p-6 flex flex-col flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xs sm:text-base md:text-xl font-semibold text-gray-900 mb-0.5 line-clamp-2 leading-tight">{course.title}</h3>
                                    <p className="text-gray-600 text-[10px] sm:text-sm truncate">by {course.instructor}</p>
                                    <p className="text-gray-500 text-[10px] sm:text-xs truncate hidden sm:block">{course.institution}</p>
                                </div>
                                <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-medium whitespace-nowrap ml-1 sm:ml-2">
                                    {course.level}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 mb-2 sm:mb-4 text-[10px] sm:text-sm text-gray-600">
                                <div className="truncate">
                                    <span className="font-medium">Duration:</span> {course.duration}
                                </div>
                                <div className="truncate">
                                    <span className="font-medium">Students:</span> {course.students}
                                </div>
                                <div className="truncate">
                                    <span className="font-medium">Rating:</span> ⭐ {course.rating}
                                </div>
                                <div className="truncate">
                                    <span className="font-medium">Price:</span> {course.price}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
                                {course.tags.slice(0, 3).map((tag, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto">
                                {/* Mobile Buttons */}
                                <div className="flex flex-col gap-1.5 sm:hidden">
                                    <button className="w-full bg-orange-600 text-white px-2 py-1 rounded-md font-medium text-[10px] hover:bg-orange-700 transition-colors">
                                        Enroll Now
                                    </button>
                                    <div className="flex gap-1.5">
                                        <button className="flex-1 border border-orange-300 text-orange-700 px-2 py-1 rounded-md font-medium text-[10px] hover:bg-orange-50 transition-colors">
                                            Preview
                                        </button>
                                        <button className="flex-1 border border-orange-300 text-orange-700 px-2 py-1 rounded-md font-medium text-[10px] hover:bg-orange-50 transition-colors">
                                            Details
                                        </button>
                                    </div>
                                </div>

                                {/* Tablet/Desktop Buttons */}
                                <div className="hidden sm:flex space-x-2 sm:space-x-3">
                                    <button className="flex-1 bg-orange-600 text-white py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors text-xs sm:text-sm">
                                        Enroll Now
                                    </button>
                                    <button className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                                        Preview
                                    </button>
                                    <button className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DiscoverCourses