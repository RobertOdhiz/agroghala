import React from "react";
import BlogsReviewCard from "../SemiComponents/blogscard";

function Blogs() {
  return (
    <div className=" flex flex-col justify-center items-center  md:p-28 gap-8 p-4">
      <div>
        <p className="font-thin md:text-5xl text-3xl">
          Hear What Our Farmers have to Say
        </p>
      </div>
      <BlogsReviewCard />
      <BlogsReviewCard />
      <BlogsReviewCard />
    </div>
  );
}

export default Blogs;
