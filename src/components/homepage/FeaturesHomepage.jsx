import { Card, CardContent } from '../ui/card'
import { Trophy, BookOpen, Briefcase, Calendar, Users, GraduationCap } from 'lucide-react'

const features = [
  {
    icon: Trophy,
    title: 'Track Your Events',
    description: 'Stay organized with RSVPs, reminders, and automatically receive certificates for completed events.',
    color: 'text-orange-600'
  },
  {
    icon: BookOpen,
    title: 'Get Notes & PYQs',
    description: 'Build your personal library with notes, previous year questions, and study materials all in one place.',
    color: 'text-orange-500'
  },
  {
    icon: Briefcase,
    title: 'Career Guidance',
    description: 'Connect with mentors, explore opportunities, and get personalized career advice to achieve your goals.',
    color: 'text-orange-600'
  },
  {
    icon: Calendar,
    title: 'Event Calendar',
    description: 'Never miss important workshops, webinars, and competitions with our integrated event calendar.',
    color: 'text-orange-500'
  },
  {
    icon: Users,
    title: 'Community Learning',
    description: 'Join study groups, collaborate with peers, and learn together in a supportive community.',
    color: 'text-orange-600'
  },
  {
    icon: GraduationCap,
    title: 'Courses & Lectures',
    description: 'Access curated courses, lectures, and educational content from top institutions and educators.',
    color: 'text-orange-500'
  }
]

const FeaturesHomepage = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-orange-50 to-orange-100/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Everything You Need to
            <span className="block bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Succeed Academically
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Powerful features designed to enhance your learning experience and help you achieve your academic goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-orange-200/50"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesHomepage
