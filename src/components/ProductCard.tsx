import { Link } from "react-router-dom";
import { Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const minPrice = Math.min(...product.pricing.map((p) => p.price));

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/50">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-6 left-6 z-10 flex items-center gap-1.5 rounded-full bg-secondary/90 px-3 py-1 text-xs font-semibold text-secondary-foreground backdrop-blur-sm">
          <Shield className="h-3 w-3" />
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg aspect-video">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-1">{product.game}</div>
          <h3 className="text-lg font-bold">{product.title}</h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        {/* Features */}
        <ul className="space-y-1">
          {product.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-1 w-1 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Updated {new Date(product.lastUpdated).toLocaleDateString()}</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div>
            <div className="text-xs text-muted-foreground">Starting at</div>
            <div className="text-xl font-bold text-primary">${minPrice.toFixed(2)}</div>
          </div>
          <Button variant="neon" size="sm" asChild>
            <Link to={`/product/${product.slug}`}>
              Get Access →
            </Link>
          </Button>
        </div>

        {/* More Info Link */}
        <Link
          to={`/product/${product.slug}`}
          className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          More Information
        </Link>
      </div>
    </div>
  );
};
