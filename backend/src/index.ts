import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
const PORT = process.env.PORT || 7000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Test api response" });
});

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
