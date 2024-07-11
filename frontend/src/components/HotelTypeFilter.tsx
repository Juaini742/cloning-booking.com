import { hotelType } from "../config/hotel-options-config";
import { SearchForm } from "../interfaces";

type Props = {
  setQuerySearch: React.Dispatch<React.SetStateAction<SearchForm>>;
};

function HotelTypeFilter({ setQuerySearch }: Props) {
  return (
    <div className="border-b border-slate-300 px-5 pb-2">
      <h4 className="font-semibold mb-2">Hotel Type</h4>
      {hotelType.map((hotelType, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={hotelType}
            onChange={(e) => {
              if (e.target.checked) {
                setQuerySearch((prevForm) => ({
                  ...prevForm,
                  type: prevForm.type
                    ? [...prevForm.type, hotelType]
                    : [hotelType],
                }));
              } else {
                setQuerySearch((prevForm) => ({
                  ...prevForm,
                  type: prevForm.type
                    ? prevForm.type.filter((rating) => rating !== hotelType)
                    : [],
                }));
              }
            }}
            className="rounded"
          />
          <span>{hotelType}</span>
        </label>
      ))}
      <div className=""></div>
    </div>
  );
}

export default HotelTypeFilter;
