import {useMutation} from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import {useAppContext} from "../contexts/AppContext";
import * as apiClient from "../api-client";

function AddHotel() {
  const {showToast} = useAppContext();
  const {mutate, isLoading} = useMutation(apiClient.addHotel, {
    onSuccess: () => {
      showToast({message: "Hotel Saved", type: "SUCESS"});
    },
    onError: () => {
      showToast({message: "Error Saving Hotel", type: "ERROR"});
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
}
export default AddHotel;
