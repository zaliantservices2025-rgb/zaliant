import { Link } from "react-router-dom";
import { MessageCircle, Youtube } from "lucide-react";
import zaliantLogo from "@/assets/zaliant-logo-new.png";

const footerLinks = {
  company: [
    { name: "About", path: "/about" },
    { name: "Terms of Service", path: "/terms" },
  ],
  products: [
    { name: "All Products", path: "/products" },
    { name: "Featured", path: "/products?featured=true" },
  ],
  social: [
    { name: "Discord", icon: MessageCircle, url: "https://discord.gg/zaliantud" },
    { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@kuykendall13" },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src={zaliantLogo} 
                alt="Zaliant" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Premium gaming tools engineered for excellence and undetected performance.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zaliant Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
