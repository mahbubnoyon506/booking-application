const express = require("express");
const Hotel = require("../models/hotel");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });
    console.log(hotels);

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hotelWithUserBookings = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });
    console.log(results);

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

router.get("/booking", verifyToken, async (req, res) => {
  try {
    const hotels = await Hotel.find({ "bookings.userId": req.userId });

    const userBookings = [];
    hotels.forEach((hotel) => {
      hotel.bookings.forEach((booking) => {
        if (booking.userId === req.userId) {
          userBookings.push({
            ...booking.toObject(),
            hotel: {
              _id: hotel._id,
              name: hotel.name,
              city: hotel.city,
              country: hotel.country,
              imageURLs: hotel.imageURLs,
              pricePerNight: hotel.pricePerNight,
              starRating: hotel.starRating,
              type: hotel.type,
            },
          });
        }
      });
    });

    res.json({ data: userBookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
