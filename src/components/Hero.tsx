import { Shield, Zap, Clock, TrendingUp, ShoppingCart, Star, Info, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const badges = [
  { icon: null, label: "Trusted by 1,500+ Gamers", color: "text-blue-500" },
  { icon: Users, label: "350 Online Now", color: "text-green-500" },
  { icon: Shield, label: "100% Secure", color: "text-blue-500" },
];

const features = [
  {
    icon: Shield,
    title: "Undetected",
    description: "Advanced protection keeps you safe",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Get access immediately after purchase",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our team is always here to help",
  },
];

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-center">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {badge.icon ? (
                  <badge.icon className={`h-4 w-4 ${badge.color}`} />
                ) : (
                  <span className={`h-2 w-2 rounded-full ${badge.color === 'text-green-500' ? 'bg-green-500' : 'bg-blue-500'}`} />
                )}
                <span className="text-sm font-medium text-muted-foreground">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          {/* Main Heading */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Welcome to {" "}
              <span className="text-gradient">Zaliant Services!</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Premium products crafted to enhance your gameplay and dominate your opponents with ease.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl pt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className="p-3 rounded-lg bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button variant="hero" size="lg" asChild className="animate-pulse-glow">
              <Link to="/products">View Store →</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/product-status">Check Status</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl w-full border-t border-border/40 mt-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div className="text-3xl md:text-4xl font-bold text-primary">99.9%</div>
              </div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <div className="text-3xl md:text-4xl font-bold text-primary">3,491</div>
              </div>
              <div className="text-sm text-muted-foreground">Products Sold</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <div className="text-3xl md:text-4xl font-bold text-primary">4.98</div>
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Info className="h-5 w-5 text-primary" />
                <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              </div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
