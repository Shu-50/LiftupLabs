import { useState } from "react";
import { CounsellorCard } from "../components/counsellor/CounsellorCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Search, SlidersHorizontal, Star, ChevronLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardButton } from "../components/DashboardButton";

// Mock data
const counsellors = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    title: "Career Coach & Leadership Expert",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 234,
    price30: 45,
    price60: 80,
    expertise: ["Career Transitions", "Leadership", "Interview Prep"],
    languages: ["English", "Spanish"],
    nextAvailable: "Available Today",
    isVerified: true,
    isTopRated: true,
  },
  {
    id: "2",
    name: "Dr. James Chen",
    title: "Mental Health Counselor",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 189,
    price30: 50,
    price60: 90,
    expertise: ["Anxiety", "Stress Management", "Work-Life Balance"],
    languages: ["English", "Mandarin"],
    nextAvailable: "Tomorrow at 10 AM",
    isVerified: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Study Abroad Consultant",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 156,
    price30: 35,
    price60: 60,
    expertise: ["US Universities", "Scholarships", "Visa Guidance"],
    languages: ["English", "Portuguese"],
    nextAvailable: "Available Today",
    isVerified: true,
    isTopRated: true,
  },
  {
    id: "4",
    name: "Michael Park",
    title: "Startup Mentor & Investor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 98,
    price30: 75,
    price60: 130,
    expertise: ["Fundraising", "Product Strategy", "Growth"],
    languages: ["English", "Korean"],
    nextAvailable: "Wed at 2 PM",
    isVerified: true,
  },
  {
    id: "5",
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 312,
    price30: 55,
    price60: 95,
    expertise: ["Depression", "Trauma", "Self-Esteem"],
    languages: ["English", "Hindi"],
    nextAvailable: "Available Today",
    isVerified: true,
    isTopRated: true,
  },
  {
    id: "6",
    name: "Alex Thompson",
    title: "Tech Career Advisor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 87,
    price30: 40,
    price60: 70,
    expertise: ["Tech Interviews", "Resume Review", "Salary Negotiation"],
    languages: ["English"],
    nextAvailable: "Tomorrow at 3 PM",
    isVerified: true,
  },
];

const categories = ["All Categories", "Career Coaching", "Mental Health", "Study Abroad", "Startup Guidance"];

export default function CounsellorsPage({ onNavigate }: { onNavigate?: (page: string, counsellorId?: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCounsellors = counsellors.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPrice = c.price30 >= priceRange[0] && c.price30 <= priceRange[1];

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <section className="pt-2 pb-1 bg-secondary/30">
        <div className="container mx-auto px-4">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Find Your Perfect Counsellor
            </h1>
            <p className="text-muted-foreground">
              Browse our network of verified experts and book a session that fits your schedule.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur-lg z-40">
        <div className="container mx-auto px-4">
          {/* Header with Back and Dashboard buttons */}
          <div className="flex items-center justify-between mb-4">
            {/* Back Button */}
            <button
              onClick={() => onNavigate?.('index')}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-600 cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Counselling
            </button>

            {/* Dashboard Button */}
            <DashboardButton onNavigate={onNavigate} />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, expertise, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] h-11">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px] h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="available">Available Now</SelectItem>
              </SelectContent>
            </Select>

            {/* More Filters Button */}
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="h-11"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={200}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  {/* Availability */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Availability</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Today", "Tomorrow", "This Week"].map((opt) => (
                        <Button key={opt} variant="outline" size="sm">
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
                    <div className="flex flex-wrap gap-2">
                      {["4+", "4.5+", "4.8+"].map((opt) => (
                        <Button key={opt} variant="outline" size="sm">
                          {opt} ★
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredCounsellors.length}</span> counsellors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCounsellors.map((counsellor, index) => (
              <motion.div
                key={counsellor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CounsellorCard {...counsellor} onNavigate={onNavigate} />
              </motion.div>
            ))}
          </div>

          {filteredCounsellors.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">No counsellors found matching your criteria</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setPriceRange([0, 200]);
                setSelectedCategory("All Categories");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
