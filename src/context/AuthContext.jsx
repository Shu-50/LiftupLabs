import { createContext, useContext, useState, useEffect } from 'react'
import apiService from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // Check for existing session on app load
    useEffect(() => {
        const initializeAuth = async () => {
            const savedUser = localStorage.getItem('liftuplabs_user')
            if (savedUser) {
                try {
                    const userData = JSON.parse(savedUser)
                    // Verify token is still valid by fetching user profile
                    try {
                        const response = await apiService.getProfile()
                        setUser({ ...userData, ...response.data.user })
                    } catch (error) {
                        console.error('Token validation failed:', error)
                        localStorage.removeItem('liftuplabs_user')
                    }
                } catch (error) {
                    console.error('Error parsing saved user:', error)
                    localStorage.removeItem('liftuplabs_user')
                }
            }
            setIsLoading(false)
        }

        initializeAuth()
    }, [])

    const login = async (credentials) => {
        try {
            const response = await apiService.login(credentials)
            const userData = {
                ...response.data.user,
                token: response.data.token
            }
            setUser(userData)
            localStorage.setItem('liftuplabs_user', JSON.stringify(userData))
            return { success: true, data: userData }
        } catch (error) {
            console.error('Login error:', error)
            // Check if it's an email verification error
            const errorResponse = error.response?.data || {}
            return {
                success: false,
                error: error.message || 'Login failed',
                requiresVerification: errorResponse.requiresVerification || false
            }
        }
    }

    const register = async (userData) => {
        try {
            const response = await apiService.register(userData)
            // Don't auto-login after registration since email verification is required
            return {
                success: true,
                data: response.data,
                message: response.message || 'Registration successful! Please check your email to verify your account.'
            }
        } catch (error) {
            console.error('Registration error:', error)
            const errorResponse = error.response?.data || {}
            return {
                success: false,
                error: errorResponse.message || error.message || 'Registration failed. Please try again.',
                validationErrors: errorResponse.errors || []
            }
        }
    }

    const logout = async () => {
        try {
            await apiService.logout()
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setUser(null)
            localStorage.removeItem('liftuplabs_user')
        }
    }

    const updateUser = async (updatedData) => {
        try {
            const response = await apiService.updateProfile(updatedData)
            const newUserData = { ...user, ...response.data.user }
            setUser(newUserData)
            localStorage.setItem('liftuplabs_user', JSON.stringify(newUserData))
            return { success: true, data: newUserData }
        } catch (error) {
            console.error('Update user error:', error)
            return { success: false, error: error.message }
        }
    }

    const value = {
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext