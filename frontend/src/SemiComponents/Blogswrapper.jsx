import React, { useState, useEffect } from "react";
import BlogsReviewCard from "./blogscard";
import axios from "axios";
import axiosInstance from "../axios";


function Blogswrapper() {
  const [blog, setblog] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/blogs/")
      .then((res) => {
        const data = res.data;
        setblog(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="grid grid-cols-3 gap-6 mx-4 pb-8">
      {blog.map((item) => (
        <div>
          <BlogsReviewCard
            title={item.title}
            dateposted={item.date_posted}
            image={item.image}
            content={item.content}
          />
        </div>
      ))}
    </div>
  );
}

export default Blogswrapper;
