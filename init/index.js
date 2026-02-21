const mongoose = require("mongoose")
const Listing = require("../models/Listing")
const { data } = require("./data")

mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
.then(() => console.log("Mongo Connected"))

const initDB = async () => {
  await Listing.deleteMany({})
  await Listing.insertMany(data)
  console.log("Data Initialized")
}

initDB()