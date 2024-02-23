import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function LoginForm() {
  const [formData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    setIsLoading(true); // Set loading to true
    setError(null); // Reset any previous errors

    try {
      const response = await axiosInstance.post('auth/login/', {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      localStorage.setItem('user_id', response.data.user_id);
      axiosInstance.defaults.headers['Authorization'] =
        'JWT ' + localStorage.getItem('access_token');

      // Redirect to the homepage after successful login
      navigate('/');
      console.log(response);
      console.log(response.data);
    } catch (error) {
      setError({ message: 'Login failed. Please check your credentials.' });
      console.error('Login failed', error);
    } finally {
      setSubmitting(false);
      // Delay for 2 seconds before setting loading to false
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    // Clean up the error message after 2 seconds
    const errorTimeout = setTimeout(() => {
      setError(null);
    }, 2000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [error]);

  return (
    <div className="min-h-screen flex justify-center items-center lg:px-4 sm:px-1">
      <div className="border-2 border-green-500 p-4 shadow-green-300 shadow-md rounded-md lg:px-8 sm:px-4 lg:w-2/5">
        <div className="text-3xl font-bold">
          <p className="mt-6 text-center text-3xl border-b-2 pb-2 border-green-500 font-medium text-gray-900">
            Agro<span className="text-[#23CE6B]">Ghala.</span>
          </p>
        </div>
        <Formik
          initialValues={formData}
          onSubmit={handleLogin}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = 'Email is required';
            }
            if (!values.password) {
              errors.password = 'Password is required';
            }

            return errors;
          }}
        >
          {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
            <Form className="mt-8 space-y-4">
              <div
                className={`form-group pt-3 ${
                  errors.email && touched.email ? 'has-error' : ''
                }`}
              >
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`p-3 rounded-lg outline-none border w-full ${
                    errors.email && touched.email
                      ? 'border-red-500'
                      : 'border-gray-300 focus:border-green-500'
                  } transition-all duration-300 transform ${
                    errors.email && touched.email ? 'shake' : ''
                  }`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div
                className={`form-group pt-3 ${
                  errors.password && touched.password ? 'has-error' : ''
                }`}
              >
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`p-3 rounded-lg outline-none border w-full ${
                    errors.password && touched.password
                      ? 'border-red-500'
                      : 'border-gray-300 focus:border-green-500'
                  } transition-all duration-300 transform ${
                    errors.password && touched.password ? 'shake' : ''
                  }`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-3 bg-[#23CE6B] text-white font-semibold rounded-lg hover:bg-green-600"
                >
                  {isLoading ? 'Please Wait...' : 'Login'}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-center">{error.message}</p>
              )}
              <p className="text-center">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#23CE6B]">
                  Register
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
