import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { assets } from "./assets";

export const navbar = {
  items: [
    { name: "navbarItems.home", path: "/", id: "home" },
    { name: "navbarItems.aboutUs", path: "/about-us", id: "about-us" },
    { name: "navbarItems.products", path: "/products", id: "products" },
    { name: "navbarItems.shop", path: "/shop", id: "shop-online" },
    {
      name: "navbarItems.contact",
      path: "/contact",
      id: "contact-us",
      external: true,
    },
  ],
  profile: [
    { name: "profile.orders", path: "/myorders", id: "orders" },
    { name: "profile.logout", action: "logout", id: "logout" },
  ],
  auth: [{ name: "auth.signIn", path: "/signin", id: "signin" }],
};

export const contactInfo = {
  header: {
    title: "contact.header.title",
    description: "contact.header.description",
  },
  address: "contact.address.value", // This will be translated from en.json or fr.json
  phone: "contact.phone.value",
  email: "contact.email.value",
  socialLinks: [
    {
      platform: "Facebook",
      url: "https://www.facebook.com",
    },
    {
      platform: "Twitter",
      url: "https://www.twitter.com",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com",
    },
  ],
  formInputs: [
    {
      type: "text",
      placeholder: "contact.form.name",
      required: true,
    },
    {
      type: "email",
      placeholder: "contact.form.email",
      required: true,
    },
    {
      type: "textarea",
      placeholder: "contact.form.message",
      rows: 4,
      required: true,
    },
  ],
};

export const contact = [
  {
    type: "phone",
    label: "contact.phone.label",
    value: "+237 677583458",
    icon: <Phone size={20} />,
    link: `tel:+237677583458`,
  },
  {
    type: "email",
    label: "contact.email.label",
    value: "info@azefarms.com",
    icon: <Mail size={20} />,
    link: `mailto:info@azefarms.com`,
  },
  {
    type: "address",
    label: "contact.address.label",
    value: "Republic of Cameroon",
    icon: <MapPin size={20} />,
    link: `https://www.google.com/maps/search/?api=1&query=Republic+of+Cameroon`,
  },
];

export const footer = {
  description: "footer.description",
  socialMediaLinks: [
    {
      name: "Facebook",
      link: "https://www.facebook.com",
      icon: <Facebook size={24} />,
    },
    {
      name: "Twitter",
      link: "https://www.twitter.com",
      icon: <Twitter size={24} />,
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com",
      icon: <Instagram size={24} />,
    },
  ],
  footerLinks: [
    { name: "footer.footerLinks.home", path: "/" },
    { name: "footer.footerLinks.aboutUs", path: "/about-us" },
    { name: "footer.footerLinks.products", path: "/products" },
    { name: "footer.footerLinks.shop", path: "/shop" },
    { name: "footer.footerLinks.privacyPolicy", path: "/privacy-policy" },
    { name: "footer.footerLinks.terms", path: "/terms" },
  ],
  contact: [
    {
      type: "phone",
      label: "footer.contact.phone",
      value: "+237 677583458",
      link: "tel:+237677583458",
    },
    {
      type: "email",
      label: "footer.contact.email",
      value: "info@azefarms.com",
      link: "mailto:info@azefarms.com",
    },
    {
      type: "address",
      label: "footer.contact.address",
      value: "Republic of Cameroon",
      link: "https://www.google.com/maps",
    },
  ],
  titles: {
    followUs: "footer.followUs",
    company: "footer.company",
    getInTouch: "footer.getInTouch",
  },
};

export const banner = {
  title: "banner.title",
  description: "banner.description",
  buttons: [
    { text: "banner.buttons.explore", link: "/products" },
    { text: "banner.buttons.getStarted", link: "/get-started" },
  ],
  image: assets.header_img,
};

export const introduction = {
  title: "introduction.title",
  mission: "introduction.mission",
  image: assets.logo1,
  valuesTitle: "introduction.valuesTitle",
  values: [
    {
      title: "introduction.values.sustainability.title",
      description: "introduction.values.sustainability.description",
    },
    {
      title: "introduction.values.quality.title",
      description: "introduction.values.quality.description",
    },
    {
      title: "introduction.values.innovation.title",
      description: "introduction.values.innovation.description",
    },
    {
      title: "introduction.values.communityDevelopment.title",
      description: "introduction.values.communityDevelopment.description",
    },
    {
      title: "introduction.values.integrity.title",
      description: "introduction.values.integrity.description",
    },
  ],
};

export const featuredProducts = [
  {
    name: "products.honeyJars.name",
    description: "products.honeyJars.description",
    image: assets.menu_1,
    link: "/shop/honey",
  },
  {
    name: "products.cassavaFlour.name",
    description: "products.cassavaFlour.description",
    image: assets.menu_2,
    link: "/shop/cassava",
  },
  {
    name: "products.seasonalVegetableBaskets.name",
    description: "products.seasonalVegetableBaskets.description",
    image: assets.menu_3,
    link: "/shop/vegetables",
  },
  {
    name: "products.purePalmOilBottles.name",
    description: "products.purePalmOilBottles.description",
    image: assets.menu_4,
    link: "/shop/palm-oil",
  },
];

export const ctaContent = {
  title: "cta.title",
  description: "cta.description",
  buttons: [
    {
      text: "cta.buttons.shopOnline.text",
      link: "/shop",
      style: "primary",
    },
    {
      text: "cta.buttons.exploreProducts.text",
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
    price: 1500,
    category: "Honey",
    image: assets.menu_1,
    unit: "500g",
  },
  {
    id: 2,
    _id: "64b6f87a2c4f3a9b6a0e4d1b",
    name: "Ripe Plantains",
    description:
      "Sweet and tender ripe plantains, perfect for frying or baking.",
    price: 1200,
    category: "Plantains",
    unit: "per bunch",
    image: assets.menu_2,
  },
  {
    id: 15,
    _id: "64b6f87a2c4f3a9b6a0e4d1c",
    name: "Unripe Plantains",
    description: "Firm and starchy unripe plantains, ideal for savory dishes.",
    price: 1100,
    category: "Plantains",
    unit: "per bunch",
    image: assets.menu_3,
  },
  {
    id: 3,
    _id: "64b6f87a2c4f3a9b6a0e4d1d",
    name: "Sweet Pineapples",
    description: "Sweet, juicy, and naturally ripened pineapples.",
    price: 1000,
    category: "Vegetables",
    unit: "per piece",
    image: assets.menu_3,
  },
  {
    id: 4,
    _id: "64b6f87a2c4f3a9b6a0e4d1f",
    name: "Cassava Flour",
    description:
      "High-quality cassava flour, perfect for your favorite dishes.",
    price: 800,
    category: "Cassava",
    unit: "1kg",
    image: assets.menu_4,
  },
  {
    id: 5,
    _id: "64b6f87a2c4f3a9b6a0e4d1g",
    name: "Garri",
    description: "Premium garri, ideal for traditional meals and snacks.",
    price: 600,
    category: "Cassava",
    unit: "1kg",
    image: assets.menu_1,
  },
  {
    id: 6,
    _id: "64b6f87a2c4f3a9b6a0e4d1i",
    name: "Tomatoes",
    description: "Freshly picked, ripe tomatoes for your kitchen.",
    price: 200,
    category: "Vegetables",
    unit: "1kg",
    image: assets.menu_2,
  },
  {
    id: 7,
    _id: "64b6f87a2c4f3a9b6a0e4d1j",
    name: "Carrots",
    description: "Crunchy, vibrant carrots, freshly harvested.",
    price: 300,
    category: "Vegetables",
    unit: "1kg",
    image: assets.menu_3,
  },
  {
    id: 8,
    _id: "64b6f87a2c4f3a9b6a0e4d1k",
    name: "Spinach",
    description: "Fresh and nutritious spinach leaves.",
    price: 400,
    category: "Vegetables",
    unit: "per bunch",
    image: assets.menu_4,
  },
  {
    id: 9,
    _id: "64b6f87a2c4f3a9b6a0e4d1l",
    name: "Okra",
    description: "Tender and flavorful okra, perfect for soups.",
    price: 500,
    category: "Vegetables",
    unit: "1kg",
    image: assets.menu_1,
  },
  {
    id: 10,
    _id: "64b6f87a2c4f3a9b6a0e4d1m",
    name: "Beans",
    description: "High-quality legumes, packed with protein and fiber.",
    price: 600,
    category: "Vegetables",
    unit: "1kg",
    image: assets.menu_2,
  },
  {
    _id: "64b6f87a2c4f3a9b6a0e4d1n",
    name: "Pure Palm Oil",
    description: "Sustainably produced oil for cooking and more.",
    price: 1400,
    category: "Palm Oil",
    unit: "1 Litre",
    image: assets.menu_3,
  },
  {
    id: 12,
    _id: "64b6f87a2c4f3a9b6a0e4d1o",
    name: "Eucalyptus Essential Oils",
    description:
      "Natural essential oils extracted from eucalyptus, perfect for relaxation.",
    price: 1900,
    category: "Eucalyptus",
    unit: "100ml",
    image: assets.menu_4,
  },
  {
    id: 13,
    _id: "64b6f87a2c4f3a9b6a0e4d1p",
    name: "Handcrafted Furniture",
    description:
      "Beautifully handcrafted furniture made from sustainable eucalyptus wood.",
    price: 9900,
    category: "Eucalyptus",
    unit: "per item",
    image: assets.menu_1,
  },
  {
    id: 14,
    name: "Eucalyptus Crafts",
    _id: "64b6f87a2c4f3a9b6a0e4d1q",
    description: "Unique crafts made from eucalyptus materials.",
    price: 2400,
    category: "Eucalyptus",
    unit: "per item",
    image: assets.menu_2,
  },
];

export const companyHistory = {
  title: "companyHistory.title",
  content: [
    "companyHistory.content.paragraph1",
    "companyHistory.content.paragraph2",
  ],
};

export const team = {
  title: "team.title",
  members: [
    {
      name: "team.members.jane.name",
      role: "team.members.jane.role",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "team.members.john.name",
      role: "team.members.john.role",
      image: "https://i.pravatar.cc/150?img=18",
    },
    {
      name: "team.members.emily.name",
      role: "team.members.emily.role",
      image: "https://i.pravatar.cc/150?img=32",
    },
    {
      name: "team.members.michael.name",
      role: "team.members.michael.role",
      image: "https://i.pravatar.cc/150?img=47",
    },
  ],
};

export const sustainability = {
  title: "sustainability.title",
  description: "sustainability.description",
  sections: {
    environmental: {
      title: "sustainability.sections.environmental.title",
      content: [
        "sustainability.sections.environmental.content.0",
        "sustainability.sections.environmental.content.1",
        "sustainability.sections.environmental.content.2",
        "sustainability.sections.environmental.content.3",
        "sustainability.sections.environmental.content.4",
      ],
    },
    economic: {
      title: "sustainability.sections.economic.title",
      content: [
        "sustainability.sections.economic.content.0",
        "sustainability.sections.economic.content.1",
        "sustainability.sections.economic.content.2",
      ],
    },
    social: {
      title: "sustainability.sections.social.title",
      content: [
        "sustainability.sections.social.content.0",
        "sustainability.sections.social.content.1",
        "sustainability.sections.social.content.2",
        "sustainability.sections.social.content.3",
        "sustainability.sections.social.content.4",
      ],
    },
  },
  benefits: {
    title: "sustainability.title",
    list: [
      "sustainability.benefits.list.0",
      "sustainability.benefits.list.1",
      "sustainability.benefits.list.2",
      "sustainability.benefits.list.3",
    ],
  },
  cta: {
     title: "sustainability.cta.title",
     content: "sustainability.cta.content",
     button: "sustainability.cta.button",
     },
  contact: {
    email: "sustainability.contact.email",
    website: "sustainability.contact.website",
  },
};
