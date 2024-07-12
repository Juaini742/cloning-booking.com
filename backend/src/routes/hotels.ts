import Stripe from "stripe";
import mongoose from "mongoose";
import verifyToken from "../middleware/auth";
import express, { Request, Response } from "express";
import { Room, Hotel, Booking } from "../models/room";
import { param, validationResult } from "express-validator";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const createHotelFilter = (reqQuery: {
  destination?: string;
  starRating?: string;
  facilities?: string;
  type?: string;
}) => {
  const { destination, starRating, facilities, type } = reqQuery;
  let hotelFilter: {
    starRating?: number | string;
    $or?: any[];
    hotelFacilities?: { $all: RegExp[] };
    hotelType?: string;
  } = {};

  if (destination) {
    hotelFilter.$or = [
      { country: { $regex: destination, $options: "i" } },
      { city: { $regex: destination, $options: "i" } },
    ];
  }

  if (facilities) {
    const facilitiesArray = (facilities as string)
      .split(",")
      .map((facility) => facility.trim());
    hotelFilter.hotelFacilities = {
      $all: facilitiesArray.map((facility) => new RegExp(facility, "i")),
    };
  }

  if (type) {
    hotelFilter.hotelType = type;
  }
  if (starRating) {
    hotelFilter.starRating = starRating;
  }

  return hotelFilter;
};

const createRoomFilter = (reqQuery: {
  adultCount?: string;
  childCount?: string;
  facilities?: string;
  type?: string;
  maxPrice?: string;
}) => {
  const { adultCount, childCount, maxPrice } = reqQuery;
  let roomFilter: any = {};

  if (adultCount) {
    roomFilter.adultCount = { $gte: adultCount };
  }
  if (childCount) {
    roomFilter.childCount = { $gte: childCount };
  }
  if (maxPrice) {
    roomFilter.pricePerNight = { $lte: maxPrice };
  }

  return roomFilter;
};

router.get("/search", async (req: Request, res: Response) => {
  try {
    const { pricePerNightAsc, pricePerNightDesc } = req.query;

    const hotelFilter = createHotelFilter(req.query);
    const roomFilter = createRoomFilter(req.query);

    const hotels = await Hotel.find(hotelFilter)
      .populate({
        path: "rooms",
        match: roomFilter,
      })
      .exec();

    const filteredHotels = hotels.filter((hotel) => hotel.rooms.length > 0);

    filteredHotels.forEach((hotel: any) => {
      hotel.minPricePerNight = Math.min(
        ...hotel.rooms.map((room: any) => room.pricePerNight)
      );
      hotel.maxPricePerNight = Math.max(
        ...hotel.rooms.map((room: any) => room.pricePerNight)
      );
    });

    filteredHotels.sort((a: any, b: any) => {
      if (pricePerNightAsc === "true") {
        return a.minPricePerNight - b.minPricePerNight;
      } else if (pricePerNightDesc === "true") {
        return b.maxPricePerNight - a.maxPricePerNight;
      } else if (req.query.starRating) {
        return b.starRating - a.starRating;
      }
      return 0;
    });

    res.json(filteredHotels);
  } catch (error) {
    console.log("Error fetching hotels:", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get("/check-availability", async (req: Request, res: Response) => {
  try {
    const { hotelId, adultCount, childCount, checkIn, checkOut } = req.query;

    if (!hotelId || !adultCount || !childCount || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Incomplete query parameters" });
    }

    const parsedCheckIn = new Date(checkIn as string);
    const parsedCheckOut = new Date(checkOut as string);

    const hotel = await Hotel.findById(hotelId).populate("rooms").exec();
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const rooms = await Room.find({
      hotelId,
      adultCount: { $gte: Number(adultCount) },
      childCount: { $gte: Number(childCount) },
    }).exec();

    const availableRooms = [];

    for (const room of rooms) {
      const bookings = await Booking.find({
        roomId: room._id,
        $or: [
          {
            checkIn: { $lt: parsedCheckOut },
            checkOut: { $gt: parsedCheckIn },
          },
          {
            checkIn: { $lte: parsedCheckIn },
            checkOut: { $gte: parsedCheckOut },
          },
        ],
      }).exec();

      if (bookings.length === 0) {
        availableRooms.push(room);
      }
    }

    res.json({ availableRooms });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated").populate("rooms");
    res.json(hotels);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const hotel = await Hotel.findById(id).populate("rooms");
      res.json(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching hotel" });
    }
  }
);

router.get(
  "/room/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const room = await Room.findById(id);
      res.json(room);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching hotel" });
    }
  }
);

router.post(
  "/:roomId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    const { numberOfNights } = req.body;
    const roomId = req.params.roomId;

    try {
      const room = await Room.findById(roomId);

      if (!room) {
        return res.status(400).json({ message: "Room not found" });
      }

      const hotel = await Hotel.findById(room.hotelId);
      if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" });
      }

      const totalCost = room.pricePerNight * numberOfNights;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost * 100,
        currency: "USD",
        metadata: {
          roomId,
          userId: req.userId,
        },
      });

      if (!paymentIntent.client_secret) {
        return res
          .status(500)
          .json({ message: "Error creating payment intent" });
      }

      const response = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        totalCost,
      };

      res.json(response);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/:hotelId/bookings", verifyToken, async (req, res) => {
  try {
    const {
      paymentIntentId,
      firstName,
      lastName,
      email,
      adultCount,
      childCount,
      checkIn,
      checkOut,
      totalCost,
    } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return res.status(400).json({ message: "Payment intent not found" });
    }

    if (paymentIntent.metadata.userId !== req.userId) {
      return res.status(400).json({ message: "Payment intent mismatch" });
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `Payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }

    const newBooking = new Booking({
      firstName,
      lastName,
      email,
      adultCount,
      childCount,
      checkIn,
      checkOut,
      userId: new mongoose.Types.ObjectId(req.userId),
      hotelId: new mongoose.Types.ObjectId(req.params.hotelId),
      totalCost,
      paymentIntentId,
    });

    await newBooking.save();

    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId },
      {
        $push: { bookings: newBooking },
      }
    );

    if (!hotel) {
      return res.status(400).json({ message: "hotel not found" });
    }
    await hotel.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

export default router;
