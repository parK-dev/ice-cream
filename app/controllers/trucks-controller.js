const mongoose = require("mongoose");
const HttpError = require("../models/http-error");

const Truck = require("../models/truck");
const getInventory = require("../utils/inventory");

const createTruck = async (req, res, next) => {
  try {
    const { franchiseName, owner } = req.body;
    const truck = new Truck({
      franchiseName,
      owner,
      earnings: 0,
    });
    await truck.save();
    res.status(201).send({ truck });
  } catch (error) {
    return next(new HttpError("Failed to save to the database", 500));
  }
};

const getTruckInfo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const truck = await Truck.findById(id);
    const inventory = await getInventory(id);
    res.status(200).json({ truck, inventory });
  } catch (error) {
    throw new HttpError("Truck not found", 401);
  }
};

exports.createTruck = createTruck;
exports.getTruckInfo = getTruckInfo;
