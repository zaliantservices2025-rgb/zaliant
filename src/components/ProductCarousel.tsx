import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductsHeader } from "@/components/ProductsHeader";
import { mockProducts } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const ProductCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selected, setSelected] = useState(1);
  
  // Duplicate products for smooth infinite loop
  const loopedProducts = [...mockProducts, ...mockProducts, ...mockProducts];

  useEffect(() => {
    if (!api) return;
    
    // Set initial selected to middle set of products
    setSelected(api.selectedScrollSnap());
    
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="relative py-16 md:py-20">
      <div className="container">
        <ProductsHeader />
        <Carousel
          setApi={setApi}
          opts={{ 
            align: "center", 
            loop: true, 
            slidesToScroll: 1,
            startIndex: mockProducts.length,
            containScroll: false
          }}
          className="relative mb-16"
        >
          <CarouselContent className="py-8 -ml-6">
            {loopedProducts.map((product, idx) => (
              <CarouselItem key={`${product.id}-${idx}`} className="basis-full sm:basis-1/2 lg:basis-1/3 pl-6">
                <div
                  className={cn(
                    "transition-all duration-500 will-change-transform rounded-xl",
                    idx === selected
                      ? "scale-[1.03] md:scale-105 shadow-[0_4px_20px_hsl(var(--neon-blue)/0.15)]"
                      : "scale-95 opacity-70"
                  )}
                >
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-0 -translate-x-1/2 h-12 w-12" />
          <CarouselNext className="right-0 translate-x-1/2 h-12 w-12" />
        </Carousel>

        <div className="text-center mt-6">
          <Button variant="hero" size="lg" asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
