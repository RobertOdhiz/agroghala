import React, { useEffect, useState } from "react";
import SokoCard from "./Sokocardmain"; // Import the SokoCard component
import axiosInstance from "../axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SokoDataDisplay() {
  const [sokoData, setSokoData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axiosInstance.get('/commodities/')
      .then((res) => {
        const data = res.data;
        setSokoData(data);
      })
      .catch((error) => {
        console.error("Error fetching Soko data:", error);
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-6 pt-16">
      {/* Map over the sokoData array and render SokoCard components */}
      {sokoData.map((item) => (
        <SokoCard
          key={item.id}
          commodity={item.name}
          price={item.current_price}
        />
      ))}
    </div>
    <Navbar />
    <Footer />
    </div>
    
  );
}

export default SokoDataDisplay;

