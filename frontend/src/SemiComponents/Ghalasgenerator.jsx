import React, { useState, useEffect } from "react";
import Ghalascard from "./Ghalacard";
import GhalaModal from "./Ghalacheckout";
import axiosInstance from "../axios";
import Dialog from "@mui/material/Dialog";

function Ghalasgenerator(props) {
  const [ghala, setGhala] = useState([]);
  const [selectedGhala, setSelectedGhala] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedGhalaPrice, setSelectedGhalaPrice] = useState(0);

  const handleBuyClick = (ghala) => () => {
    setSelectedGhala(ghala); // Set the selected Ghala
    setSelectedUserId(props.userId); // Set the selected user ID
    setSelectedGhalaPrice(ghala.rent_price); // Set the initial price

    // Calculate the total price based on initial values
    const initialTotalPrice = totalGhalaPrice({
      commodity: "",
      quantity: "",
      period: "",
    });
    setSelectedGhalaPrice(initialTotalPrice);

    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedGhala(null);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleConfirmation = () => {
    setLoading(true);

    const user_id = localStorage.getItem("user_id")
    console.log("user_id:", user_id);
    axiosInstance
      .post(`user/${user_id}/myghalas/`, {
        user: user_id, // Assuming you have the user ID available as a prop
        ghala: selectedGhala.id, // Use the selected Ghala's ID
        commodity_stored: props.selectedItem.commodity.id, // Send the commodity ID
        bags_stored: props.selectedItem.quantity,
        duration_of_storage: props.selectedGhala.period,
      })
      .then((response) => {
        setLoading(false);
        setConfirmationOpen(false);
        // Handle further actions, e.g., success message
      })
      .catch((error) => {
        setLoading(false);
        // Handle errors, e.g., error message
      });
  };

  useEffect(() => {
    axiosInstance
      .get("warehouses/")
      .then((res) => {
        const data = res.data;
        setGhala(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const totalGhalaPrice = (values) => {
    const ghalaUnitRentPrice = 200; // Replace with your actual unit rent price
    const period = Number.parseInt(values.period, 10);
    const quantity = Number.parseInt(values.quantity, 10);
    const pricePayable = period * quantity * ghalaUnitRentPrice;
    return pricePayable;
  };

  return (
    <div className="grid grid-cols-3 gap-8 my-16">
      {ghala.map((item) => (
        <Ghalascard
          key={item.id}
          image={item.images}
          name={item.ghala_name}
          address={item.address}
          price={item.rent_price}
          phone={item.phone_number}
          open={item.opening_time}
          close={item.closing_time}
          handleBuyClick={handleBuyClick(item)} // Pass the Ghala to the click handler
        />
      ))}
      {selectedGhala && (
        <GhalaModal
          open={open}
          handleClose={handleCloseModal}
          handleConfirmationOpen={() => setConfirmationOpen(true)}
          handleConfirmationClose={handleConfirmationClose}
          handleConfirmation={handleConfirmation}
          ghalatitle={selectedGhala.ghala_name} // Display the selected Ghala name
          price={selectedGhalaPrice}
          totalGhalaPrice={totalGhalaPrice} // Pass the totalGhalaPrice function
          selectedGhala={selectedGhala} // Pass the selected Ghala
          selectedUserId={selectedUserId} // Pass the selected user ID
        />
      )}
      <Dialog
        open={confirmationOpen}
        onClose={handleConfirmationClose}
        disableBackdropClick={loading}
      >
        {/* Confirmation modal content */}
      </Dialog>
    </div>
  );
}

export default Ghalasgenerator;
