import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRight,
  Star,
  Shield,
  Clock,
  Video,
  Calendar,
  MessageCircle,
  CheckCircle,
  Users,
  Briefcase,
  Heart,
  GraduationCap,
  Rocket,
} from "lucide-react";

const categories = [
  { icon: Briefcase, label: "Career Coaching", color: "bg-orange-100 text-orange-600" },
  { icon: Heart, label: "Mental Health", color: "bg-orange-100 text-orange-700" },
  { icon: GraduationCap, label: "Study Abroad", color: "bg-orange-100 text-orange-600" },
  { icon: Rocket, label: "Startup Guidance", color: "bg-orange-100 text-orange-700" },
];

const features = [
  {
    icon: Video,
    title: "HD Video Sessions",
    description: "Crystal-clear video calls with screen sharing for interactive sessions.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Book 30 or 60-minute slots that fit your busy schedule.",
  },
  {
    icon: Shield,
    title: "Verified Experts",
    description: "All counsellors are credential-verified and background-checked.",
  },
  {
    icon: MessageCircle,
    title: "Follow-up Support",
    description: "Message your counsellor before and after sessions.",
  },
];

const stats = [
  { value: "10K+", label: "Sessions Completed" },
  { value: "500+", label: "Expert Counsellors" },
  { value: "4.9", label: "Average Rating" },
  { value: "98%", label: "Satisfaction Rate" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at Google",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    content: "MindBridge helped me navigate a career transition with confidence. My counsellor understood exactly what I needed.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Graduate Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    content: "The study abroad guidance I received was invaluable. Got accepted into my dream program!",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    content: "As a founder, the mental health support and startup mentorship has been a game-changer for me.",
    rating: 5,
  },
];

export default function Index({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative pt-2 pb-2 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
                🎯 Expert Guidance, One Click Away
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6">
                Your Journey to{" "}
                <span className="text-primary">Growth</span> Starts Here
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Connect with verified career coaches, mental health experts, and mentors.
                Book personalized 1-on-1 sessions or join insightful workshops.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" className="w-full sm:w-auto" onClick={() => onNavigate?.('counsellors')}>
                  Find a Counsellor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="hero" size="xl" className="w-full sm:w-auto" onClick={() => {
                  const userStr = localStorage.getItem('liftuplabs_user');
                  const user = userStr ? JSON.parse(userStr) : null;

                  if (!user || user.role !== 'counsellor') {
                    toast.error("Your profile is not registered as a Counsellor. Please create a new account with Counsellor user type.");
                    return;
                  }
                  onNavigate?.('become-counsellor');
                }}>
                  Become a Counsellor
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-10 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore by Category
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find the right expert for your specific needs
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => onNavigate?.('counsellors')}
                  className="block p-6 rounded-2xl bg-card shadow-soft border border-border hover:shadow-card hover:border-primary/20 transition-all group w-full text-left"
                >
                  <div className={`w-14 h-14 rounded-xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.label}
                  </h3>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MindBridge?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A seamless experience designed for your growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card shadow-soft border border-border hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Book your session in just 3 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: 1, title: "Browse & Filter", desc: "Find counsellors by category, price, rating, and availability" },
              { step: 2, title: "Book a Slot", desc: "Choose 30 or 60 minutes and pick a time that works for you" },
              { step: 3, title: "Join & Grow", desc: "Connect via HD video and start your journey to success" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4 shadow-glow">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how MindBridge has helped thousands achieve their goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card shadow-card border border-border"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-1">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl gradient-hero p-12 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Join thousands who have transformed their careers and lives with expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" onClick={() => onNavigate?.('counsellors')}>
                  Browse Counsellors
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
