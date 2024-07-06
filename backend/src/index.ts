import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouters from "./routes/users";
import authRouters from "./routes/auth";
import hotelRouters from "./routes/my-hotels";
import hotelRoute from "./routes/hotels";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRouters);
app.use("/api/users", userRouters);
app.use("/api/my-hotels", hotelRouters);
app.use("/api/hotels", hotelRoute);

app.use("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../fontent/dist/index.html"));
});

app.get("/api/test", async (_req: Request, res: Response) => {
  res.json({ message: "hello test" });
});

app.listen(7000, () => {
  console.log("Server running on port 7000");
});
