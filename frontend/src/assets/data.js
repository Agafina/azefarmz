import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import { assets, menu_list } from "./assets";

export const navbarItems = [
  { name: "Home", path: "/", id: "home" },
  { name: "About Us", path: "/about-us", id: "about-us" },
  { name: "Products", path: "/products", id: "products" },
  { name: "Shop", path: "/shop", id: "shop-online" },
  { name: "Contact", path: "/contact", id: "contact-us", external: true },
];

export const contact = [
  {
    type: "phone",
    value: "+237 677583458",
    icon: <Phone size={20} />,
    link: `tel:+237677583458`,
  },
  {
    type: "email",
    value: "info@azefarms.com",
    icon: <Mail size={20} />,
    link: `mailto:info@azefarms.com`,
  },
  {
    type: "address",
    value: "Republic of Cameroon",
    icon: <MapPin size={20} />,
    link: `https://www.google.com/maps/search/?api=1&query=Republic+of+Cameroon`,
  },
];

export const footerLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Products", path: "/products" },
  { name: "Shop Online", path: "/shop" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms & Conditions", path: "/terms" },
];

export const socialMediaLinks = [
  {
    name: "Facebook",
    icon: <Facebook size={24} />,
    link: "https://facebook.com/azefarms",
  },
  {
    name: "Twitter",
    icon: <Twitter size={24} />,
    link: "https://twitter.com/azefarms",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={24} />,
    link: "https://linkedin.com/company/azefarms",
  },
];

export const banner = {
  title: "Your Gateway to Sustainable and Nutritious Agricultural Products!",
  description:
    "Experience the best of eco-friendly farming. From fresh produce to value-added products, we deliver quality and sustainability for a healthier tomorrow.",
  buttons: [
    { text: "Explore Products", link: "/products" },
    { text: "Get Started", link: "/get-started" },
  ],
  image: assets.header_img,
};

export const introduction = {
  title: "Our Mission & Values",
  mission:
    "At Aze Farms, we are committed to sustainable agriculture that balances profitability with environmental stewardship. Our mission is to deliver eco-friendly, nutritious produce while fostering food security and community development. Join us in creating a healthier planet and a brighter future.",
  image: assets.logo1,
  values: [
    {
      title: "Sustainability",
      description:
        "We prioritize eco-friendly farming practices to preserve our environment for future generations.",
    },
    {
      title: "Quality",
      description:
        "Our produce is crafted with care and adheres to the highest standards of freshness and nutrition.",
    },
    {
      title: "Innovation",
      description:
        "We embrace modern agricultural techniques to enhance productivity and efficiency while maintaining sustainability.",
    },
    {
      title: "Community Development",
      description:
        "We aim to support local communities by creating jobs, fostering growth, and contributing to food security.",
    },
    {
      title: "Integrity",
      description:
        "We operate with transparency and honesty in all our dealings, ensuring trust with our stakeholders.",
    },
  ],
};

export const featuredProducts = [
  {
    name: "Honey Jars",
    description:
      "Available in various sizes, our pure, raw honey is packed with nutrients to support your health.",
    image: assets.menu_1,
    link: "/shop/honey",
  },
  {
    name: "Cassava Flour",
    description:
      "High-quality packaged cassava flour, perfect for creating traditional and modern dishes.",
    image: assets.menu_2,
    link: "/shop/cassava",
  },
  {
    name: "Seasonal Vegetable Baskets",
    description:
      "Freshly harvested seasonal vegetables, delivered in beautifully curated baskets.",
    image: assets.menu_3,
    link: "/shop/vegetables",
  },
  {
    name: "Pure Palm Oil Bottles",
    description:
      "Sustainably produced, our pure palm oil is perfect for cooking and more.",
    image: assets.menu_4,
    link: "/shop/palm-oil",
  },
];

export const ctaContent = {
  title: "Your Farm-Fresh Favorites Await!",
  description:
    "Discover a variety of sustainable, nutritious, and delicious products directly from our farm. Shop now or explore our offerings!",
  buttons: [
    {
      text: "Shop Online",
      link: "/shop",
      style: "primary",
    },
    {
      text: "Explore Products",
      link: "/products",
      style: "secondary",
    },
  ],
};

export const productCategories = [
  "Honey",
  "Cassava",
  "Vegetables",
  "Palm Oil",
  "Plantains",
  "Eucalyptus",
];

export const products = [
  {
    id: 1,
    _id: "64b6f87a2c4f3a9b6a0e4d1a",
    name: "Pure Honey",
    description: "Pure, raw, and packed with nutrients to support your health.",
    price: 15.99,
    category: "Honey",
    image: assets.menu_1,
  },
  {
    id: 2,
    _id: "64b6f87a2c4f3a9b6a0e4d1b",
    name: "Ripe Plantains",
    description:
      "Sweet and tender ripe plantains, perfect for frying or baking.",
    price: 12.99,
    category: "Plantains",
    image: assets.menu_2,
  },
  {
    id: 15,
    _id: "64b6f87a2c4f3a9b6a0e4d1c",
    name: "Unripe Plantains",
    description: "Firm and starchy unripe plantains, ideal for savory dishes.",
    price: 11.99,
    category: "Plantains",
    image: assets.menu_3,
  },
  {
    id: 3,
    _id: "64b6f87a2c4f3a9b6a0e4d1d",
    name: "Sweet Pineapples",
    description: "Sweet, juicy, and naturally ripened pineapples.",
    price: 10.99,
    category: "Vegetables",
    image: assets.menu_3,
  },
  {
    id: 4,
    _id: "64b6f87a2c4f3a9b6a0e4d1f",
    name: "Cassava Flour",
    description:
      "High-quality cassava flour, perfect for your favorite dishes.",
    price: 8.99,
    category: "Cassava",
    image: assets.menu_4,
  },
  {
    id: 5,
    _id: "64b6f87a2c4f3a9b6a0e4d1g",
    name: "Garri",
    description: "Premium garri, ideal for traditional meals and snacks.",
    price: 6.99,
    category: "Cassava",
    image: assets.menu_1,
  },
  {
    id: 6,
    _id: "64b6f87a2c4f3a9b6a0e4d1i",
    name: "Tomatoes",
    description: "Freshly picked, ripe tomatoes for your kitchen.",
    price: 2.99,
    category: "Vegetables",
    image: assets.menu_2,
  },
  {
    id: 7,
    _id: "64b6f87a2c4f3a9b6a0e4d1j",
    name: "Carrots",
    description: "Crunchy, vibrant carrots, freshly harvested.",
    price: 3.99,
    category: "Vegetables",
    image: assets.menu_3,
  },
  {
    id: 8,
    _id: "64b6f87a2c4f3a9b6a0e4d1k",
    name: "Spinach",
    description: "Fresh and nutritious spinach leaves.",
    price: 4.99,
    category: "Vegetables",
    image: assets.menu_4,
  },
  {
    id: 9,
    _id: "64b6f87a2c4f3a9b6a0e4d1l",
    name: "Okra",
    description: "Tender and flavorful okra, perfect for soups.",
    price: 5.99,
    category: "Vegetables",
    image: assets.menu_1,
  },
  {
    id: 10,
    _id: "64b6f87a2c4f3a9b6a0e4d1m",
    name: "Beans",
    description: "High-quality legumes, packed with protein and fiber.",
    price: 6.99,
    category: "Vegetables",
    image: assets.menu_2,
  },
  {
    id: 11,
    _id: "64b6f87a2c4f3a9b6a0e4d1n",
    name: "Pure Palm Oil",
    description: "Sustainably produced oil for cooking and more.",
    price: 14.99,
    category: "Palm Oil",
    image: assets.menu_3,
  },
  {
    id: 12,
    _id: "64b6f87a2c4f3a9b6a0e4d1o",
    name: "Eucalyptus Essential Oils",
    description:
      "Natural essential oils extracted from eucalyptus, perfect for relaxation.",
    price: 19.99,
    category: "Eucalyptus",
    image: assets.menu_4,
  },
  {
    id: 13,
    _id: "64b6f87a2c4f3a9b6a0e4d1p",
    name: "Handcrafted Furniture",
    description:
      "Beautifully handcrafted furniture made from sustainable eucalyptus wood.",
    price: 99.99,
    category: "Eucalyptus",
    image: assets.menu_1,
  },
  {
    id: 14,
    name: "Eucalyptus Crafts",
    _id: "64b6f87a2c4f3a9b6a0e4d1q",
    description: "Unique crafts made from eucalyptus materials.",
    price: 24.99,
    category: "Eucalyptus",
    image: assets.menu_2,
  },
];


export const companyHistory = {
  title: "Our Journey",
  content: [
    "Since its inception, Aze Farms has been at the forefront of sustainable agriculture. From humble beginnings as a small family farm, we have grown into a trusted name in providing fresh and eco-friendly produce.",
    "Over the years, we have embraced innovation and community-focused practices, ensuring that our operations benefit both the environment and the people we serve. Join us as we continue our journey toward a greener, healthier future.",
  ],
};

export const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "John Smith",
    role: "Farm Manager",
    image: "https://i.pravatar.cc/150?img=18",
  },
  {
    name: "Emily Davis",
    role: "Marketing Head",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Michael Brown",
    role: "Operations Lead",
    image: "https://i.pravatar.cc/150?img=47",
  },
];

export const contactInfo = {
  address: "123 Aze Farms Lane, Greenfield",
  phone: "(123) 456-7890",
  email: "contact@azefarms.com",
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "Twitter", url: "https://twitter.com" },
  ],
  header: {
    title: "Contact Us",
    description:
      "Have questions or need assistance? Reach out to us using the information below or fill out the contact form.",
  },
  formInputs: [
    { type: "text", placeholder: "Your Name", required: true },
    { type: "email", placeholder: "Your Email", required: true },
    { type: "textarea", placeholder: "Your Message", rows: 5, required: true },
  ],
};
