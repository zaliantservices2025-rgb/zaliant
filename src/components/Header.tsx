import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import zaliantLogo from "@/assets/zaliant-logo-new.png";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Product Status", path: "/product-status" },
    { name: "Vouches", path: "https://myvouch.es/zaliantservices", external: true },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-4 z-50 w-full px-4">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6 max-w-5xl rounded-2xl border-2 border-border/80 bg-background/5 backdrop-blur-xl shadow-lg shadow-black/5">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={zaliantLogo} 
            alt="Zaliant" 
            className="h-10 w-auto transition-all group-hover:drop-shadow-[0_0_12px_hsl(260_75%_63%/0.5)]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => 
            link.external ? (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            )}
          </button>
          <Button variant="hero" size="sm" asChild>
            <a href="https://discord.gg/zaliantud" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 pb-4 space-y-3 bg-background/95 backdrop-blur-lg">
          {navLinks.map((link) => 
            link.external ? (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
            <Button variant="hero" size="sm" className="w-full" asChild>
              <a href="https://discord.gg/zaliantud" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
