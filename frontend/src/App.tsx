import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import UpdateHotel from "./pages/UpdateHotel";
import Search from "./pages/Search";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";

function App() {
  const [isLoading, setIsloading] = useState(false);
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    setIsloading(true);
    if (document.readyState === "complete") {
      setIsloading(false);
    } else {
      window.addEventListener("load", () => {});
      setIsloading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout>
                  <Search />
                </Layout>
              }
            />
            <Route
              path="/hotels/:hotelId"
              element={
                <Layout>
                  <HotelDetails />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout>
                  <Register />
                </Layout>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Layout>
                  <SignIn />
                </Layout>
              }
            />
            {isLoggedIn && (
              <>
                <Route
                  path="/hotels/:hotelId/booking"
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
                      <AddHotel />
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
                  path="/upate-hotel/:hotelId"
                  element={
                    <Layout>
                      <UpdateHotel />
                    </Layout>
                  }
                />
                <Route
                  path="/my-bookings"
                  element={
                    <Layout>
                      <MyBookings />
                    </Layout>
                  }
                />
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
