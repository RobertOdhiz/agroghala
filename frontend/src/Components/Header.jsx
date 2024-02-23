import React from "react";
import { Link } from "react-router-dom";
import lady from "../assets/IE67-TW4 1.png";

function Header() {
  return (
    <div className="md:flex justify-center mx-auto md:gap-28  ">
      <div className="md:p-20 p-4">
        <h1 className="font-bold text-6xl mb-8 hidden">AgroGhala</h1>
        <p className="md:text-6xl md:py-16 font-thin py-6 text-3xl">
          Bridging the Gap to <br></br>Greenery <br></br>Connecting You to{" "}
          <br></br>Your Nearest Stores.
        </p>
        <Link to="/register">
          <button className="bg-[#23CE6B] text-white px-8 py-2 border-0 rounded-2xl font-semibold mb-20">
            Start Journey
          </button>
        </Link>
      </div>
      <div className=" md:flex justify-center items-center mb-20 hidden">
        <img src={lady} alt="lady" className="w-full " />
      </div>
    </div>
  );
}

export default Header;
