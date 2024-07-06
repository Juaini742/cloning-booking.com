import {hotelTypes} from "../config/hotel-options-config";

type Props = {
  selectedhotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function HotelTypeFilter({selectedhotelTypes, onChange}: Props) {
  return (
    <div className="border-b border-slate-300 px-5">
      <h4 className="text-emerald-50 font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((hotelType, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={hotelType}
            checked={selectedhotelTypes.includes(hotelType)}
            onChange={onChange}
          />
          <span>{hotelType}</span>
        </label>
      ))}
      <div className=""></div>
    </div>
  );
}

export default HotelTypeFilter;
