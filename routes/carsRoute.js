const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");
const User = require("../models/userModel");

router.get("/mycars", async (req, res) => {
  const userDetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  const userD = await User.findById({ _id: userDetails._id });
  console.log(userD._id)
  try {
    if(userD){
      const cars = await Car.find({ uploadedBy: userD._id });
      if (!cars) {
        res.send("No  Cars Found!");
      }
      res.send(cars);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    // console.log(cars)
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcar", async (req, res) => {
  const userDetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  let body = {...req.body,uploadedBy:userDetails._id}
  try {
    const newcar = new Car(body);
    await newcar.save();
    res.send("Car added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;
    car.city = req.body.city;

    await car.save();

    res.send("Car details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
