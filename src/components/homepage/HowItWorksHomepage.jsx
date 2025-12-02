import { BookOpen, Calendar, Users, Trophy } from 'lucide-react'

const HowItWorksHomepage = () => {
  const steps = [
    {
      icon: Users,
      title: 'Sign Up & Join',
      description: 'Create your free account and become part of our vibrant learning community',
      color: 'from-orange-600 to-purple-500',
    },
    {
      icon: Calendar,
      title: 'Attend Events',
      description: 'Register for workshops, seminars, and networking events tailored to your interests',
      color: 'from-orange-500 to-blue-500',
    },
    {
      icon: BookOpen,
      title: 'Access Resources',
      description: 'Build your personal library with curated notes, guides, and learning materials',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Trophy,
      title: 'Achieve Goals',
      description: 'Track your progress, earn achievements, and unlock career opportunities',
      color: 'from-pink-500 to-orange-600',
    },
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-600/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            How It <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your journey to success starts here in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-center space-y-4">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} p-0.5 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                      <Icon className="w-10 h-10 text-orange-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-bold text-orange-600">Step {index + 1}</div>
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-orange-600/50 to-transparent" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksHomepage
