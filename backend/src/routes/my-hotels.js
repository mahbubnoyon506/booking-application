const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Hotel = require("../models/hotel");
const { verifyToken } = require("../middleware/auth");
const { body } = require("express-validator");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// "/api/my-hotels"
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be is number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req, res) => {
    try {
      const imageFiles = req.files;
      const newHotel = req.body;

      //Upload image to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        const dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.url;
      });

      const imageURLs = await Promise.all(uploadPromises);
      newHotel.imageURLs = imageURLs;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();
      return res.status(201).json(hotel);
    } catch (error) {
      console.log("Error creating hotel", error);
      return res.status(500).json({ message: error });
    }
  }
);

// "/api/my-hotels"
router.get("/", verifyToken, async (req, res) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    return res.json(hotels);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching hotels" });
  }
});

module.exports = router;
