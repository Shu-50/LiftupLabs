import { Card } from '../ui/card'
import { Star } from 'lucide-react'

const TestimonialsHomepage = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      content: 'Liftuplabs transformed my learning journey. The events and resources helped me land my dream internship!',
      rating: 5,
      avatar: 'SC',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Data Science Graduate',
      content: 'The community support and career guidance here are unmatched. I connected with amazing mentors who shaped my career path.',
      rating: 5,
      avatar: 'MR',
    },
    {
      name: 'Emily Watson',
      role: 'Software Engineer',
      content: 'Best platform for continuous learning. The notes library saved me countless hours of research and helped me ace my interviews.',
      rating: 5,
      avatar: 'EW',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-orange-100/50 via-orange-50 to-orange-100/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            What Our <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Students Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of students who are already achieving their goals with Liftuplabs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 bg-white border-orange-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                ))}
              </div>
              
              <p className="text-gray-900/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsHomepage
