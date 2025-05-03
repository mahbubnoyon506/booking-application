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

function App() {
  const [isLoading, setIsloading] = useState(false);
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    setIsloading(true);
    if (document.readyState === "complete") {
      console.log("App fully loaded");
      setIsloading(false);
    } else {
      window.addEventListener("load", () => {
        console.log("App fully loaded");
      });
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
                  <p>Home Page</p>
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout>
                  <p>Search Page</p>
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
