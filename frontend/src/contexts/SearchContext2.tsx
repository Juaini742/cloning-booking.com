import { createContext, useContext, useState } from "react";
import { SearchForm } from "../interfaces";

const initialValue = {
  destination: "",
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 0,
  star: [],
  type: [],
  facilities: [],
  maxPrice: null,
};

interface SearchFormType {
  querySearch: SearchForm;
  setQuerySearch: React.Dispatch<React.SetStateAction<SearchForm>>;
}

const SearchContext = createContext<SearchFormType>({
  querySearch: initialValue,
  setQuerySearch: () => {},
});

interface SearchContextProviderProps {
  children: React.ReactNode;
}

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [querySearch, setQuerySearch] = useState<SearchForm>(initialValue);

  return (
    <SearchContext.Provider value={{ querySearch, setQuerySearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext2 = () => {
  const context = useContext(SearchContext);
  return context;
};
