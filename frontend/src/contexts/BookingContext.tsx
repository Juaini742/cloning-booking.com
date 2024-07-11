import { createContext, useContext, useState } from "react";

export interface BookingType {
  roomId: string | undefined;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  paymentIntentId: string;
}

const initialValue = {
  roomId: "",
  adultCount: 1,
  childCount: 0,
  checkIn: new Date(),
  checkOut: new Date(),
  totalCost: 0,
  paymentIntentId: "",
};

interface BookingFormType {
  bookingData: BookingType;
  setBookingData: React.Dispatch<React.SetStateAction<BookingType>>;
}

const BookingContext = createContext<BookingFormType>({
  bookingData: initialValue,
  setBookingData: () => {},
});

interface BookingContextProviderProps {
  children: React.ReactNode;
}

export const BookingContextProvider = ({
  children,
}: BookingContextProviderProps) => {
  const [bookingData, setBookingData] = useState<BookingType>(initialValue);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  return context;
};
