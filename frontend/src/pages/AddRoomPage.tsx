import { useParams } from "react-router-dom";
import MainAddRooms from "../components/molecules/addRooms/main";

function AddRoomPage() {
  const { id } = useParams();
  return <MainAddRooms id={id} />;
}

export default AddRoomPage;
