import mongoose from "mongoose";
import { BookingType, HotelType, RoomType } from "../shared/types";

const roomSchema = new mongoose.Schema<RoomType>({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  roomNumber: { type: String, required: true },
  type: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  description: { type: String, required: true },
  imageUrls: [{ type: String, required: true, default: null }],
  available: { type: Boolean, required: true, default: true },
  lastUpdated: { type: Date, required: true, default: Date.now },
});

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  totalCost: { type: Number, required: true },
});

const hotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  starRating: { type: Number, required: true },
  hotelType: [{ type: String, required: true }],
  hotelFacilities: [{ type: String, required: true }],
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Booking", default: [] },
  ],
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room", default: [] }],
});

const Room = mongoose.model<RoomType>("Room", roomSchema);
const Booking = mongoose.model<BookingType>("Booking", bookingSchema);
const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);

export { Room, Booking, Hotel };
