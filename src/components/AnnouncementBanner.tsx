import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

export const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-primary via-accent to-primary animate-pulse-glow">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <AlertCircle className="h-5 w-5 text-primary-foreground flex-shrink-0 animate-pulse" />
            <div className="flex items-center gap-2 text-primary-foreground text-sm md:text-base font-medium">
              <span>Announcement: Join us on Discord!</span>
              <a 
                href="https://discord.gg/zaliantud" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:opacity-80 transition-opacity font-semibold"
              >
                https://discord.gg/zaliantud
              </a>
              <span>for PayPal payment</span>
            </div>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex-shrink-0"
            aria-label="Close announcement"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
