import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import GlobalSearch from './GlobalSearch'

const Sidebar = ({ activeSection, setActiveSection }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const { user } = useAuth()

    const baseMenuItems = [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'events', label: 'Events & Competitions', icon: '🎯' },
        { id: 'my-events', label: 'My Events', icon: '📅' },
        { id: 'notes', label: 'Notes & PYQs', icon: '📝' },
        { id: 'courses', label: 'Courses & Lectures', icon: '📚' },
        { id: 'institutions', label: 'Institutions & Hosts', icon: '🏛️' },
        { id: 'community', label: 'Community', icon: '👥' },
        { id: 'career', label: 'Career & Guidance', icon: '💼' },
        { id: 'about', label: 'About / Contact', icon: '📞' }
    ]

    // Add admin menu item if user is admin
    const menuItems = user?.role === 'admin'
        ? [...baseMenuItems, { id: 'admin', label: 'Admin Dashboard', icon: '⚙️' }]
        : baseMenuItems

    return (
        <div className="w-64 bg-orange-100 border-r border-orange-200 flex flex-col h-screen overflow-hidden">
            {/* Logo */}
            <div className="p-4 border-b border-orange-200 flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">L</span>
                    </div>
                    <span className="font-semibold text-orange-900">Liftuplabs</span>
                </div>
            </div>

            {/* Search */}
            <div className="p-4 flex-shrink-0">
                <GlobalSearch
                    placeholder="Search"
                    onSearch={(item) => {
                        // Navigate to appropriate section based on search result
                        switch (item.type) {
                            case 'event':
                                setActiveSection('events')
                                break
                            case 'note':
                                setActiveSection('notes')
                                break
                            case 'course':
                                setActiveSection('courses')
                                break
                            case 'community':
                                setActiveSection('community')
                                break
                            case 'job':
                                setActiveSection('career')
                                break
                            default:
                                setActiveSection('home')
                        }
                    }}
                />
            </div>

            {/* Navigation - Scrollable */}
            <div className="flex-1 px-2 overflow-y-auto">
                <div className="text-xs font-medium text-orange-700 px-2 mb-2">Main</div>
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === item.id
                                ? 'bg-orange-200 text-orange-900 font-medium'
                                : 'text-orange-700 hover:bg-orange-150'
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-orange-200 space-y-2 flex-shrink-0">
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-orange-700 hover:bg-orange-150 rounded-lg">
                    <span>📚</span>
                    <span>My Library</span>
                </button>
                <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                    📤 Upload Notes
                </button>
            </div>
        </div>
    )
}

export default Sidebar