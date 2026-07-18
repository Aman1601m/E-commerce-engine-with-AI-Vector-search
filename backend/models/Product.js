import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // ==========================
    // Basic Information
    // ==========================
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    // ==========================
    // Pricing
    // ==========================
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    // ==========================
    // Inventory
    // ==========================
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
    },

    // ==========================
    // Media
    // ==========================
    thumbnail: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    // ==========================
    // Search
    // ==========================
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    embedding: {
      type: [Number],
      default: [],
    },

    // ==========================
    // Ratings
    // ==========================
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // ==========================
    // Analytics
    // ==========================
    views: {
      type: Number,
      default: 0,
    },

    salesCount: {
      type: Number,
      default: 0,
    },

    // ==========================
    // Product Status
    // ==========================
    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    // ==========================
    // SEO
    // ==========================
    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  category: "text",
  tags: "text",
});

const Product = mongoose.model("Product", productSchema);

export default Product;