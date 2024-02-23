import * as React from "react";
import Box from "@mui/material/Box";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SokoModal(props) {
  const initialValues = {
    commodity: "",
    quantity: "",
    period: "",
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log(values);
                setSubmitting(false);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-8">
                  <Field
                    name="commodity"
                    placeholder=" Commodity"
                    className="p-2 rounded-lg outline-none border"
                  />
                  <ErrorMessage name=" commodity" component="div" />
                  <Field
                    name="quantity"
                    type="Number"
                    placeholder="Quantity"
                    className="p-2 rounded-lg outline-none border"
                  />
                  <ErrorMessage name="quantity" component="div" />

                  <Field
                    name="period"
                    placeholder="Period in months"
                    className="p-2 rounded-lg outline-none border"
                  />
                  <ErrorMessage name="period" component="div" />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#23CE6B] p-2 font-semibold text-white rounded-2xl"
                  >
                    Rent Ghala
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
