import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Users, Zap, Clock } from "lucide-react";

const stats = [
  { label: "Active Users", value: "2,500+", icon: Users },
  { label: "Uptime", value: "99.9%", icon: Clock },
  { label: "Products", value: "3+", icon: Zap },
  { label: "Years Active", value: "3+", icon: Shield },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              About <span className="text-gradient">Zaliant Services</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your trusted source for premium gaming tools
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fade-in-up">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8 animate-scale-in">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Zaliant Services, we're dedicated to providing the highest quality gaming tools and software. 
                Our mission is to empower gamers with cutting-edge technology while maintaining the 
                highest standards of security and reliability.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Why Choose Us</h2>
              <div className="grid gap-4">
                <div className="p-4 rounded-lg border border-border bg-card/30">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Undetected Technology
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our products use advanced bypass technology to ensure maximum safety and longevity.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card/30">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Instant Delivery
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Access your products immediately after purchase with our automated delivery system.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card/30">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    24/7 Support
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our dedicated support team is available around the clock to assist you.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Our Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to continuous improvement and innovation. Our development team works 
                tirelessly to keep our products updated, secure, and performing at the highest level. 
                Your trust is our priority, and we strive to exceed your expectations every day.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
