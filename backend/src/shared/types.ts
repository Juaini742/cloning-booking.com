import { Types } from "mongoose";
// export type HotelType = {
//   _id: string;
//   userId: string;
//   name: string;
//   city: string;
//   country: string;
//   description: string;
//   type: string;
//   pricePerNight: number;
//   adultCount: number;
//   childCount: number;
//   facilities: string[];
//   starRating: number;
//   imageUrls: string[];
//   lastUpdated: Date;
//   bookings: BookingType[];

// };
export type HotelType = {
  _id?: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  starRating: number;
  hotelFacilities: string[];
  hotelType: string[];
  imageUrls: string[];
  lastUpdated: Date;
  bookings: Types.ObjectId[];
  rooms: Types.ObjectId[];
};

export interface RoomType {
  _id?: string;
  hotelId: Types.ObjectId;
  roomNumber: string;
  type: string;
  pricePerNight: number;
  adultCount: number;
  childCount: number;
  facilities: string[];
  description: string;
  imageUrls: string[];
  available: boolean;
  lastUpdated: Date;
}

// export type BookingType = {
//   _id: string;
//   userId: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   adultCount: number;
//   childCount: number;
//   checkIn: Date;
//   checkOut: Date;
//   totalCost: number;
// };
export type BookingType = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  userId: string;
  roomId: Types.ObjectId;
  totalCost: number;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentresponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
