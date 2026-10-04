// Centralized business configuration for Treasured Tips

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number | null;
  priceFrom?: boolean;
  duration: number;
  category: string;
  image?: string;
  available: boolean;
  depositRequired: boolean;
  depositAmount?: number;
}

export interface Review {
  id: string;
  text: string;
  author: string;
  themes: string[];
  rating: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption?: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  ownerName: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  openingHours: { day: string; hours: string }[];
  socialLinks: { platform: string; url: string }[];
}

export const businessInfo: BusinessInfo = {
  name: "Treasured Tips",
  tagline: "Beautiful nails, carefully considered.",
  ownerName: "Amber",
  phone: null,
  email: null,
  address: null,
  openingHours: [
    { day: "Monday", hours: "By appointment" },
    { day: "Tuesday", hours: "By appointment" },
    { day: "Wednesday", hours: "By appointment" },
    { day: "Thursday", hours: "By appointment" },
    { day: "Friday", hours: "By appointment" },
    { day: "Saturday", hours: "By appointment" },
    { day: "Sunday", hours: "Closed" },
  ],
  socialLinks: [{ platform: "Instagram", url: "#" }],
};

export const services: Service[] = [
  {
    id: "biab-full-set",
    name: "BIAB Full Set",
    description: "Builder in a Bottle — a strengthening gel overlay applied to natural nails. Includes careful preparation, shaping, and your choice of colour or finish. Known for durability and nail health.",
    price: null,
    duration: 90,
    category: "BIAB",
    available: true,
    depositRequired: true,
  },
  {
    id: "biab-infill",
    name: "BIAB Infill",
    description: "Maintenance appointment for existing BIAB nails. Includes rebalancing, reshaping and fresh colour or finish. Recommended every 2–3 weeks.",
    price: null,
    duration: 75,
    category: "BIAB",
    available: true,
    depositRequired: true,
  },
  {
    id: "biab-removal",
    name: "BIAB Removal",
    description: "Safe, careful removal of BIAB or builder gel. Includes nail conditioning and aftercare advice.",
    price: null,
    duration: 45,
    category: "Removal",
    available: true,
    depositRequired: false,
  },
  {
    id: "gel-manicure",
    name: "Gel Manicure",
    description: "A classic gel polish manicure with meticulous preparation for long-lasting, chip-resistant colour.",
    price: null,
    duration: 60,
    category: "Gel",
    available: true,
    depositRequired: false,
  },
  {
    id: "nail-art",
    name: "Nail Art",
    description: "Custom nail art designed to your preferences. From minimal line work to detailed designs — discussed and agreed at your appointment.",
    price: null,
    priceFrom: true,
    duration: 30,
    category: "Nail Art",
    available: true,
    depositRequired: false,
  },
  {
    id: "gel-removal",
    name: "Gel Polish Removal",
    description: "Safe removal of gel polish with care for your natural nails underneath.",
    price: null,
    duration: 30,
    category: "Removal",
    available: true,
    depositRequired: false,
  },
];

export const serviceCategories = ["All", "BIAB", "Gel", "Nail Art", "Removal"];

export const reviews: Review[] = [
  { id: "1", text: "Five stars always for Amber. She is so talented, a perfectionist with a keen eye for detail.", author: "Verified client", themes: ["attention to detail", "perfectionist"], rating: 5 },
  { id: "2", text: "Amber really listened to all of my requests. Getting my nails looking and feeling healthy — she is great with nail art.", author: "Verified client", themes: ["nail health", "nail art", "listening"], rating: 5 },
  { id: "3", text: "Her attention to detail is second to none. Amber takes great care with the prep.", author: "Verified client", themes: ["preparation", "attention to detail"], rating: 5 },
  { id: "4", text: "Amber always listens to what I want and gets it right every time! Lasts for ages.", author: "Verified client", themes: ["listening", "longevity"], rating: 5 },
  { id: "5", text: "Such good designs, such good application, the whole lot. Amber is a perfectionist.", author: "Verified client", themes: ["nail art", "application", "perfectionist"], rating: 5 },
  { id: "6", text: "Amber put me at ease from my very first appointment. She clearly cares very much about her work.", author: "Verified client", themes: ["comfort", "personality", "care"], rating: 5 },
  { id: "7", text: "She offers a professional, welcoming and friendly experience.", author: "Verified client", themes: ["personality", "professional"], rating: 5 },
  { id: "8", text: "I genuinely can't imagine trusting anyone else with my nails.", author: "Verified client", themes: ["trust", "loyalty"], rating: 5 },
  { id: "9", text: "Amber will always make sure you're in love with your nails before you leave.", author: "Verified client", themes: ["care", "attention to detail", "satisfaction"], rating: 5 },
];

export const galleryImages: GalleryImage[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=800&fit=crop", alt: "BIAB full set — natural finish", category: "BIAB", caption: "BIAB — natural strength" },
  { id: "2", src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop", alt: "Elegant almond nails", category: "BIAB", caption: "Almond shape — sheer nude" },
  { id: "3", src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=750&fit=crop", alt: "Nail products and tools", category: "Gel", caption: "Curated colour collection" },
  { id: "4", src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=800&fit=crop", alt: "French manicure", category: "French", caption: "Classic French" },
  { id: "5", src: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&h=600&fit=crop", alt: "Natural nails", category: "Gel", caption: "Natural elegance" },
  { id: "6", src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=750&fit=crop", alt: "Detailed nail art", category: "Nail Art", caption: "Detailed design work" },
  { id: "7", src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=800&fit=crop", alt: "Neutral tones", category: "Gel", caption: "Soft neutral tones" },
  { id: "8", src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop", alt: "BIAB with nail art", category: "BIAB", caption: "BIAB with hand-painted detail" },
  { id: "9", src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=750&fit=crop", alt: "Minimalist design", category: "Nail Art", caption: "Minimalist lines" },
];

export const galleryCategories = ["All", "BIAB", "Nail Art", "Gel", "French", "Designs"];

export interface BookingConfig {
  workingHours: { start: string; end: string };
  appointmentBuffer: number;
  daysOff: number[];
  blockedDates: string[];
  blockedTimes: { date: string; time: string }[];
  advanceBookingDays: number;
}

export const bookingConfig: BookingConfig = {
  workingHours: { start: "09:00", end: "18:00" },
  appointmentBuffer: 15,
  daysOff: [0],
  blockedDates: [],
  blockedTimes: [],
  advanceBookingDays: 60,
};

export interface NailCareArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  icon: string;
}

export const nailCareArticles: NailCareArticle[] = [
  {
    id: "preparation",
    title: "Why Preparation Matters",
    excerpt: "Beautiful, long-lasting nails start long before the colour goes on.",
    icon: "✨",
    content: [
      "The difference between nails that last and nails that chip within days often comes down to preparation. At Treasured Tips, every appointment begins with careful nail preparation — gentle cuticle work, precise shaping, and thorough cleansing of the nail plate.",
      "This isn't a rushed step. It's the most important part of the process. When the nail surface is properly prepared, products adhere better, last longer, and look more natural.",
      "Good preparation also means assessing the condition of your nails before any product is applied.",
    ],
  },
  {
    id: "nail-health",
    title: "Understanding Nail Health",
    excerpt: "Healthy nails are the foundation of beautiful nails.",
    icon: "💅",
    content: [
      "Your nails tell a story about your overall health and habits. Ridges, brittleness, or discolouration can all indicate underlying needs.",
      "BIAB is particularly valued because it works with your natural nails rather than against them. It adds strength and protection while your nails grow.",
      "Between appointments, keeping your nails moisturised with cuticle oil, avoiding using them as tools, and wearing gloves for cleaning can all help.",
    ],
  },
  {
    id: "biab",
    title: "What is BIAB?",
    excerpt: "Builder in a Bottle — a strengthening treatment that's transformed nail care.",
    icon: "🤍",
    content: [
      "BIAB (Builder in a Bottle) is a soak-off builder gel that adds structure and strength to your natural nails. Unlike traditional extensions, it's designed to work with what you have.",
      "It's particularly popular because it promotes nail growth. The overlay protects your nails from everyday wear and tear while they grow stronger underneath.",
      "BIAB can be worn with any colour or finish, and maintenance appointments are typically needed every 2–3 weeks.",
    ],
  },
  {
    id: "between-appointments",
    title: "Caring for Your Nails Between Appointments",
    excerpt: "Simple steps to keep your manicure looking fresh.",
    icon: "🌿",
    content: [
      "Apply cuticle oil daily — even just a quick brush before bed makes a real difference.",
      "Wear gloves when doing household chores, especially washing up. Prolonged exposure to water and cleaning products shortens how long your nails last.",
      "If you notice a small lift or chip, don't pick at it. Get in touch and Amber can take a look.",
      "Moisturise your hands regularly. Well-hydrated skin and cuticles make everything look more polished.",
    ],
  },
  {
    id: "before-appointment",
    title: "Preparing for Your Appointment",
    excerpt: "A few things you can do to make the most of your time with Amber.",
    icon: "📋",
    content: [
      "If you have inspiration photos, bring them along. Visual references help Amber understand exactly what you're looking for.",
      "Don't worry if your current nails aren't in perfect condition — that's what the appointment is for.",
      "If you're unsure about colour or design, that's completely fine. Amber is happy to make recommendations.",
      "Arrive with clean, bare hands if possible.",
    ],
  },
  {
    id: "when-to-book",
    title: "When to Book Maintenance",
    excerpt: "Knowing when to come back keeps your nails looking their best.",
    icon: "📅",
    content: [
      "For BIAB, maintenance is typically recommended every 2–3 weeks.",
      "For gel polish, most clients return every 2–3 weeks depending on how quickly their nails grow.",
      "If you notice any lifting, don't wait — getting it addressed early prevents damage.",
      "Amber will advise on the best timing for you at the end of each appointment.",
    ],
  },
];

export const ADMIN_PASSWORD = "treasured2024";
