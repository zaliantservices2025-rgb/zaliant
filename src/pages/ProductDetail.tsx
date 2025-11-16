import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { mockProducts } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Download, ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SELLHUB_API_KEY = "758af9bc-5e35-429f-8668-9b471f96cb57_dqm7gnpa1zxxuhn6j4zqgl473jdsrzkouebeq0gql2jwb387gomvre58yiujdwb4";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find((p) => p.slug === slug);
  const [selectedPricing, setSelectedPricing] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const getSellHubData = () => {
    const pricingOption = product?.pricing[selectedPricing]?.duration;

    if (product?.id === "3") {
      return {
        productId: "65c8784d-3bde-4040-a2e9-4a75233ca9fd",
        variantId: pricingOption === "One-time"
          ? "d4bf4962-d633-4ebf-ba63-da3750a5c577"
          : "e117729e-19dc-43df-bc83-15857e73d69e"
      };
    } else if (product?.id === "1") {
      const variantMap: Record<string, string> = {
        "7 Days": "0cb95b78-8080-41e5-aacd-6daab2b59c80",
        "30 Days": "e280a6b0-b720-4107-a651-7e32bd617dd5",
        "Lifetime": "4c8c7b3c-51b1-4bf0-bd0d-c0883594f1f8"
      };
      return {
        productId: "6215c574-5ff5-495e-9f9f-f1122b11bb3b",
        variantId: variantMap[pricingOption] || "0cb95b78-8080-41e5-aacd-6daab2b59c80"
      };
    } else if (product?.id === "2") {
      const variantMap: Record<string, string> = {
        "3 Days": "d6bdacfa-a847-4a8a-978c-0e50e3044331",
        "7 Days": "700de951-ade9-4d16-be21-a7b3a677cd65",
        "30 Days": "36eeaae7-c6c9-47ef-a1ce-4697ee670a57",
        "Lifetime": "c79944ff-9208-4f2b-8b2b-f90114a2bc02"
      };
      return {
        productId: "9dcbac2e-4e41-47c7-bd91-805abe6bcd0d",
        variantId: variantMap[pricingOption] || "d6bdacfa-a847-4a8a-978c-0e50e3044331"
      };
    }

    return {
      productId: "65c8784d-3bde-4040-a2e9-4a75233ca9fd",
      variantId: "d4bf4962-d633-4ebf-ba63-da3750a5c577"
    };
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

  const handlePurchase = async () => {
    if (!product) return;

    setIsProcessing(true);
    const { productId, variantId } = getSellHubData();

    try {
      const email = prompt("Please enter your email address:");
      if (!email) {
        setIsProcessing(false);
        return;
      }

      const response = await fetch("https://store.sellhub.cx/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SELLHUB_API_KEY}`
        },
        body: JSON.stringify({
          email: email,
          currency: "usd",
          returnUrl: window.location.origin + "/dashboard",
          cartBundles: [],
          methodName: "",
          bundleIds: [],
          customFieldValues: [],
          cart: {
            items: [
              {
                id: productId,
                coupon: "",
                name: "",
                variant: {
                  id: variantId,
                  name: "",
                  price: "0.00"
                },
                quantity: 1,
                addons: []
              }
            ],
            bundles: []
          }
        })
      });

      const data = await response.json();

      if (data.status === "success" && data.session) {
        toast.success("Redirecting to checkout...");
        window.location.href = `https://store.sellhub.cx/checkout/${data.session.id}`;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout", {
        description: "Please try again or contact support"
      });
    } finally {
      setIsProcessing(false);
    }
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
                <Button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 px-6 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  size="lg"
                >
                  <Zap className="h-5 w-5" />
                  {isProcessing ? "Processing..." : `Purchase Now - $${product.pricing[selectedPricing].price.toFixed(2)}`}
                </Button>
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
