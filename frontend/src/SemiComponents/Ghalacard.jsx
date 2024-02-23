import React from "react";
// import BasicRating from "./Ratings";

function Ghalacard(props) {
  return (
    <div className="flex flex-col gap-10 shadow-2xl p-2 rounded-xl">
      <div className="">
        <img
          src={props.image}
          alt="warehouse"
          className="h-50 md:rounded-2xl"
        />
      </div>
      <div>
        {/* <BasicRating /> */}
        <div>
          <p className="md:text-2xl ">{props.name}</p>
          <p>{props.address}</p>
          <p className="text-[#23CE6B]">Ksh. {props.price}</p>
          <p className="font-thin">
            {props.phone}|
            <span>
              {" "}
              {props.open}-{props.close}
            </span>
          </p>
          <button
            className="bg-[#23CE6B] p-2 my-2 text-white rounded-2xl"
            onClick={props.handleBuyClick}
          >
            Rent Ghala
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ghalacard;
