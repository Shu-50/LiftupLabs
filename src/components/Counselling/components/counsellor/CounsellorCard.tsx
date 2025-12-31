import { Star, Clock, Globe, BadgeCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface CounsellorCardProps {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  price30: number;
  price60: number;
  expertise: string[];
  languages: string[];
  nextAvailable: string;
  isVerified?: boolean;
  isTopRated?: boolean;
  onNavigate?: (page: string, counsellorId?: string) => void;
}

export function CounsellorCard({
  id,
  name,
  title,
  image,
  rating,
  reviewCount,
  price30,
  price60,
  expertise,
  languages,
  nextAvailable,
  isVerified = false,
  isTopRated = false,
  onNavigate,
}: CounsellorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-2xl shadow-card overflow-hidden border border-border hover:shadow-elevated transition-all duration-300"
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {isVerified && (
            <Badge className="bg-primary/90 text-primary-foreground border-0">
              <BadgeCheck className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {isTopRated && (
            <Badge className="bg-accent/90 text-accent-foreground border-0">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Top Rated
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Name & Title */}
        <div>
          <h3 className="text-lg font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
        </div>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2">
          {expertise.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Quick Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4" />
            {languages.slice(0, 2).join(", ")}
          </div>
        </div>

        {/* Next Available */}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-primary font-medium">{nextAvailable}</span>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-lg font-bold text-foreground">${price30}<span className="text-sm font-normal text-muted-foreground">/30min</span></p>
          </div>
          <Button size="sm" onClick={() => onNavigate?.('counsellor-profile', id)}>Book Now</Button>
        </div>
      </div>
    </motion.div>
  );
}
