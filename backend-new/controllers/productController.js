const productModel = require("../models/Product");
const fs = require("fs");

// Add Product
const addProduct = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    unit: req.body.unit,
    category: req.body.category,
    stock: req.body.stock,
    image: image_filename,
  });

  try {
    await product.save();
    res.json({ success: true, mssg: "Product Added" });
  } catch (error) {
    res.json({ success: false, mssg: error });
  }
};

// List Products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mssg: error });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  const { id } = req.body;

  try {
    const product = await productModel.findById(id);
    fs.unlink(`uploads/${product.image}`, (err) => {
      if (err) {
        console.log("Error in deleting image", err);
      }
    });

    await productModel.findByIdAndDelete(id);
    res.json({ success: true, mssg: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mssg: error });
  }
};

module.exports = {
  addProduct,
  listProducts,
  removeProduct,
};
