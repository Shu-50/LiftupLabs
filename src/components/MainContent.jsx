import AboutSection from './AboutSection'
import ContactForm from './ContactForm'
import FAQ from './FAQ'
import EventsSection from './EventsSection'
import NotesSection from './NotesSection'
import CareerHub from '../pages/CareerHub'
import CoursesSection from './CoursesSection'
import CommunitySection from './CommunitySection'
import MyEventsDashboard from '../pages/MyEventsDashboard'
import AdminDashboard from '../pages/AdminDashboard'

const MainContent = ({ activeSection }) => {
    const renderContent = () => {
        switch (activeSection) {
            case 'home':
                return (
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white">
                            <h1 className="text-4xl font-bold mb-4">Welcome to Liftuplabs</h1>
                            <p className="text-xl mb-6">Your unified platform for learning, events, and career growth</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="text-3xl mb-2">🎯</div>
                                    <h3 className="font-semibold mb-1">Events & Competitions</h3>
                                    <p className="text-sm opacity-90">Discover and participate in exciting events</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="text-3xl mb-2">📚</div>
                                    <h3 className="font-semibold mb-1">Study Materials</h3>
                                    <p className="text-sm opacity-90">Access notes, PYQs, and resources</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="text-3xl mb-2">💼</div>
                                    <h3 className="font-semibold mb-1">Career Opportunities</h3>
                                    <p className="text-sm opacity-90">Find jobs, internships, and guidance</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-lg p-6 border border-orange-200">
                                <h2 className="text-xl font-semibold text-orange-900 mb-4">Recent Events</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                                        <span className="text-2xl">🏆</span>
                                        <div>
                                            <h3 className="font-medium">National Coding Championship</h3>
                                            <p className="text-sm text-gray-600">Dec 20-22, 2024</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                                        <span className="text-2xl">🤖</span>
                                        <div>
                                            <h3 className="font-medium">AI/ML Workshop Series</h3>
                                            <p className="text-sm text-gray-600">Dec 18, 2024</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 border border-orange-200">
                                <h2 className="text-xl font-semibold text-orange-900 mb-4">Popular Notes</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                                        <span className="text-2xl">📝</span>
                                        <div>
                                            <h3 className="font-medium">Data Structures & Algorithms</h3>
                                            <p className="text-sm text-gray-600">1,250 downloads</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                                        <span className="text-2xl">📊</span>
                                        <div>
                                            <h3 className="font-medium">Operating Systems Slides</h3>
                                            <p className="text-sm text-gray-600">1,100 downloads</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 'events':
                return <EventsSection />
            case 'my-events':
                return <MyEventsDashboard />
            case 'notes':
                return <NotesSection />
            case 'courses':
                return <CoursesSection />
            case 'community':
                return <CommunitySection />
            case 'career':
                return <CareerHub />
            case 'admin':
                return <AdminDashboard />
            case 'about':
                return (
                    <div className="space-y-8">
                        <AboutSection />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <ContactForm />
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg p-6 border border-orange-200">
                                    <h3 className="text-lg font-semibold text-orange-900 mb-4">Contact Us</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <span className="text-orange-600">📧</span>
                                            <div>
                                                <div className="font-medium text-gray-900">Email</div>
                                                <div className="text-gray-600 text-sm">support@liftuplabs.in</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <span className="text-orange-600">📍</span>
                                            <div>
                                                <div className="font-medium text-gray-900">Address</div>
                                                <div className="text-gray-600 text-sm">Bengaluru, Karnataka, India</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <span className="text-orange-600">💬</span>
                                            <div>
                                                <div className="font-medium text-gray-900">Community</div>
                                                <div className="text-gray-600 text-sm">Join the discussion forum</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <span className="text-orange-600">📞</span>
                                            <div>
                                                <div className="font-medium text-gray-900">Phone</div>
                                                <div className="text-gray-600 text-sm">+91 00000 00000</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-6 border border-orange-200">
                                    <h3 className="text-lg font-semibold text-orange-900 mb-4">Press & Partnerships</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                            <div>
                                                <div className="font-medium text-gray-900">Press Kit</div>
                                                <div className="text-gray-600 text-sm">Logos, screenshots, and brand guidance</div>
                                            </div>
                                            <button className="bg-white border border-orange-300 px-4 py-2 rounded-lg text-sm font-medium text-orange-700 hover:bg-orange-50">
                                                📥 Download
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                            <div>
                                                <div className="font-medium text-gray-900">Sponsorships</div>
                                                <div className="text-gray-600 text-sm">Partner on student events and competitions</div>
                                            </div>
                                            <button className="bg-white border border-orange-300 px-4 py-2 rounded-lg text-sm font-medium text-orange-700 hover:bg-orange-50">
                                                📅 Book a slot
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                            <div>
                                                <div className="font-medium text-gray-900">API Access</div>
                                                <div className="text-gray-600 text-sm">Integrate your institute systems</div>
                                            </div>
                                            <button className="bg-white border border-orange-300 px-4 py-2 rounded-lg text-sm font-medium text-orange-700 hover:bg-orange-50">
                                                🔗 Request
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <FAQ />
                    </div>
                )
            default:
                return (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold text-orange-900 mb-4">
                            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                        </h2>
                        <p className="text-gray-600">This section is under development.</p>
                    </div>
                )
        }
    }

    return (
        <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
                {renderContent()}
            </div>
        </main>
    )
}

export default MainContent