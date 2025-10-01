const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/myshop", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});

const Product = mongoose.model("Product", productSchema);

// CRUD Routes
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

app.delete("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted", product });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
