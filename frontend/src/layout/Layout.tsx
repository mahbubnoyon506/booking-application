import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const { pathname } = useLocation();
  const isHomeRoute = Boolean(pathname === "/");
  return (
    <div className="flex flex-col min-h-screen">
      <Header isHomeRoute={isHomeRoute} />
      {!isHomeRoute && <Hero />}
      <div className="px-[4%] lg:px-[8%]">
        <SearchBar />
      </div>
      <div className="px-[4%] lg:px-[8%] py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
