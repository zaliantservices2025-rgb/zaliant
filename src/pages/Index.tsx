import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import { FAQ } from "@/components/FAQ";
import { PaymentMethods } from "@/components/PaymentMethods";
import { Footer } from "@/components/Footer";
import BlueSparksBackground from "@/components/BlueSparksBackground";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background elements covering entire page height */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(211_100%_52%/0.08),transparent_50%)]" />
        <BlueSparksBackground />
      </div>
      
      <Header />
      <main className="flex-1 relative z-10">
        <Hero />
        <ProductCarousel />
        <FAQ />
        <PaymentMethods />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
