import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./layouts/Layouts";
import { Register } from "./pages/Register";
import SIgnIn from "./pages/SIgnIn";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import ProfilePage from "./layouts/Profile";
import AddHotelPage from "./pages/AddHotelPage";
import AddRoomPage from "./pages/AddRoomPage";
import MyHotelDetail from "./pages/MyHotelDetail";
import Search from "./pages/Search";
import EditHotel from "./pages/EditHotel";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SIgnIn />} />
        {isLoggedIn && (
          <>
            <Route
              path="/user"
              element={
                <Layout>
                  <ProfilePage />
                </Layout>
              }
            />
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />

            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotelPage />
                </Layout>
              }
            />

            <Route
              path="/add-rooms/:id"
              element={
                <Layout>
                  <AddRoomPage />
                </Layout>
              }
            />
            <Route
              path="/my-hotel/:hotelId"
              element={
                <Layout>
                  <MyHotelDetail />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
