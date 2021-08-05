const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Product = require("../models/product");

const getInventory = async (truckId) => {
  try {
    const products = await Product.find({ truckId });
    const inventory = {};
    products.forEach((product) => {
      inventory[product.name] = product.stock;
    });
    return inventory;
  } catch (error) {
    throw new HttpError("Truck not found", 401);
  }
};

module.exports = getInventory;
