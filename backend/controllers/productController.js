const Product = require("../models/Product");
const { generateEmbedding } = require("../services/vectorSearchService");

// ==============================
// Create Product
// ==============================
const createProduct = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Generate AI Vector Embedding locally!
    let embedding = [];
    if (name && description) {
      embedding = await generateEmbedding(`${name} ${description}`);
    }

    const product = await Product.create({
      ...req.body,
      embedding,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully with AI Vector Embedding!",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Products
// ==============================
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isDeleted: false,
    }).populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Single Product
// ==============================
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!product || product.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};