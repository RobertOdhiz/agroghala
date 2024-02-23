import React from 'react'
import photo from '../assets/istockphoto-538889138-612x612 (1) 1.png'

function Missionvission() {
  return (
    <div className=" flex flex-col justify-center md:mx-auto mx-4  md:p-28 gap-16">
      <div className="flex md:mx-24">
        <img src={photo} alt="vission" className="w-1/3 hidden md:flex" />
        <div className=" md:p-28 ">
          <p className="font-thin text-4xl mb-8">Our Vission</p>
          <p className="font-thin text-xl mb-8">
            To be leading in grain storage solutions. Championing a food secure Africa by 2030.
          </p>
        </div>
      </div>
      <div className="flex md:mx-24">
        <div className=" md:p-28 ">
          <p className="font-thin text-4xl mb-8">Our Mission</p>
          <p className="font-thin text-xl mb-8">
            To offer the best storage solutions to Kenyans at affordable prices
            reducing post harvest loss significantly to fight food insecurity in
            kenya.
          </p>
        </div>
        <img src={photo} alt="vission" className="w-1/3 hidden md:flex" />
      </div>
    </div>
  );
}

export default Missionvission