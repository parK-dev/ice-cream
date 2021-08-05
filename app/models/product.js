const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  truckId: { type: mongoose.Types.ObjectId, required: true, ref: "Truck" },
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Product", productSchema);
