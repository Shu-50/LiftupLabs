import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Header = () => {
    const { user, logout } = useAuth()
    const [showUserMenu, setShowUserMenu] = useState(false)

    return (
        <header className="bg-white border-b border-orange-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <span className="text-orange-700 font-medium">
                        Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
                    </span>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                        BETA
                    </span>

                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-2 hover:bg-orange-50 rounded-lg p-2 transition-colors"
                        >
                            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">{user?.avatar || '👤'}</span>
                            </div>
                            <div className="text-left hidden md:block">
                                <div className="text-sm font-medium text-gray-900">{user?.name || 'User'}</div>
                                <div className="text-xs text-gray-500 capitalize">{user?.role || 'Member'}</div>
                            </div>
                            <span className="text-gray-400">▼</span>
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                                    <div className="text-xs text-gray-500">{user?.email}</div>
                                </div>

                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                    <span>👤</span>
                                    <span>Profile Settings</span>
                                </button>

                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                    <span>🔔</span>
                                    <span>Notifications</span>
                                </button>

                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                    <span>⚙️</span>
                                    <span>Preferences</span>
                                </button>

                                <div className="border-t border-gray-100 mt-2 pt-2">
                                    <button
                                        onClick={() => {
                                            logout()
                                            setShowUserMenu(false)
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                    >
                                        <span>🚪</span>
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Click outside to close menu */}
            {showUserMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </header>
    )
}

export default Header