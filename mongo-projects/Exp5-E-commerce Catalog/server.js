const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String,
}, { _id: false });

const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  price: Number,
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  variants: [variantSchema],
  reviews: [reviewSchema],
  specifications: {
    brand: String,
    model: String,
    warranty: String
  }
});

const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

app.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.delete("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted", product });
});

app.put("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ message: "Product updated", product });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
