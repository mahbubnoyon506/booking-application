const express = require("express");
const Hotel = require("../models/hotel");
const router = express.Router();

// "/api/hotels/search"
router.get("/search", async (req, res) => {
  try {
    pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;
    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments();
    const response = {
      data: hotels,
      pagination: {
        total,
        curentPage: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
