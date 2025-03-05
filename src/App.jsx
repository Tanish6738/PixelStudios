import React from "react";
import Hero from "./components/Hero";
import Expertise from "./components/Expertise";
import HowWeWork from "./components/HowWeWork";
import OurWork from "./components/OurWork";
import Testimonial from "./components/Testimonial";
import FlowingData from "./components/FlowingData";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Expertise />
      <HowWeWork />
      <OurWork />
      <Testimonial />
      <FlowingData />
      <Footer />
    </>
  );
};

export default App;
