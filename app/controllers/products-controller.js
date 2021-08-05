const mongoose = require("mongoose");
const HttpError = require("../models/http-error");

const Truck = require("../models/truck");
const Product = require("../models/product");

const createProduct = async (req, res, next) => {
  const truckId = req.params.id;
  const { name, price, stock } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      stock,
      truckId,
    });
    await newProduct.save();
    res.status(201).json({ newProduct });
  } catch (error) {
    return next(new HttpError("Could not save to the database", 500));
  }
};

const buyProduct = async (req, res, next) => {
  const id = req.params.id;
  const { productName, quantity } = req.body;
  try {
    const product = await Product.findOne({ name: productName, truckId: id });
    const truck = await Truck.findById(id);
    if (!product || !truck) {
      throw new Error();
    }
    if (product.stock < quantity) {
      res.status(422).json({ message: "SO SORRY! We're out of stock..." });
    }
    truck.earnings += product.price * quantity;
    product.stock -= quantity;
    const session = await mongoose.startSession();
    session.startTransaction();
    await truck.save({ session });
    await product.save({ session });
    await session.commitTransaction();
    res.status(201).json({ message: "ENJOY!", truck, product });
  } catch (error) {
    return next(new HttpError("Could not find item.", 401));
  }
};

exports.buyProduct = buyProduct;
exports.createProduct = createProduct;
