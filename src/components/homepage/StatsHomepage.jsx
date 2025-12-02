import { TrendingUp, Users, BookOpen, Award, Calendar } from 'lucide-react'

const StatsHomepage = () => {
  const stats = [
    {
      icon: Users,
      value: '15,000+',
      label: 'Active Students',
      color: 'from-orange-600 to-purple-500',
    },
    {
      icon: Calendar,
      value: '800+',
      label: 'Events Hosted',
      color: 'from-orange-500 to-blue-500',
    },
    {
      icon: BookOpen,
      value: '5,000+',
      label: 'Learning Resources',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      value: '92%',
      label: 'Success Rate',
      color: 'from-pink-500 to-orange-600',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-orange-600/10 via-orange-50 to-orange-500/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,88,12,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.15),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} p-0.5 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsHomepage
