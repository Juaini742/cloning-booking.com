import { SearchForm } from "../../interfaces";

type Props = {
  setQuerySearch: React.Dispatch<React.SetStateAction<SearchForm>>;
};

function StarRatingFilter({ setQuerySearch }: Props) {
  return (
    <div className="border-b border-slate-300 px-5 pb-2">
      <h4 className="font-semibold">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((item, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="star"
            value={item}
            onChange={(e) => {
              if (e.target.checked) {
                setQuerySearch((prevForm) => ({
                  ...prevForm,
                  star: prevForm.star
                    ? [...prevForm.star, parseInt(item)]
                    : [parseInt(item)],
                }));
              } else {
                setQuerySearch((prevForm) => ({
                  ...prevForm,
                  star: prevForm.star
                    ? prevForm.star.filter(
                        (rating) => rating !== parseInt(item)
                      )
                    : [],
                }));
              }
            }}
            className="rounded"
          />
          <span>{item} Stars</span>
        </label>
      ))}
      <div className=""></div>
    </div>
  );
}
export default StarRatingFilter;
