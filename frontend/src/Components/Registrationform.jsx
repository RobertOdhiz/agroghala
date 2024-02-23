import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from '../axios'

const Registrationform = () => {
  const initialValues = {
    email: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    address: "",
    password: "",
    confirm_password: ""
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true); // Set loading state to true during form submission
    try {
      AxiosInstance.post('auth/register', {
        email: values.email,
        phone_number: values.phone_number,
        address: values.address,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
      })
      .then((res) => {
        setIsLoading(false); // Set loading state to false after successful submission
        navigate("/login");
        console.log(res);
        console.log(res.data);
      });
    } catch (error) {
      setIsLoading(false); // Set loading state to false in case of an error
      setError({ message: "Registration failed" });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center lg:px-4 sm:px-1">
      <div className="border-2 border-green-500 p-4 shadow-green-300 shadow-md rounded-md lg:px-8 sm:px-4">
        <div className="text-3xl font-bold">
          <p className="mt-6 text-center text-3xl border-b-2 pb-2 border-green-500 font-medium text-gray-900">
            Agro<span className="text-[#23CE6B]">Ghala.</span>
          </p>
        </div>
        <div className="grid gid-cols-2 gap-4">
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors = {};
              if (!values.first_name) {
                errors.first_name = 'First name is required';
              }
              if (!values.last_name) {
                errors.last_name = 'Last name is required';
              }
              if (!values.email) {
                errors.email = 'Email is required';
              }
              if (!values.phone_number) {
                errors.phone_number = 'Phone number is required';
              }
              if (!values.address) {
                errors.address = 'Address is required';
              }
              if (!values.password) {
                errors.password = 'Password is required';
              }
              if (values.password !== values.confirm_password) {
                errors.confirm_password = 'Passwords do not match';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
              <Form className="mt-8 space-y-4">
                {isLoading ? (
                  <p className="text-center text-[#23CE6B]">Please wait...</p>
                ) : (
                  <>
                    <div className="lg:grid lg:grid-cols-2 gap-4">
                      <div>
                        <Field
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                          className={`p-3 rounded-lg outline-none border w-full ${
                            errors.first_name && touched.first_name
                              ? 'border-red-500'
                              : 'border-gray-300 focus:border-green-500'
                          }`}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="first_name"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="last_name"
                          placeholder="Last Name"
                          className={`p-3 rounded-lg outline-none border w-full ${
                            errors.last_name && touched.last_name
                              ? 'border-red-500'
                              : 'border-gray-300 focus:border-green-500'
                          }`}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="last_name"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 lg:gap-4 sm:grid-cols-1">
                      <div>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email"
                          className={`p-3 rounded-lg outline-none border w-full ${
                            errors.email && touched.email
                              ? 'border-red-500'
                              : 'border-gray-300 focus:border-green-500'
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
                      <div>
                        <Field
                          type="text"
                          name="phone_number"
                          placeholder="Phone Number"
                          className={`p-3 rounded-lg outline-none border w-full ${
                            errors.phone_number && touched.phone_number
                              ? 'border-red-500'
                              : 'border-gray-300 focus:border-green-500'
                          }`}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="phone_number"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    <Field
                      type="text"
                      name="address"
                      placeholder="Address"
                      className={`p-3 rounded-lg outline-none border w-full ${
                        errors.address && touched.address
                          ? 'border-red-500'
                          : 'border-gray-300 focus:border-green-500'
                      }`}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500"
                    />
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className={`p-3 rounded-lg outline-none border w-full ${
                        errors.password && touched.password
                          ? 'border-red-500'
                          : 'border-gray-300 focus:border-green-500'
                      }`}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500"
                    />
                    <Field
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      className={`p-3 rounded-lg outline-none border w-full ${
                        errors.confirm_password && touched.confirm_password
                          ? 'border-red-500'
                          : 'border-gray-300 focus:border-green-500'
                      }`}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="confirm_password"
                      component="div"
                      className="text-red-500"
                    />
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full p-3 bg-[#23CE6B] text-white font-semibold rounded-lg hover:bg-green-600"
                      >
                        Register
                      </button>
                    </div>
                  </>
                )}
                {error && (
                  <p className="text-red-500 text-center">{error.message}</p>
                )}
                <p className="text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#23CE6B]">
                    Login
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Registrationform;
