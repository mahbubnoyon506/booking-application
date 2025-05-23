const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
});

const hotelSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  facilities: [{ type: String, required: true }],
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageURLs: [{ type: String, required: true }],
  lastUpdated: [{ type: Date, required: true }],
  bookings: [bookingSchema],
});

const Hotel = mongoose.model("Hotels", hotelSchema);

module.exports = Hotel;
