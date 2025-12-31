import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Calendar,
  Clock,
  DollarSign,
  Plus,
  Video,
  Users,
  TrendingUp,
  Star,
  Settings,
  LogOut,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Mock data
const upcomingSessions = [
  {
    id: 1,
    clientName: "John Smith",
    clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "Today",
    time: "2:00 PM - 3:00 PM",
    duration: 60,
    type: "Career Coaching",
    status: "upcoming",
  },
  {
    id: 2,
    clientName: "Emily Watson",
    clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    date: "Today",
    time: "4:30 PM - 5:00 PM",
    duration: 30,
    type: "Interview Prep",
    status: "upcoming",
  },
  {
    id: 3,
    clientName: "Michael Chen",
    clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    date: "Tomorrow",
    time: "10:00 AM - 11:00 AM",
    duration: 60,
    type: "Leadership Coaching",
    status: "scheduled",
  },
];

const stats = [
  { icon: Calendar, label: "Sessions This Month", value: "32", change: "+12%" },
  { icon: DollarSign, label: "Earnings This Month", value: "$2,840", change: "+8%" },
  { icon: Star, label: "Average Rating", value: "4.9", change: "Stable" },
  { icon: Users, label: "Total Clients", value: "156", change: "+5" },
];

const recentReviews = [
  { id: 1, client: "John S.", rating: 5, comment: "Excellent session! Very insightful.", date: "2 days ago" },
  { id: 2, client: "Maria L.", rating: 5, comment: "Helped me gain clarity on my career path.", date: "3 days ago" },
];

export default function CounsellorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "sessions", label: "Sessions", icon: Video },
    { id: "workshops", label: "Workshops", icon: Users },
    { id: "earnings", label: "Earnings", icon: DollarSign },
    { id: "profile", label: "Edit Profile", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-16 bottom-0 bg-card border-r border-border p-4">
          <div className="flex items-center gap-3 mb-8 p-3">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <p className="font-semibold text-foreground">Dr. Sarah Mitchell</p>
              <p className="text-xs text-muted-foreground">Career Coach</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === link.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <Button variant="outline" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Good morning, Sarah! 👋</h1>
              <p className="text-muted-foreground">Here's what's happening today.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Manage Availability
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Workshop
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 rounded-xl bg-card border border-border shadow-soft"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 p-6 rounded-xl bg-card border border-border shadow-soft"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Upcoming Sessions</h2>
                <Link to="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border"
                  >
                    <img
                      src={session.clientImage}
                      alt={session.clientName}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{session.clientName}</p>
                      <p className="text-sm text-muted-foreground">{session.type}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={session.status === "upcoming" ? "default" : "secondary"}>
                        {session.duration} min
                      </Badge>
                      {session.status === "upcoming" && (
                        <Button size="sm" className="hidden sm:flex">
                          <Video className="w-4 h-4 mr-1" />
                          Join
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-xl bg-card border border-border shadow-soft"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Recent Reviews</h2>
                <Link to="#" className="text-sm text-primary hover:underline">View All</Link>
              </div>

              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{review.client}</span>
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

              <div className="mt-4 p-4 rounded-xl bg-primary/5 text-center">
                <p className="text-sm text-muted-foreground mb-1">Overall Rating</p>
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-6 h-6 fill-accent text-accent" />
                  <span className="text-3xl font-bold text-foreground">4.9</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border"
          >
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Update Bio
              </Button>
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Set Buffer Time
              </Button>
              <Button variant="outline" size="sm">
                <DollarSign className="w-4 h-4 mr-2" />
                Update Pricing
              </Button>
              <Button variant="outline" size="sm">
                <Video className="w-4 h-4 mr-2" />
                Upload Intro Video
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
