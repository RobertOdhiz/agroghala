import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FloatingActionButtons from "./Floatingbtn";
import axiosInstance from "../axios";
import { format } from "date-fns";
import SellCommodityModal from "./SellCommodity"; // Import the SellCommodityModal component

const modalStyle = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%", // Set to 2/3 of the screen width
  height: "70vh", // Adjust the height as needed
  bgcolor: "#4CAF50",
  boxShadow: 24,
  p: 3,
  overflowY: "auto", // Enable vertical scrolling
  whiteSpace: "nowrap", // Prevent text wrapping
  borderRadius: "8px",
};
const modalStyle2 = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%", // Set to 2/3 of the screen width
    height: "70vh", // Adjust the height as needed
    bgcolor: "white",
    boxShadow: 24,
    p: 3,
    overflowY: "auto", // Enable vertical scrolling
    whiteSpace: "nowrap", // Prevent text wrapping
    borderRadius: "8px",
  };

export default function MyghalaList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [myghala, setMyghala] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(null);

  const [selectedGhala, setSelectedGhala] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/myghalas")
      .then((res) => {
        const data = res.data;
        setMyghala(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSellButtonClick = (ghala) => {
    setSelectedGhala(ghala);
    setOpen(true);
  };

  const hasGhalas = myghala.length > 0;

  const handleSellCommodity = (ghalaId, bagsToSell) => {
    axiosInstance.get('/user/me/')
      .then((res) => {
        const userIdData = res.data.id;
        setUserId(userIdData);
      });

    const newBagsStored = selectedGhala.bags_stored - bagsToSell;

    axiosInstance
      .put(`/myghalas/${ghalaId}/`, {
        user: userId,
        bags_stored: newBagsStored,
        commodity_stored: [myghala.commodity_stored],
        ghala: [myghala.ghala],
      })
      .then((res) => {
        setMyghala((prevMyghala) =>
          prevMyghala.map((ghala) =>
            ghala.id === selectedGhala.id ? { ...ghala, bags_stored: newBagsStored } : ghala
          )
        );
        setSelectedGhala(null);
      })
      .catch((error) => {
        console.error("Error updating bags stored:", error);
      });
  };

  return (
    <div>
      <FloatingActionButtons onClick={handleOpen}>Open modal</FloatingActionButtons>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <p className="text-3xl text-white text-center pb-3 border-b-3 border-white top-0 left-0 right-0">My Ghalas</p>

          {loading && <p className="text-green-500">Loading...</p>}

          {!loading && !hasGhalas && (
            <div className="text-center">
              <p>You haven't rented yet. <a href="/ghalas" className="text-green-500">Rent now</a></p>
            </div>
          )}

          {!loading && hasGhalas && (
            <div className="grid grid-cols-3 gap-8">
              {myghala.map((ghala) => (
                <div key={ghala.id} className="ml-4">
                  <div className="shadow-md p-2 rounded-md border-1 border-green-500 bg-white p-3">
                    <button className="absolute top-2 right-2" onClick={handleClose}>
                      Close
                    </button>
                    <p className="font-medium mb-2 pb-2 border-b-2 border-green-500">Ghala: {ghala.ghala_name}</p>
                    <p>
                      <span className="italic">Bags Stored:</span> {ghala.bags_stored}
                    </p>
                    <p>Date Rented: {format(new Date(ghala.date_rented), "MM/dd/yyyy")}</p>
                    <p className="mt-1">Duration: {ghala.duration_of_storage} months</p>
                    <button onClick={() => handleSellButtonClick(ghala)} className="p-2 text-center bg-green-500 border-1 border-green-500 mt-2 text-white rounded-full">Sell Commodity</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Box>
      </Modal>

      {/* Render the SellCommodityModal component */}
      {selectedGhala && (
        <SellCommodityModal
          open={selectedGhala !== null}
          selectedGhala={selectedGhala}
          onSellCommodity={handleSellCommodity}
          onClose={() => setSelectedGhala(null)}
        />
      )}
    </div>
  );
}
