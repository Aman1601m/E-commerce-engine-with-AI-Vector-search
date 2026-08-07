import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Air Max Pulse Retro",
    slug: "air-max-pulse-retro",
    description: "The classic sneaker reimagined with modern tech.",
    brand: "Nike",
    category: "Sneakers",
    sku: "NK-AMPR-01",
    price: 10999,
    discountPrice: 8999,
    currency: "INR",
    stock: 50,
    thumbnail: "/assets/sneaker.png",
    images: ["/assets/sneaker.png"],
    tags: ["sneaker", "shoes", "nike", "retro"],
    averageRating: 4.8,
    totalReviews: 124,
    isFeatured: true,
  },
  {
    name: "Series 9 Smartwatch",
    slug: "series-9-smartwatch",
    description: "The ultimate health and fitness companion.",
    brand: "Apple",
    category: "Watches",
    sku: "APL-S9-01",
    price: 41900,
    currency: "INR",
    stock: 200,
    thumbnail: "/assets/watch.png",
    images: ["/assets/watch.png"],
    tags: ["watch", "smartwatch", "apple", "tech"],
    averageRating: 4.9,
    totalReviews: 856,
    isFeatured: true,
  },
  {
    name: "Quantum Over-Ear Pro",
    slug: "quantum-over-ear-pro",
    description: "High fidelity wireless noise cancelling headphones.",
    brand: "Sony",
    category: "Headphones",
    sku: "SNY-QOEP-01",
    price: 24990,
    discountPrice: 21990,
    currency: "INR",
    stock: 120,
    thumbnail: "/assets/ecommerce_hero.png",
    images: ["/assets/ecommerce_hero.png"],
    tags: ["audio", "headphones", "sony", "music"],
    averageRating: 4.7,
    totalReviews: 342,
    isFeatured: true,
  },
  {
    name: "Galaxy Watch 6 Classic",
    slug: "galaxy-watch-6-classic",
    description: "Timeless design meets modern smart features.",
    brand: "Samsung",
    category: "Watches",
    sku: "SAM-GW6C-01",
    price: 36999,
    discountPrice: 29999,
    currency: "INR",
    stock: 80,
    thumbnail: "/assets/watch.png",
    images: ["/assets/watch.png"],
    tags: ["watch", "smartwatch", "samsung", "tech"],
    averageRating: 4.6,
    totalReviews: 412,
    isFeatured: true,
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");
    
    // Clear existing
    await Product.deleteMany();
    console.log("Products cleared");

    // Insert new
    await Product.insertMany(products);
    console.log("Products seeded successfully in INR");
    
    process.exit();
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
};

seedDB();
