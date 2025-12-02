import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from './NavLink'
import { Link } from 'react-router-dom'

const HeaderHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Notes', path: '/notes' },
    { name: 'Community', path: '/community' },
    { name: 'Career', path: '/career' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-200">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-bold text-orange-900">
              Liftuplabs
            </span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="text-orange-900/80 hover:text-orange-600 transition-colors font-medium"
                activeClassName="text-orange-600"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons - Connected to LiftupLabs Login/Signup */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-orange-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="block text-orange-900/80 hover:text-orange-600 transition-colors font-medium py-2"
                activeClassName="text-orange-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-orange-200">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default HeaderHomepage
