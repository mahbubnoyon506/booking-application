import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="bg-blue-800 py-6">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}

export default Layout;
