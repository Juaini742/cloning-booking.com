import { BookingFormData } from "./forms/BookingForm/BookingForm";
import {
  AvailableRoomsType,
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  Rooms,
  SearchForm,
  SearchParams,
  UserType,
} from "./interfaces";
import { RegisterForm } from "./pages/Register";
import { SignInFormData } from "./pages/SIgnIn";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const updateCurrentUser = async ({
  id,
  formBody,
}: {
  id: string | undefined;
  formBody: { firstName?: string };
}): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
    credentials: "include",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formBody),
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterForm) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("error during sign out");
  }
};

export const addHotel = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/my-hotels`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to add hotel");
  }
};

export const addRooms = async ({
  formData,
  id,
}: {
  formData: FormData;
  id: string | undefined;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/my-hotels/${id}/rooms`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to add hotel");
  }
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  // queryParams.append("checkIn", searchParams.checkIn || "");
  // queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  // queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  // queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  // searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return response.json();
};

export const searchHotels2 = async (queryForm: SearchForm) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/hotels/search?destination=${queryForm.destination}&maxPrice=&type=${queryForm.type}&starRating=${queryForm.star}&adultCount=${queryForm.adultCount}&childCount=${queryForm.childCount}&facilities=${queryForm.facilities}&pricePerNightAsc=&pricePerNightDesc=`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const roomAvailability = async (
  queryForm: SearchForm,
  hotelId: string
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/hotels/check-availability?hotelId=${hotelId}&adultCount=${queryForm.adultCount}&childCount=${queryForm.childCount}&checkIn=${queryForm.checkIn}&checkOut=${queryForm.checkOut}`
    );

    const data: AvailableRoomsType = response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return response.json();
};

export const fetchRoomById = async (roomId: string): Promise<Rooms> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/room/${roomId}`);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return response.json();
};

export const createPaymentIntent = async (
  roomId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${roomId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};
