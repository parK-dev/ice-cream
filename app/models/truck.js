const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const truckSchema = new Schema({
  franchiseName: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  earnings: { type: Number, required: true, default: 0 },
});

truckSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Truck", truckSchema);
