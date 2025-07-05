import Product from "../models/ProductSchema.js";

//POST /api/admin/products
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      originalPrice,
      discountedPrice,
      quantity,
      image,
      inStock,
      totalSales,
      totalRevenue
    } = req.body;
    console.log("IncomingData:\n", JSON.stringify(req.body, null, 2));

   if (
  name?.trim() === "" ||
  description?.trim() === "" ||
  category?.trim() === "" ||
  image?.trim() === "" ||
  originalPrice === undefined ||
  discountedPrice === undefined ||
  quantity === undefined ||
  inStock === undefined ||
  totalSales === undefined ||
  totalRevenue === undefined
) {
  return res.status(400).json({ error: "All fields are required" });
}
     const product = await Product.create({
      name,
      description,
      category,
      originalPrice: parseFloat(originalPrice),
      discountedPrice: parseFloat(discountedPrice),
      quantity: parseInt(quantity),
      image, 
      inStock,
      totalSales,
      totalRevenue
    });
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//GET /api/admin/products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      alert.error("No products found");
      return res.status(404).json({ error: "No products found" });
    }
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//GET /api/admin/products/:id
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      alert.error("Product not found");
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//PUT /api/admin/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      alert.error("Product not found");
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//DELETE /api/admin/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      alert.error("Product not found");
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
