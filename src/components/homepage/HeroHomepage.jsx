import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImage from '../../assets/hero-learning.jpg'

const HeroHomepage = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50 pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(234,88,12,0.08),transparent_50%)]" />
      
      <div className="container mx-10  px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-300">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
              <span className="text-sm font-medium text-orange-900">Your Learning Hub</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
              Elevate Your
              <span className="block bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-700 max-w-xl">
              Access events, resources, and build your personal library. Track your progress, 
              connect with mentors, and unlock opportunities with Liftuplabs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group text-lg px-8 bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8"
                asChild
              >
                <Link to="/login">Learn More</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-orange-600">500+</p>
                <p className="text-sm text-gray-600">Events</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-orange-600">10K+</p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-orange-600">100+</p>
                <p className="text-sm text-gray-600">Resources</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl blur-3xl opacity-20" />
            <img 
              src={heroImage} 
              alt="Students learning together"
              className="relative rounded-3xl shadow-2xl w-full h-auto hover:shadow-orange-200 transition-shadow"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroHomepage
