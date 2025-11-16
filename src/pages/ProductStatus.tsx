import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductStatus = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const statusFilters = [
    { label: "UNDETECTED", color: "bg-green-500" },
    { label: "LAST 24 OWN RISK", color: "bg-orange-500" },
    { label: "TESTING", color: "bg-yellow-500" },
    { label: "UPDATING", color: "bg-blue-500" },
    { label: "OFFLINE", color: "bg-red-500" },
  ];

  const products = [
    {
      category: "VALORANT",
      items: [
        {
          name: "Valorant Private",
          price: "$14.99",
          lastDetection: "Never",
          week: "24/7",
          month: "24/7",
          status: "UNDETECTED",
          os: "Windows 10/11",
          features: ["Private build 0% ban", "HVCI on/off", "Aimbot & ESP"],
          updated: "06/11/2025",
        },
        {
          name: "Valorant Pro",
          price: "$14.99",
          lastDetection: "Never",
          week: "24/7",
          month: "24/7",
          status: "UNDETECTED",
          os: "Windows 10/11",
          features: ["Vanguard Bypass", "Low Ban Chance", "Advanced Features"],
          updated: "06/11/2025",
        },
      ],
    },
    {
      category: "HWID SPOOFER",
      items: [
        {
          name: "Permanent Spoofer",
          price: "$14.99",
          lastDetection: "Never",
          week: "24/7",
          month: "24/7",
          status: "UNDETECTED",
          os: "Windows 10/11",
          features: ["Permanent HWID spoofing", "All anti-cheats", "TPM Bypass included"],
          updated: "08/11/2025",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            Live Status
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            Product <span className="text-gradient">Status</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay up to date with the current status of all our software.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
          {statusFilters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setSelectedFilter(selectedFilter === filter.label ? null : filter.label)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border ${
                selectedFilter === filter.label
                  ? "bg-primary/20 border-primary"
                  : "bg-card/50 border-border hover:border-primary/50"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${filter.color}`} />
              {filter.label}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="space-y-8">
          {products.map((category, idx) => (
            <div key={category.category} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              {/* Category Header */}
              <div className="bg-primary/90 text-primary-foreground px-6 py-3 rounded-t-xl font-bold text-lg">
                {category.category}
              </div>

              {/* Products in Category */}
              {category.items.map((product) => (
                <div
                  key={product.name}
                  className="bg-card/30 backdrop-blur-sm border border-border rounded-b-xl p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left Section */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Starting from <span className="text-primary font-semibold">{product.price}</span>
                          </p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/30 w-fit">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                          {product.status}
                        </Badge>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Last Detection</p>
                          <p className="font-semibold">{product.lastDetection}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Week</p>
                          <p className="font-semibold">{product.week}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Month</p>
                          <p className="font-semibold">{product.month}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Supported OS:</p>
                          <p className="font-semibold text-primary">{product.os}</p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="outline"
                            className="bg-primary/10 border-primary/30 text-primary"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Last updated: {product.updated}
                      </p>
                    </div>

                    {/* Right Section - CTA */}
                    <div className="lg:min-w-[200px]">
                      <Button variant="hero" size="lg" className="w-full">
                        Purchase Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductStatus;
