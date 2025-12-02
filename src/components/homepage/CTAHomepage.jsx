import { Button } from '../ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const CTAHomepage = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-600/5 to-orange-500/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-white/50 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-lg">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-300">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Join Thousands of Students</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Learning Experience?
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Create your free account today and start accessing events, resources, 
            and connecting with mentors who can help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="group text-lg px-10 shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link to="/register">
                Create Free Account
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-10"
              asChild
            >
              <Link to="/login">View Demo</Link>
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            No credit card required • Free forever • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}

export default CTAHomepage
