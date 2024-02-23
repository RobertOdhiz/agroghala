import React, { useEffect, useState } from "react";
import Sokocard from "./Sokocard";
import { Link } from "react-router-dom";
import axiosInstance from "../axios";


function shuffleArray(array) {
  // Function to shuffle an array using Fisher-Yates algorithm
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Sokopreview() {
  const [sokoData, setSokoData] = useState([]);

  useEffect(() => {
    axiosInstance.get('/sokos/')
      .then((res) => {
        const data = res.data;
        const shuffledSokos = shuffleArray(data);
        const firstTwoSokos = shuffledSokos.slice(0, 2);
        setSokoData(firstTwoSokos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="border-l-2 border-green-500  pl-6 mr-2">
      <div>
        <p className="text-2xl">Soko Preview</p>
      </div>
      <div className="flex flex-col gap-4 my-6">
        {sokoData.map((item) => (
          <Sokocard
            key={item.id}
            image={item.image}
            name={item.commodity}
            price={item.price}
          />
        ))}
      </div>
      <Link to="/soko" className="bg-[#23CE6B] p-2 text-white rounded-2xl">
        View Soko
      </Link>
    </div>
  );
}

export default Sokopreview;
