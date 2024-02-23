import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios";
import Blogscard from "./Blogcard";

function shuffleArray(array) {
  // Function to shuffle an array using Fisher-Yates algorithm
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Blogspreview() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    axiosInstance.get('/blogs/')
      .then((res) => {
        const blogs = res.data;
        const shuffledBlogs = shuffleArray(blogs);
        const onlyTwoBlogs = shuffledBlogs.slice(0, 2);
        setBlogData(onlyTwoBlogs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="border-l-2 border-green-500  pl-6 mr-2">
      <div>
        <p className="text-2xl">Latest Stories</p>
      </div>
      <div className="flex flex-col gap-4 my-6">
        {blogData.map((item) => (
          <Blogscard
            key={item.id} // Make sure each card has a unique key
            title={item.title} // Pass the title as a prop
            content={item.content} // Pass the content as a prop
            image={item.image}
            author={item.author.first_name}
          />
        ))}
      </div>
      <Link to="/blogs" className="bg-[#23CE6B] p-2 text-white rounded-2xl">
        View Blogs
      </Link>
    </div>
  );
}

export default Blogspreview;
