import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import GlobalSearch from './GlobalSearch'

const Sidebar = ({ activeSection, setActiveSection, isMobileMenuOpen, setIsMobileMenuOpen }) => {
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

    // Handle menu item click - close mobile menu after selection
    const handleMenuItemClick = (sectionId) => {
        setActiveSection(sectionId)
        if (setIsMobileMenuOpen) {
            setIsMobileMenuOpen(false)
        }
    }

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isMobileMenuOpen && setIsMobileMenuOpen) {
                setIsMobileMenuOpen(false)
            }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isMobileMenuOpen, setIsMobileMenuOpen])

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:static inset-y-0 left-0 z-50
                w-64 bg-orange-100 border-r border-orange-200 
                flex flex-col h-screen overflow-hidden
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="p-3 sm:p-4 border-b border-orange-200 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">L</span>
                            </div>
                            <span className="font-semibold text-orange-900">Liftuplabs</span>
                        </div>
                        {/* Close button for mobile */}
                        <button
                            onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
                            className="md:hidden text-orange-700 hover:text-orange-900 p-1"
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="p-3 sm:p-4 flex-shrink-0">
                    <GlobalSearch
                        placeholder="Search"
                        onSearch={(item) => {
                            // Navigate to appropriate section based on search result
                            switch (item.type) {
                                case 'event':
                                    handleMenuItemClick('events')
                                    break
                                case 'note':
                                    handleMenuItemClick('notes')
                                    break
                                case 'course':
                                    handleMenuItemClick('courses')
                                    break
                                case 'community':
                                    handleMenuItemClick('community')
                                    break
                                case 'job':
                                    handleMenuItemClick('career')
                                    break
                                default:
                                    handleMenuItemClick('home')
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
                                onClick={() => handleMenuItemClick(item.id)}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors ${activeSection === item.id
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
                <div className="p-3 sm:p-4 border-t border-orange-200 space-y-2 flex-shrink-0">
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm text-orange-700 hover:bg-orange-150 rounded-lg">
                        <span>📚</span>
                        <span>My Library</span>
                    </button>
                    <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-orange-700 transition-colors">
                        📤 Upload Notes
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar