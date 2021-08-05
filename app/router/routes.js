const express = require("express");

const trucksController = require("../controllers/trucks-controller");
const productsController = require("../controllers/products-controller");
const router = new express.Router();

router.get("/truck/:id", trucksController.getTruckInfo);
router.post("/truck/:id/newProduct", productsController.createProduct);
router.post("/truck/create", trucksController.createTruck);
router.post("/truck/:id/buy", productsController.buyProduct);

module.exports = router;
