export type UserType = {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  month?: string;
  date?: string;
  year?: string;
  nationality?: string;
  gender?: string;
  address?: string;
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};

export interface SearchForm {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  star: number[];
  type: string[];
  facilities: string[];
  maxPrice: number | null;
}

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  // pricePerNight: number;
  // adultCount: number;
  // childCount: number;
  hotelType: string;
  hotelFacilities: string[];
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
  rooms?: Rooms[];
};

export type HotelForm = {
  name: string;
  city: string;
  country: string;
  description: string;
  starRating: number;
  hotelType: string;
  hotelFacilities: string;
  imageFiles: FileList;
  imageUrls: string[];
};

export interface AvailableRoomsType {
  availableRooms: Rooms[];
}

export interface Rooms {
  _id?: string;
  roomNumber: string;
  type: string;
  pricePerNight: string;
  adultCount: string;
  childCount: string;
  facilities: string[];
  description: string;
  imageFiles: FileList | null;
  imageUrls: string[];
  available?: boolean;
}

export interface RoomsType {
  rooms: Rooms[];
}

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
