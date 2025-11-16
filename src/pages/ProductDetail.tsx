import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { mockProducts } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Download, ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find((p) => p.slug === slug);
  const [selectedPricing, setSelectedPricing] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Load SellHub payment script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apisellhub.com/payment-embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Get SellHub product and variant mapping
  const getSellHubData = () => {
    const pricingOption = product?.pricing[selectedPricing]?.duration;
    
    if (product?.id === "3") { // Permanent Spoofer
      return {
        product: "1",
        variant: pricingOption === "One-time" ? "1" : "2"
      };
    } else if (product?.id === "1") { // Valorant Private
      const variantMap: Record<string, string> = {
        "7 Days": "3",
        "30 Days": "4",
        "Lifetime": "5"
      };
      return {
        product: "2",
        variant: variantMap[pricingOption] || "3"
      };
    } else if (product?.id === "2") { // Valorant Pro
      const variantMap: Record<string, string> = {
        "3 Days": "6",
        "7 Days": "7",
        "30 Days": "8",
        "Lifetime": "9"
      };
      return {
        product: "3",
        variant: variantMap[pricingOption] || "6"
      };
    }
    
    return { product: "1", variant: "1" };
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Product Not Found</h1>
            <Button asChild>
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePurchase = () => {
    toast.success("Redirecting to checkout...", {
      description: `${product.title} - ${product.pricing[selectedPricing].duration}`,
    });
    setTimeout(() => {
      navigate("/auth?checkout=true");
    }, 1000);
  };

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev + 1) % product.galleryImages.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.galleryImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image Gallery */}
            <div className="space-y-4 animate-fade-in">
              <div className="relative overflow-hidden rounded-xl border border-border aspect-video group">
                {product.badge && (
                  <Badge className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground">
                    {product.badge}
                  </Badge>
                )}
                <img
                  src={product.galleryImages[currentImageIndex]}
                  alt={`${product.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                
                {/* Navigation Arrows */}
                {product.galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {product.galleryImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentImageIndex
                              ? "bg-primary w-6"
                              : "bg-background/60 hover:bg-background/80"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date(product.lastUpdated).toLocaleDateString()}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <div className="text-sm font-medium text-primary mb-2">{product.game}</div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
                <p className="text-lg text-muted-foreground">{product.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Features
                </h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing Options */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Select Duration</h2>
                <div className="grid grid-cols-1 gap-3">
                  {product.pricing.map((pricing, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPricing(index)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedPricing === index
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{pricing.duration}</div>
                          <div className="text-sm text-muted-foreground">
                            In stock: {pricing.stock}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          ${pricing.price.toFixed(2)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Purchase CTA */}
              <div className="space-y-3 pt-4">
                <button
                  className="payment-button-sellhub w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  data-tenant="zaliantservices"
                  data-product={getSellHubData().product}
                  data-variant={getSellHubData().variant}
                >
                  <Zap className="h-5 w-5" />
                  Purchase Now - ${product.pricing[selectedPricing].price.toFixed(2)}
                </button>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Instant delivery
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    Secure checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
