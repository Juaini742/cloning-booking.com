import { hotelFacilities } from "../config/hotel-options-config";
import { SearchForm } from "../interfaces";

type Props = {
  setQuerySearch: React.Dispatch<React.SetStateAction<SearchForm>>;
};

function FacilitiesFilter({ setQuerySearch }: Props) {
  return (
    <div className="border-b border-slate-300 px-5 pb-2">
      <h4 className="font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="star"
            value={facility}
            onChange={(e) => {
              if (e.target.checked) {
                setQuerySearch((prevForm) => ({
                  ...prevForm,
                  facilities: prevForm.facilities
                    ? [...prevForm.facilities, facility]
                    : [facility],
                }));
              } else {
                setQuerySearch((prevForm) => ({
                  ...prevForm,
                  facilities: prevForm.facilities
                    ? prevForm.facilities.filter(
                        (rating) => rating !== facility
                      )
                    : [],
                }));
              }
            }}
            className="rounded"
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
}

export default FacilitiesFilter;
