import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

function Feedback() {
  const [formData, setFormData] = useState({
    email: '',
    feedback_text: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!formData.email || !formData.feedback_text) {
      setError('Please fill in all fields');
      return;
    }

    // Start loading
    setIsLoading(true);

    // Simulate a delay for the success message
    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);

      // Clear the form data
      setFormData({
        email: '',
        feedback_text: '',
      });

      // Redirect to the homepage after 4 seconds
      setTimeout(() => {
        Navigate('/');
      });
    }, 2000); // 2 seconds for the simulated delay

    
    axiosInstance.post('/feedback/', {
      formData
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle success (e.g., show a success message)
        setIsSuccess(true);
        setIsLoading(false);
        // Clear the form data
        setFormData({
          email: "",
          feedback_text: "",
        });
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        setError('Error sending feedback');
        setIsLoading(false);
        console.error('Error sending feedback:', error);
      });
  };

  useEffect(() => {
    if (isSuccess) {
      // Clear success message after 4 seconds
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className="w-full max-w-xs mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-4">Feedback</h2>
        {isLoading && <p className="text-green-500 text-xs italic mb-4">Sending...</p>}
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        {isSuccess && (
          <p className="text-green-500 text-xs italic mb-4">Submission sent successfully</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback_text">
            Feedback
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="feedback_text"
            name="feedback_text"
            placeholder="Your feedback..."
            value={formData.feedback_text}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Feedback;
