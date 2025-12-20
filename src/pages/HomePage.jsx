const HomePage = () => {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-orange-200">
                <div className="text-center mb-4 sm:mb-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-900 mb-2 sm:mb-3">Compete. Learn. Grow.</h1>
                    <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto">
                        One hub for hosting events, discovering opportunities, and accessing verified academic resources — built for Indian students, institutions, and professionals.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-6">
                    <button className="bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors text-xs sm:text-sm md:text-base">
                        🎯 Join as Student
                    </button>
                    <button className="border border-orange-300 text-orange-700 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors text-xs sm:text-sm md:text-base">
                        🏛️ Join as Institution
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-xs sm:text-sm md:text-base">
                        📤 Host an Event
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-xs sm:text-sm md:text-base">
                        📝 Upload Notes
                    </button>
                </div>
            </div>

            {/* Featured Competitions */}
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-orange-900">Featured Competitions</h2>
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm">View All</button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    <div className="border border-gray-200 rounded-lg p-2 sm:p-3 hover:shadow-md transition-shadow">
                        <div className="bg-gray-100 h-20 sm:h-24 md:h-32 rounded-lg mb-2 sm:mb-3 flex items-center justify-center">
                            <span className="text-gray-500 text-xs sm:text-sm">Poster</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm md:text-base">National Hackathon 2025</h3>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">48-hour coding challenge for students</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Deadline: Jan 15</span>
                            <div className="flex flex-col sm:flex-row gap-1 sm:space-x-2">
                                <button className="text-xs text-orange-600 hover:text-orange-700">Register</button>
                                <button className="text-xs text-gray-600 hover:text-gray-700">Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-gray-500">Poster</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Aptitude Quiz Bowl</h3>
                        <p className="text-sm text-gray-600 mb-3">Test your logical reasoning skills</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Deadline: Jan 20</span>
                            <div className="space-x-2">
                                <button className="text-sm text-orange-600 hover:text-orange-700">Register</button>
                                <button className="text-sm text-gray-600 hover:text-gray-700">Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-gray-500">Poster</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">AI Workshop Weekend</h3>
                        <p className="text-sm text-gray-600 mb-3">Learn machine learning fundamentals</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Deadline: Jan 25</span>
                            <div className="space-x-2">
                                <button className="text-sm text-orange-600 hover:text-orange-700">Register</button>
                                <button className="text-sm text-gray-600 hover:text-gray-700">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Notes & PYQs */}
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-orange-900">Featured Notes & PYQs</h2>
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm">Browse Notes</button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    <div className="border border-gray-200 rounded-lg p-2 sm:p-3 hover:shadow-md transition-shadow">
                        <div className="bg-gray-100 h-20 sm:h-24 rounded-lg mb-2 sm:mb-3 flex items-center justify-center">
                            <span className="text-gray-500 text-xs sm:text-sm">PDF Preview</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm md:text-base">DBMS Unit Notes - CSE Sem 4</h3>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">Comprehensive database management notes</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">📄 PDF • 2MB</span>
                            <button className="bg-orange-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded text-xs hover:bg-orange-700">
                                📥 Download
                            </button>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="bg-gray-100 h-24 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-gray-500">PDF Preview</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Engineering Maths PYQ (2019-2024)</h3>
                        <p className="text-sm text-gray-600 mb-3">Previous year question papers collection</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">📄 PDF • 5MB</span>
                            <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700">
                                View
                            </button>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="bg-gray-100 h-24 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-gray-500">PDF Preview</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">The Algorithms Cheatsheet</h3>
                        <p className="text-sm text-gray-600 mb-3">Quick reference for coding interviews</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">📄 PDF • 1MB</span>
                            <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Courses */}
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-orange-900">Popular Courses</h2>
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm">Explore Courses</button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-gray-800 h-20 sm:h-24 md:h-32 flex items-center justify-center">
                            <span className="text-white text-xs sm:text-sm">Course Preview</span>
                        </div>
                        <div className="p-2 sm:p-3">
                            <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm md:text-base">Data Structures in C++</h3>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">Master fundamental data structures</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">⭐ 4.8 • 2.5k students</span>
                                <span className="text-orange-600 font-semibold text-xs sm:text-sm">Free</span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-blue-600 h-20 sm:h-24 md:h-32 flex items-center justify-center">
                            <span className="text-white text-xs sm:text-sm">Course Preview</span>
                        </div>
                        <div className="p-2 sm:p-3">
                            <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm md:text-base">Business Analytics Basics</h3>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">Learn data-driven decision making</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">⭐ 4.6 • 1.8k students</span>
                                <span className="text-orange-600 font-semibold text-xs sm:text-sm">₹499</span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-green-600 h-20 sm:h-24 md:h-32 flex items-center justify-center">
                            <span className="text-white text-xs sm:text-sm">Course Preview</span>
                        </div>
                        <div className="p-2 sm:p-3">
                            <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm md:text-base">Web Development Bootcamp</h3>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">Full-stack web development course</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">⭐ 4.9 • 3.2k students</span>
                                <span className="text-orange-600 font-semibold text-xs sm:text-sm">₹999</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Partner Institutions */}
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-orange-900">Partner Institutions</h2>
                    <button className="text-orange-600 hover:text-orange-700 font-medium">Become a Partner</button>
                </div>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-gray-500 text-sm sm:text-base">
                    <span>IIT Delhi</span>
                    <span>NIT Trichy</span>
                    <span>AIIMS</span>
                    <span>Anna Univ</span>
                    <span>Manipal</span>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-orange-50 rounded-lg p-3 sm:p-4 md:p-6 text-center border border-orange-200">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-orange-900 mb-3 sm:mb-4">Get Started Today</h3>
                <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Join thousands of students and professionals already using Liftuplabs</p>
                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <button className="bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors text-xs sm:text-sm md:text-base">
                        Host an Event
                    </button>
                    <button className="border border-orange-300 text-orange-700 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors text-xs sm:text-sm md:text-base">
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage