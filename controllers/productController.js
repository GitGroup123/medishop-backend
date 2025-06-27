import mongoose from 'mongoose';
import Product from '../models/Product.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categories').populate('tags');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    console.log("📥 Incoming product save request...");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      name,
      type,
      shortDesc,
      description,
      price,
      salePrice,
      categories,
      tags,
      variations
    } = req.body;

    // Parse variations if sent as string
    const parsedVariations = variations ? JSON.parse(variations) : [];

    const mainImage = req.files?.mainImage?.[0]?.filename || '';
    const galleryImages = req.files?.gallery?.map((f) => f.filename) || [];
    const variationImages = req.files?.variationImages || [];

    // Attach images to the variation objects
    const finalVariations = parsedVariations.map((variant, i) => ({
      ...variant,
      image: variationImages[i]?.filename || null
    }));

    const newProduct = new Product({
      name,
      type,
      shortDesc,
      description,
      price,
      salePrice,
      categories: JSON.parse(categories || '[]'),
      tags: JSON.parse(tags || '[]'),
      image: mainImage,
      gallery: galleryImages,
      variations: finalVariations
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Product creation failed:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    console.log("✏️ Updating product...");
    const {
      name,
      type,
      shortDesc,
      description,
      price,
      salePrice,
      categories,
      tags,
      variations
    } = req.body;

    const parsedCategories = JSON.parse(categories || '[]');
    const parsedTags = JSON.parse(tags || '[]');
    const parsedVariations = variations ? JSON.parse(variations) : [];

    const mainImage = req.files?.mainImage?.[0]?.filename;
    const galleryImages = req.files?.gallery?.map((f) => f.filename);
    const variationImages = req.files?.variationImages || [];

    const finalVariations = parsedVariations.map((variant, i) => ({
      ...variant,
      image: variationImages[i]?.filename || variant.image || null,
    }));

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        type,
        shortDesc,
        description,
        price,
        salePrice,
        categories: parsedCategories,
        tags: parsedTags,
        ...(mainImage && { image: mainImage }),
        ...(galleryImages && { gallery: galleryImages }),
        variations: finalVariations,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Product update failed:", error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const categoryId = new mongoose.Types.ObjectId(req.params.id); 
    const products = await Product.find({
      categories: { $in: [categoryId] }
    });

    res.json(products);
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: 'Server error' });
  }
};