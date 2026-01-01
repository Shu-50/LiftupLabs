import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BookingWizard } from "../components/booking/BookingWizard";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { DashboardButton } from "../components/DashboardButton";
import { toast } from "sonner";
import {
  Star,
  BadgeCheck,
  Globe,
  Clock,
  Calendar,
  Video,
  MessageCircle,
  Award,
  Play,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock counsellor data (in real app, fetch by ID)
const counsellorData = {
  id: "1",
  name: "Dr. Sarah Mitchell",
  title: "Career Coach & Leadership Expert",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop",
  rating: 4.9,
  reviewCount: 234,
  price30: 45,
  price60: 80,
  expertise: ["Career Transitions", "Leadership Development", "Interview Preparation", "Executive Coaching"],
  languages: ["English", "Spanish"],
  experience: "15+ years",
  sessionsCompleted: 1200,
  responseTime: "< 2 hours",
  isVerified: true,
  isTopRated: true,
  bio: `Dr. Sarah Mitchell is a certified career coach with over 15 years of experience helping professionals navigate career transitions, develop leadership skills, and achieve their professional goals.

She holds a Ph.D. in Organizational Psychology from Stanford University and has worked with clients from Fortune 500 companies, startups, and non-profits. Her approach combines evidence-based coaching techniques with practical, actionable strategies.

Sarah specializes in helping mid-career professionals make meaningful transitions, executives develop their leadership presence, and job seekers ace their interviews.`,
  qualifications: [
    "Ph.D. in Organizational Psychology - Stanford University",
    "Certified Professional Coach (ICF-PCC)",
    "SHRM-SCP Certified",
    "Former HR Director at Google",
  ],
  reviews: [
    {
      id: 1,
      name: "John D.",
      date: "2 weeks ago",
      rating: 5,
      comment: "Sarah helped me land my dream job at a top tech company. Her interview coaching was invaluable!",
    },
    {
      id: 2,
      name: "Maria L.",
      date: "1 month ago",
      rating: 5,
      comment: "Incredibly insightful session. Sarah asked the right questions and helped me gain clarity on my career path.",
    },
    {
      id: 3,
      name: "David K.",
      date: "1 month ago",
      rating: 5,
      comment: "Best investment I've made in my career. The leadership coaching has transformed how I manage my team.",
    },
  ],
};

export default function CounsellorProfile({
  counsellorId,
  onNavigate
}: {
  counsellorId?: string | null;
  onNavigate?: (page: string) => void;
}) {
  const { id } = useParams();
  const actualId = counsellorId || id;

  const handleBookingComplete = () => {
    toast.success("Booking confirmed! Check your email for meeting details.", {
      description: "Your session with Dr. Sarah Mitchell is scheduled.",
    });
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Header with Back and Dashboard buttons */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between pt-2 mb-2">
          {/* Back Button */}
          <button
            onClick={() => onNavigate?.('counsellors')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-600 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Counsellors
          </button>

          {/* Dashboard Button */}
          <DashboardButton onNavigate={onNavigate} />
        </div>
      </div>
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 mt-6">
        <img
          src={counsellorData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4">

        <div className="grid lg:grid-cols-3 gap-8 pb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-6 -mt-16 relative z-10"
            >
              <div className="relative">
                <img
                  src={counsellorData.image}
                  alt={counsellorData.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-background shadow-elevated"
                />
                {counsellorData.isVerified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2 mt-16">
                  <h1 className="text-2xl md:text-3xl font-bold  text-foreground">{counsellorData.name}</h1>
                  {counsellorData.isTopRated && (
                    <Badge className="bg-accent text-accent-foreground ">
                      <Star className="w-3 h-3 mr-1 fill-current " />
                      Top Rated
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-3">{counsellorData.title}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold">{counsellorData.rating}</span>
                    <span className="text-muted-foreground">({counsellorData.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    {counsellorData.languages.join(", ")}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Award className="w-4 h-4" />
                    {counsellorData.experience}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {[
                { icon: Calendar, label: "Sessions", value: counsellorData.sessionsCompleted + "+" },
                { icon: Clock, label: "Response Time", value: counsellorData.responseTime },
                { icon: Video, label: "Video Quality", value: "HD" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-secondary/50">
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <Tabs defaultValue="about">
                <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
                  {["About", "Reviews", "Expertise"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab.toLowerCase()}
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="about" className="mt-6 space-y-6">
                  {/* Bio */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">About Me</h3>
                    <div className="prose prose-sm text-muted-foreground max-w-none">
                      {counsellorData.bio.split("\n\n").map((p, i) => (
                        <p key={i} className="mb-4 leading-relaxed">{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Qualifications</h3>
                    <ul className="space-y-2">
                      {counsellorData.qualifications.map((qual, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {qual}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Intro Video Placeholder */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Introduction Video</h3>
                    <div className="relative aspect-video rounded-xl bg-secondary overflow-hidden group cursor-pointer">
                      <img
                        src={counsellorData.coverImage}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center group-hover:bg-foreground/40 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                          <Play className="w-7 h-7 text-primary-foreground ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6 space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-bold text-foreground">{counsellorData.rating}</div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(counsellorData.rating)
                              ? "fill-accent text-accent"
                              : "text-muted"
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{counsellorData.reviewCount} reviews</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {counsellorData.reviews.map((review) => (
                      <div key={review.id} className="p-4 rounded-xl bg-secondary/30 border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                              {review.name.charAt(0)}
                            </div>
                            <span className="font-medium text-foreground">{review.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="expertise" className="mt-6">
                  <div className="flex flex-wrap gap-3">
                    {counsellorData.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-medium text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1 mt-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
              <BookingWizard
                counsellorName={counsellorData.name}
                price30={counsellorData.price30}
                price60={counsellorData.price60}
                onComplete={handleBookingComplete}
              />

              {/* Quick Contact */}
              <div className="mt-4 p-4 rounded-xl bg-secondary/50 border border-border">
                <p className="text-sm text-muted-foreground mb-3">Have questions before booking?</p>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
