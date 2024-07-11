import { HotelType } from "../interfaces";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

function BookingDetailSummery({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) {
  return (
    <div className="grid gap-4 rounded-lg border border-zinc-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your booking details</h2>
      <div className="border p-2 border-zinc-300 rounded">
        Location:{" "}
        <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div className="">
          Check-in
          <div className="font-bold">{checkIn.toDateString()}</div>
        </div>
        <div className="">
          Check-Out
          <div className="font-bold">{checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="border-y border-zinc-300 py-2">
        Total Length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>
      <div className="">
        Guest{" "}
        <div className="font-bold">
          {adultCount} Adult & Children {childCount}
        </div>
      </div>
    </div>
  );
}
export default BookingDetailSummery;
