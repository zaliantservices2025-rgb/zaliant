import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState<string>("all");

  const games = ["all", ...Array.from(new Set(mockProducts.map((p) => p.game)))];
  
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === "all" || product.game === selectedGame;
    return matchesSearch && matchesGame;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="mb-12 text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              Our <span className="text-gradient">Products</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of premium gaming tools with instant delivery and undetected performance
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center animate-fade-in-up">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {games.map((game) => (
                <Button
                  key={game}
                  variant={selectedGame === game ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGame(game)}
                  className="capitalize"
                >
                  {game}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-fade-in-up"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
