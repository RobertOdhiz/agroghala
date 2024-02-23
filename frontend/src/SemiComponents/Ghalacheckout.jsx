import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid"; // Import Grid for form layout
import axiosInstance from "../axios";

export default function GhalaModal(props) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [valuesForConfirmation, setValuesForConfirmation] = useState(null);
  const [userIDData, setUserId] = useState(null);

  const initialValues = {
    commodity: "",
    quantity: "",
    period: "",
  };

  const totalGhalaPrice = (values) => {
    const ghalaUnitRentPrice = props.selectedGhala.rent_price; // Replace with your actual unit rent price
    const period = Number.parseInt(values.period, 10);
    const quantity = Number.parseInt(values.quantity, 10);
    const pricePayable = period * quantity * ghalaUnitRentPrice;
    return pricePayable;
  };

  const handleConfirmation = () => {

    axiosInstance.get('/user/me/')
      .then((res) => {
        const data = res.data.id;
        setUserId(data);
      });

    if (valuesForConfirmation) {
      axiosInstance
        .post("/myghalas/", {
          user: userIDData, // Assuming you have the user ID available as a prop
          ghala: [props.selectedGhala.id], // Use the selected Ghala's ID
          commodity_stored: [valuesForConfirmation.commodity], // Send the commodity ID (adjust this to your actual commodity ID)
          bags_stored: valuesForConfirmation.quantity,
          duration_of_storage: valuesForConfirmation.period,
        })
        .then((response) => {
          setLoading(false);
          setConfirmationOpen(false);
          // Handle further actions, e.g., success message
          console.log(response);
        })
        .catch((error) => {
          setLoading(false);
          // Handle errors, e.g., error message
          console.error("Error message", error);
        });
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Rent {props.selectedGhala.ghala_name}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setTotalPrice(totalGhalaPrice(values));
              setValuesForConfirmation(values);
              setSubmitting(false);
              setConfirmationOpen(true);
            }}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form>
                <Grid container spacing={2}> {/* Use Grid for form layout */}
                  <Grid item xs={8}>
                    <Field name="commodity" as={Select} fullWidth>
                      <MenuItem value="1">Maize</MenuItem>
                      <MenuItem value="2">Beans</MenuItem>
                      <MenuItem value="3">Sweet Potatoe</MenuItem>
                      <MenuItem value="4">Cassava</MenuItem>
                      <MenuItem value="5">Millet</MenuItem>
                      <MenuItem value="6">Yam</MenuItem>
                      <MenuItem value="7">Sorghum</MenuItem>
                      <MenuItem value="8">Rice</MenuItem>
                      <MenuItem value="9">Barley</MenuItem>
                      <MenuItem value="10">Grren grams</MenuItem>
                      <MenuItem value="11">Oats</MenuItem>
                      <MenuItem value="12">Rye</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="quantity"
                      type="number"
                      placeholder="Quantity"
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#2AAA8A"; // Green border on focus
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = ""; // Reset border color on blur
                      }}
                    />
                    <ErrorMessage name="quantity" component="div" />
                  </Grid>

                  <Grid item xs={6}>
                    <Field
                      name="period"
                      type="number"
                      placeholder="Period in months"
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#2AAA8A"; // Green border on focus
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = ""; // Reset border color on blur
                      }}
                    />
                    <ErrorMessage name="period" component="div" />
                  </Grid>
                </Grid>

                <p className="text-xl">Price: {totalPrice} </p>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleConfirmation}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Rent Ghala
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        disableBackdropClick={loading}
      >
        <DialogTitle>Confirm Rental of {props.selectedGhala.ghala_name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Commodity: {valuesForConfirmation?.commodity?.commodity_stored}
            <br />
            Quantity: {valuesForConfirmation?.quantity}
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmation}
            color="primary"
            disabled={loading}
          >
            {loading ? "Please Wait..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
