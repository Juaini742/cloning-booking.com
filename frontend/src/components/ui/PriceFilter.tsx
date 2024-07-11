import { SearchForm } from "../../interfaces";

type Props = {
  querySearch: SearchForm;
  setQuerySearch: React.Dispatch<React.SetStateAction<SearchForm>>;
};

const PriceFilter = ({ querySearch, setQuerySearch }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2"> Max Price</h4>
      <select
        value={querySearch.maxPrice || ""}
        onChange={(e) => {
          setQuerySearch((prevForm) => ({
            ...prevForm,
            maxPrice: e.target.value ? parseInt(e.target.value) : null,
          }));
        }}
        className="p-2 border rounded-md w-full"
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
