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

      const imageURLs = await uploadImages(imageFiles);

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

// "/api/my-hotels/id"
router.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    return res.json(hotel);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching hotel" });
  }
});

router.put(
  "/:id",
  verifyToken,
  upload.array("imageFiles"),
  async (req, res) => {
    try {
      const updatedHotel = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const files = req.files;
      const updatedImageUrls = await uploadImages(files);
      hotel.imageURLs = [
        ...updatedImageUrls,
        ...(updatedHotel.imageURLs || []),
      ];

      await hotel.save();
      return res.status(201).json(hotel);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

//Upload image to cloudinary
async function uploadImages(imageFiles) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });

  const imageURLs = await Promise.all(uploadPromises);
  return imageURLs;
}

module.exports = router;
