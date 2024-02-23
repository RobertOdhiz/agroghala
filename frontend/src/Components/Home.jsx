import React, { useState, useEffect} from 'react';
import Navbar from '../SemiComponents/Navbar';
import axiosInstance from '../axios';
import Background from "../assets/hero-image.jpg";
import About from '../SemiComponents/about';
import Footer from '../SemiComponents/Footer';
import { Link } from 'react-router-dom';

function formatDate(dateString) {
  const currentDate = new Date();
  const blogDate = new Date(dateString);

  // Check if the date is today
  if (
    blogDate.getDate() === currentDate.getDate() &&
    blogDate.getMonth() === currentDate.getMonth() &&
    blogDate.getFullYear() === currentDate.getFullYear()
  ) {
    return 'Today';
  }

  // Check if the date is yesterday
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  if (
    blogDate.getDate() === yesterday.getDate() &&
    blogDate.getMonth() === yesterday.getMonth() &&
    blogDate.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Yesterday';
  }

  // Return the actual date without the time
  return blogDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function Homepage() {
  const [blogs, setBlogs] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    // Fetch the blogs from the backend API
    axiosInstance.get('/blogs/')
      .then(response => {
        // Assuming the API returns an array of blogs
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);


  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('access_token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);
  return (
    <div>
      <div className='position-relative'>
      
      <div className='img-fluid p-0 mt-0 homepage'>
        <img className='absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center' src={Background} alt="background image" />
        
        <div className='position-absolute top-0 end-0 h-100 w-50 text-white text-left'>
          
          <div className='flex justify-center items-center h-screen'>
            <div className='row  backdrop-blur-sm rounded-md p-24 sm:p-4'>
            <h1 className='text-center border-b-2 mb-5 pb-3 text-4xl'>AGROGHALA</h1>
            <p className='card-text'>Easily access vital information, seamless rental of storage facilities, and a direct platform to sell your produce in dynamic markets.</p>
            
             {authenticated ? (
            <div className='flex justify-between items-center sm:row mt-8 sm:mt-4'>
               <Link to='/soko'>
               <a class="ghala home-buttons flex justify-content-between inline-flex items-center px-3 py-2 text-sm font-medium text-center 
               text-white bg-transparent rounded-full focus:ring-4 border-white border-2 rounded-full
               focus:outline-none focus:ring-green-300 dark:bg-transparent dark:hover:bg-transparent dark:focus:ring-transparent">
                  Soko
                  <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>              
              </Link>
              <Link to='/ghalas'>
              <a class="ghala home-buttons flex justify-content-between inline-flex items-center px-3 py-2 sm:my-3 text-sm font-medium text-center 
               text-white bg-transparent rounded-full hover:bg-transparent focus:ring-4 border-white border-2 rounded-full
               focus:outline-none focus:ring-green-300 dark:bg-transparent dark:hover:bg-transparent dark:focus:ring-transparent">
                  Ghalas
                  <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>                     </Link>
              <Link to='/'>
              <a class="ghala home-buttons flex justify-content-between inline-flex items-center px-3 py-2 text-sm font-medium text-center 
               text-white bg-transparent rounded-full hover:bg-transparent focus:ring-4 border-white border-2 rounded-full
               focus:outline-none focus:ring-green-300 dark:bg-transparent dark:hover:bg-transparent dark:focus:ring-transparent">
                  My Products
                  <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>                     </Link>
              </div>
              ) : ( <div></div> )
              }
            </div>
            </div>
        </div>
      </div>
      </div>
      <About />
      
      <div className='bg-green-100 rounded-top-lg py-3'>
      <h1 className="mb-8 text-2xl text-success my-2 mx-5 font-medium"> Featured Blogs </h1>
      <div className='px-5 grid grid-cols-3 gap-2 sm:row'>
      {/* Render only two blogs */}
      {blogs.slice(0, 3).map(blog => (
          <div key={blog.id} class="max-w-sm w-full lg:max-w-full mb:2 lg:flex">
  <div class="lg:h-auto flex-none bg-cover rounded-t lg:rounded-md text-center overflow-hidden" style={{ backgroundImage: `url(${blog.image})` }}
 title="Woman holding a mug">
  </div>
  <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div class="mb-8">
      <div class="text-gray-900 font-bold text-xl mb-2">{blog.title.slice(0, 20)}...</div>
      <p class="text-gray-700 text-base">{blog.content.slice(0, 160)}...</p>
    </div>
    <div class="flex items-center">
      <div class="text-sm">
        <p class="text-gray-900 leading-none">{blog.author.first_name} {blog.author.last_name}</p>
        <p class="text-gray-600">{formatDate(blog.created_at)}</p>
      </div>
    </div>
  </div>
</div>
      ))}
    </div> 
    <div className='flex justify-content-end px-5'>
      <Link to='/blogs'>
        <a type='button' className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 
        focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 
        dark:focus:ring-green-800 mt-5'>
          More blogs
        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
      </Link>
    </div>
    </div>
    <Navbar />
      <Footer />
    </div>
  )
};

export default Homepage
