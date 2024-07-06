export const Footer = () => {
  return (
    <div className="bg-primary py-10">
      <div className="container">
        <span className="text-3xl text-white font-bold tracking-tight">
          CloneBooking.com
        </span>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-white">
          <div className="flex justify-between">
            <ul className="flex-1">
              <li className="text-sm">Countries</li>
              <li className="text-sm">Regions</li>
              <li className="text-sm">Cities</li>
              <li className="text-sm">Districts</li>
              <li className="text-sm">Airports</li>
              <li className="text-sm">Hotels</li>
            </ul>
            <ul className="flex-1">
              <li className="text-sm">Homes </li>
              <li className="text-sm">Apartments </li>
              <li className="text-sm">Resorts </li>
              <li className="text-sm">Villas</li>
              <li className="text-sm">Hostels</li>
              <li className="text-sm">Guest houses</li>
            </ul>
          </div>
          <div className="flex justify-between">
            <ul className="flex-1">
              <li className="text-sm">Unique places to stay </li>
              <li className="text-sm">Reviews</li>
              <li className="text-sm">Unpacked: Travel articles </li>
              <li className="text-sm">Travel communities </li>
              <li className="text-sm">Seasonal and holiday deals </li>
            </ul>
            <ul className="flex-1">
              <li className="text-sm">Car rental </li>
              <li className="text-sm">Flight Finder</li>
              <li className="text-sm">Restaurant reservations </li>
              <li className="text-sm">Travel Agents </li>
            </ul>
          </div>
          <ul className="md:pl-10">
            <li className="text-sm">Curtomer Service</li>
            <li className="text-sm">Partner Help</li>
            <li className="text-sm">Careers</li>
            <li className="text-sm">Sustainability</li>
            <li className="text-sm">Press center</li>
            <li className="text-sm">Safety Resource Center</li>
            <li className="text-sm">Investor relations</li>
            <li className="text-sm">Terms & conditions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
