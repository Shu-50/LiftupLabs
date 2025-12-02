import AboutSection from '../components/AboutSection'
import ContactForm from '../components/ContactForm'
import FAQ from '../components/FAQ'

const AboutUs = () => {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-12 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">About LiftupLabs</h1>
                    <p className="text-xl opacity-90 mb-6">
                        Empowering students, institutions, and professionals across India
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a
                            href="#contact"
                            className="bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                        >
                            Get in Touch
                        </a>
                        <a
                            href="#mission"
                            className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <AboutSection />

            {/* Mission & Vision */}
            <div id="mission" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-8 border border-orange-200">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-orange-600 text-3xl">🎯</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-orange-900 mb-4">Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        To create a unified platform that brings together events, learning resources, and career opportunities for the Indian student community.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        We believe in democratizing access to quality education and opportunities, making it easier for students to discover, participate, and grow.
                    </p>
                </div>

                <div className="bg-white rounded-lg p-8 border border-orange-200">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-orange-600 text-3xl">🚀</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-orange-900 mb-4">Our Vision</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        To become India's most trusted platform for academic events, collaborative learning, and career development.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        We envision a future where every student has equal access to opportunities, resources, and a supportive community to help them succeed.
                    </p>
                </div>
            </div>

            {/* What We Offer */}
            <div className="bg-white rounded-lg p-8 border border-orange-200">
                <h2 className="text-2xl font-semibold text-orange-900 mb-6 text-center">What We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                        <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">🎯</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Events & Competitions</h3>
                        <p className="text-gray-600 text-sm">
                            Discover hackathons, workshops, seminars, and competitions from top institutions across India.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                        <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">📚</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Study Resources</h3>
                        <p className="text-gray-600 text-sm">
                            Access verified notes, PYQs, and study materials shared by students and educators.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                        <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">💼</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Career Opportunities</h3>
                        <p className="text-gray-600 text-sm">
                            Find internships, job openings, and connect with mentors to guide your career path.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                        <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">🏛️</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Institution Network</h3>
                        <p className="text-gray-600 text-sm">
                            Connect with verified colleges, universities, and student clubs across the country.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                        <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">👥</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                        <p className="text-gray-600 text-sm">
                            Join a vibrant community of learners, share knowledge, and collaborate on projects.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                        <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">📝</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Host Events</h3>
                        <p className="text-gray-600 text-sm">
                            Organize and manage your own events with our easy-to-use event hosting platform.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white">
                <h2 className="text-2xl font-semibold mb-8 text-center">Our Impact</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2">10K+</div>
                        <div className="text-orange-100">Active Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2">500+</div>
                        <div className="text-orange-100">Events Hosted</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2">100+</div>
                        <div className="text-orange-100">Institutions</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2">50K+</div>
                        <div className="text-orange-100">Resources Shared</div>
                    </div>
                </div>
            </div>

            {/* Contact & FAQ Section */}
            <div id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ContactForm />

                <div className="space-y-6">
                    {/* Contact Information */}
                    <div className="bg-white rounded-lg p-6 border border-orange-200">
                        <h3 className="text-lg font-semibold text-orange-900 mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <span className="text-orange-600 text-xl">📧</span>
                                <div>
                                    <div className="font-medium text-gray-900">Email</div>
                                    <a href="mailto:support@liftuplabs.in" className="text-orange-600 hover:text-orange-700 text-sm">
                                        support@liftuplabs.in
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-orange-600 text-xl">📍</span>
                                <div>
                                    <div className="font-medium text-gray-900">Address</div>
                                    <div className="text-gray-600 text-sm">Bengaluru, Karnataka, India</div>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-orange-600 text-xl">💬</span>
                                <div>
                                    <div className="font-medium text-gray-900">Community</div>
                                    <div className="text-gray-600 text-sm">Join our discussion forum</div>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-orange-600 text-xl">🕐</span>
                                <div>
                                    <div className="font-medium text-gray-900">Response Time</div>
                                    <div className="text-gray-600 text-sm">Within 24-48 hours</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white rounded-lg p-6 border border-orange-200">
                        <h3 className="text-lg font-semibold text-orange-900 mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center hover:bg-orange-200 transition-colors">
                                <span className="text-orange-600 text-xl">📘</span>
                            </a>
                            <a href="#" className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center hover:bg-orange-200 transition-colors">
                                <span className="text-orange-600 text-xl">🐦</span>
                            </a>
                            <a href="#" className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center hover:bg-orange-200 transition-colors">
                                <span className="text-orange-600 text-xl">📷</span>
                            </a>
                            <a href="#" className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center hover:bg-orange-200 transition-colors">
                                <span className="text-orange-600 text-xl">💼</span>
                            </a>
                        </div>
                    </div>

                    {/* Partnership */}
                    <div className="bg-white rounded-lg p-6 border border-orange-200">
                        <h3 className="text-lg font-semibold text-orange-900 mb-4">Partnership Opportunities</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-900 text-sm">Press Kit</div>
                                    <div className="text-gray-600 text-xs">Logos & brand assets</div>
                                </div>
                                <button className="bg-white border border-orange-300 px-3 py-1 rounded text-xs font-medium text-orange-700 hover:bg-orange-50">
                                    Download
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-900 text-sm">Sponsorships</div>
                                    <div className="text-gray-600 text-xs">Partner with us</div>
                                </div>
                                <button className="bg-white border border-orange-300 px-3 py-1 rounded text-xs font-medium text-orange-700 hover:bg-orange-50">
                                    Inquire
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <FAQ />
        </div>
    )
}

export default AboutUs