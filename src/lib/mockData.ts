// Import product images
import permanentSpooferThumb from "@/assets/products/permanent-spoofer-thumb.png";
import permanentSpoofer1 from "@/assets/products/permanent-spoofer-1.png";
import valorantPrivateThumb from "@/assets/products/valorant-private-thumb.png";
import valorantPrivate1 from "@/assets/products/valorant-private-1.png";
import valorantProThumb from "@/assets/products/valorant-pro-thumb.png";
import valorantPro1 from "@/assets/products/valorant-pro-1.png";

export interface Product {
  id: string;
  slug: string;
  title: string;
  game: string;
  description: string;
  features: string[];
  thumbnail: string;
  galleryImages: string[];
  badge?: "Featured" | "New" | "Undetected";
  lastUpdated: string;
  pricing: {
    duration: string;
    price: number;
    stock: number;
  }[];
}

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "valorantprivate",
    title: "Valorant Private",
    game: "Valorant",
    description: "Private build low ban chance.",
    features: [
      "Windows 10/11",
      "Intel/Amd",
      "Enable Aimbot",
      "Recoil Control System",
      "Smooth aiming",
      "Visible Check",
      "Draw FOV",
      "Trigger Bot with delay",
      "2D Box & Corner Box",
      "Skeleton & Healthbar",
      "Stream Proof",
      "Deatmatch Mode",
      "Unlock All",
      "Change menu color"
    ],
    thumbnail: valorantPrivateThumb,
    galleryImages: [
      valorantPrivateThumb,
      valorantPrivate1
    ],
    badge: "Undetected",
    lastUpdated: "06/11/2025",
    pricing: [
      { duration: "7 Days", price: 14.99, stock: 45 },
      { duration: "30 Days", price: 39.99, stock: 30 },
      { duration: "Lifetime", price: 99.99, stock: 20 },
    ],
  },
  {
    id: "2",
    slug: "valorantpro",
    title: "Valorant Pro",
    game: "Valorant",
    description: "Included vanguard bypass low ban chance.",
    features: [
      "Windows 10/11",
      "Intel/Amd",
      "Vanguard Bypass included",
      "Silent Aim [Hold]",
      "Recoil Control",
      "2D/3D Box ESP",
      "Skeleton & Agent Icon",
      "Chams ESP with Rainbow mode",
      "No Spread",
      "Skip Tutorial & Unlock ALL",
      "Bunny Hop",
      "ThirdPerson mode",
      "Spin Bot",
      "Custom builds for all users"
    ],
    thumbnail: valorantProThumb,
    galleryImages: [
      valorantProThumb,
      valorantPro1
    ],
    badge: "Featured",
    lastUpdated: "06/11/2025",
    pricing: [
      { duration: "3 Days", price: 14.99, stock: 40 },
      { duration: "7 Days", price: 34.99, stock: 35 },
      { duration: "30 Days", price: 74.99, stock: 25 },
      { duration: "Lifetime", price: 149.99, stock: 15 },
    ],
  },
  {
    id: "3",
    slug: "permanentspoofer",
    title: "Permanent Spoofer",
    game: "HWID Spoofer",
    description: "Permanent hardware ID spoofing solution.",
    features: [
      "Permanent HWID spoofing",
      "Windows 10-11 support",
      "Intel & AMD compatible",
      "Works with all anti-cheats",
      "All motherboards supported",
      "TPM Bypass for Valorant",
      "Supports all major games",
      "One-click operation",
      "No traces left",
      "Lifetime updates"
    ],
    thumbnail: permanentSpooferThumb,
    galleryImages: [
      permanentSpooferThumb,
      permanentSpoofer1
    ],
    badge: "New",
    lastUpdated: "08/11/2025",
    pricing: [
      { duration: "One-time", price: 14.99, stock: 50 },
      { duration: "Lifetime", price: 39.99, stock: 100 },
    ],
  },
];

export interface Order {
  id: string;
  productId: string;
  productTitle: string;
  duration: string;
  price: number;
  licenseKey: string;
  purchaseDate: string;
  expiryDate: string;
  status: "active" | "expired";
}

export interface SupportTicket {
  id: string;
  subject: string;
  orderId?: string;
  message: string;
  status: "open" | "pending" | "resolved";
  createdAt: string;
  responses: {
    author: string;
    message: string;
    timestamp: string;
  }[];
}
