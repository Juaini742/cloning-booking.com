import express, { Request, Response } from "express";
import multer from "multer";
const router = express.Router();
import cloudinary from "cloudinary";
import verifyToken from "../middleware/auth";
import { body, validationResult } from "express-validator";
import { HotelType, RoomType } from "../shared/types";
import { Hotel, Room } from "../models/room";
import mongoose from "mongoose";
import { validateHotelData } from "../middleware/validateHotelData";
import { validateRoomsData } from "../middleware/validateRoomsData";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// api/my-hotels
router.post(
  "/",
  verifyToken,
  upload.array("imageFiles", 6),
  validateHotelData,
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const hotelData: HotelType = req.body;

      console.log(imageFiles);
      console.log(hotelData);

      const imageUrls = await uploadedImages(imageFiles);
      hotelData.imageUrls = imageUrls;
      hotelData.lastUpdated = new Date();
      hotelData.userId = req.userId;

      const hotel = new Hotel(hotelData);
      await hotel.save();

      res.status(201).send(imageFiles);
    } catch (error) {
      console.error("Error creating hotel", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post(
  "/:hotelId/rooms",
  verifyToken,
  upload.array("imageFiles", 6),
  // validateRoomsData,
  async (req: Request, res: Response) => {
    try {
      const hotelId = req.params.hotelId;
      const hotel = await Hotel.findById(hotelId);

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      const imageFiles = req.files as Express.Multer.File[];

      const rooms: RoomType[] = req.body.rooms;

      const imageUrls = await uploadedImages(imageFiles);

      let imageUrlIndex = 0;
      const roomDocs = rooms.map((room) => {
        const roomImageUrls = imageUrls.slice(
          imageUrlIndex,
          imageUrlIndex + room.imageUrls.length
        );
        imageUrlIndex += room.imageUrls.length;
        return {
          ...room,
          hotelId: new mongoose.Types.ObjectId(hotelId),
          lastUpdated: new Date(),
          available: true,
          imageUrls: roomImageUrls,
        };
      });

      const createdRooms = await Room.insertMany(roomDocs);

      hotel.rooms.push(
        ...createdRooms.map(
          (room) => room._id as unknown as mongoose.Types.ObjectId
        )
      );
      await hotel.save();
      res.status(201).send(rooms);
    } catch (error) {
      console.error("Error creating room", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId }).populate("rooms");
    res.json(hotels);
  } catch (error) {
    res.status(500).json("Error fetching hotels");
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findById({
      _id: id,
      userId: req.userId,
    });

    res.json(hotel);
  } catch (error) {
    res.status(500).json("Error fetching hotels");
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json("Hotel not found");
      }
      const files = req.files as Express.Multer.File[];

      const updatedImageUrls = await uploadedImages(files);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];

      await hotel.save();

      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json("Error fetching hotels");
    }
  }
);

async function uploadedImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
