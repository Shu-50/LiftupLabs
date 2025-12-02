const HomePage = () => {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-lg p-8 border border-orange-200">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-orange-900 mb-4">Compete. Learn. Grow.</h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        One hub for hosting events, discovering opportunities, and accessing verified academic resources — built for Indian students, institutions, and professionals.
                    </p>
                </div>

                <div className="flex justify-center space-x-4 mb-8">
                    <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                        🎯 Join as Student
                    </button>
                    <button className="border border-orange-300 text-orange-700 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                        🏛️ Join as Institution
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        📤 Host an Event
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        📝 Upload Notes
                    </button>
                </div>
            </div>

            {/* Featured Competitions */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-orange-900">Featured Competitions</h2>
                    <button className="text-orange-600 hover:text-orange-700 font-medium">View All</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-gray-500">Poster</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">National Hackathon 2025</h3>
                        <p className="text-sm text-gray-600 mb-3">48-hour coding challenge for students</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Deadline: Jan 15</span>
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
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-orange-900">Featured Notes & PYQs</h2>
                    <button className="text-orange-600 hover:text-orange-700 font-medium">Browse Notes</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="bg-gray-100 h-24 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-gray-500">PDF Preview</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">DBMS Unit Notes - CSE Sem 4</h3>
                        <p className="text-sm text-gray-600 mb-3">Comprehensive database management notes</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">📄 PDF • 2MB</span>
                            <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700">
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
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-orange-900">Popular Courses</h2>
                    <button className="text-orange-600 hover:text-orange-700 font-medium">Explore Courses</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-gray-800 h-32 flex items-center justify-center">
                            <span className="text-white">Course Preview</span>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Data Structures in C++</h3>
                            <p className="text-sm text-gray-600 mb-3">Master fundamental data structures</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">⭐ 4.8 • 12 lectures</span>
                                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                                    Start Learning
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-blue-600 h-32 flex items-center justify-center">
                            <span className="text-white">Course Preview</span>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Business Analytics Basics</h3>
                            <p className="text-sm text-gray-600 mb-3">Learn data-driven decision making</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">⭐ 4.6 • 8 lectures</span>
                                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                                    Enroll
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-green-600 h-32 flex items-center justify-center">
                            <span className="text-white">Course Preview</span>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Electrical Machines</h3>
                            <p className="text-sm text-gray-600 mb-3">Comprehensive electrical engineering course</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">⭐ 4.7 • 15 lectures</span>
                                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Partner Institutions */}
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-orange-900">Partner Institutions</h2>
                    <button className="text-orange-600 hover:text-orange-700 font-medium">Become a Partner</button>
                </div>

                <div className="flex justify-center space-x-8 text-gray-500">
                    <span>IIT Delhi</span>
                    <span>NIT Trichy</span>
                    <span>AIIMS</span>
                    <span>Anna Univ</span>
                    <span>Manipal</span>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-orange-50 rounded-lg p-8 text-center border border-orange-200">
                <h3 className="text-2xl font-semibold text-orange-900 mb-4">Get Started Today</h3>
                <p className="text-gray-700 mb-6">Join thousands of students and professionals already using Liftuplabs</p>
                <div className="space-x-4">
                    <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                        Host an Event
                    </button>
                    <button className="border border-orange-300 text-orange-700 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage