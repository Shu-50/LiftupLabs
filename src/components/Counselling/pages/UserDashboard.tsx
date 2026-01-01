import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Calendar,
  Clock,
  Video,
  MessageCircle,
  Star,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Search,
  Heart,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function UserDashboard({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchDashboardData();
    }
  }, [userId]);

  const fetchUserId = () => {
    try {
      const userStr = localStorage.getItem('liftuplabs_user');
      if (!userStr) {
        toast.error('Please login to view dashboard');
        return;
      }

      const user = JSON.parse(userStr);
      setUserId(user.id);
      setUserName(user.name || 'User');
    } catch (error) {
      console.error('Error fetching user ID:', error);
      toast.error('Failed to load user profile');
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users/dashboard/${userId}/overview`);
      const data = await response.json();

      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (timeStr: string) => {
    const time = new Date(`2000-01-01T${timeStr}`);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "sessions", label: "My Sessions", icon: Video },
    { id: "saved", label: "Saved Counsellors", icon: Heart },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">

      <div className="flex ">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 fixed lg:left-64 top-21 bottom-0 bg-card border-r border-border p-4 z-40">
          {/* Back Button */}
          <button
            onClick={() => onNavigate?.('index')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-600 mb-4 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Counselling
          </button>

          <div className="flex items-center gap-3 mb-8 p-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">Student</p>
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
        <main className="flex-1 lg:ml-[15rem] px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, John! 👋</h1>
              <p className="text-muted-foreground">Continue your growth journey.</p>
            </div>
            <Link to="/counsellors">
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Find Counsellors
              </Button>
            </Link>
          </div>

          {/* Upcoming Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Sessions</h2>
              <Link to="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {dashboardData?.upcomingSessions?.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {dashboardData.upcomingSessions.map((session: any) => (
                  <div
                    key={session.id}
                    className="p-5 rounded-xl bg-card border border-border shadow-soft hover:shadow-card transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={session.counsellor_image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"}
                        alt={session.counsellor_name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{session.counsellor_name}</p>
                        <p className="text-sm text-muted-foreground">{session.session_type}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(session.scheduled_date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(session.scheduled_time)}
                          </span>
                          <Badge variant="secondary">{session.duration} min</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {session.status === "upcoming" ? (
                        <>
                          <Button className="flex-1">
                            <Video className="w-4 h-4 mr-2" />
                            Join Now
                          </Button>
                          <Button variant="outline">Reschedule</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" className="flex-1">View Details</Button>
                          <Button variant="ghost">Cancel</Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4 rounded-xl bg-secondary/30 border border-border">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="font-semibold text-foreground mb-1">No upcoming sessions</h3>
                <p className="text-sm text-muted-foreground mb-4">Book a session with one of our expert counsellors.</p>
                <Link to="/counsellors">
                  <Button>Browse Counsellors</Button>
                </Link>
              </div>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Past Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl bg-card border border-border shadow-soft"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Past Sessions</h2>
                <Link to="#" className="text-sm text-primary hover:underline">View All</Link>
              </div>

              <div className="space-y-4">
                {dashboardData?.pastSessions?.length > 0 ? (
                  dashboardData.pastSessions.map((session: any) => (
                    <div
                      key={session.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30"
                    >
                      <img
                        src={session.counsellor_image || "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"}
                        alt={session.counsellor_name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">{session.counsellor_name}</p>
                        <p className="text-sm text-muted-foreground">{session.session_type}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(session.scheduled_date)}
                        </p>
                      </div>
                      {session.reviewed ? (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-medium">{session.rating}</span>
                        </div>
                      ) : (
                        <Button size="sm" variant="soft">
                          Leave Review
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No past sessions
                  </div>
                )}
              </div>
            </motion.div>

            {/* Saved Counsellors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-card border border-border shadow-soft"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Saved Counsellors</h2>
                <Link to="#" className="text-sm text-primary hover:underline">View All</Link>
              </div>

              <div className="space-y-4">
                {dashboardData?.savedCounsellors?.length > 0 ? (
                  dashboardData.savedCounsellors.map((counsellor: any) => (
                    <div
                      key={counsellor.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30"
                    >
                      <img
                        src={counsellor.image}
                        alt={counsellor.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{counsellor.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{counsellor.title}</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            {counsellor.rating}
                          </span>
                        </div>
                      </div>
                      <Link to={`/counsellor/${counsellor.id}`}>
                        <Button size="sm">Book</Button>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No saved counsellors
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-6 rounded-xl gradient-hero text-primary-foreground"
          >
            <h3 className="font-semibold mb-2">💡 Quick Tips for Your Sessions</h3>
            <ul className="text-sm space-y-2 text-primary-foreground/90">
              <li>• Join the meeting room 5 minutes early to test your audio/video</li>
              <li>• Prepare specific questions or topics you want to discuss</li>
              <li>• Choose a quiet, well-lit space for your video call</li>
            </ul>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
