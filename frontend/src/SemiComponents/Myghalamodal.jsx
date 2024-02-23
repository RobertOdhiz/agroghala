import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FloatingActionButtons from "./Floatingbtn";
import axiosInstance from "../axios";
import { format } from "date-fns";

const modalStyle = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "66%", // Set to 2/3 of the screen width
  height: "70vh", // Adjust the height as needed
  bgcolor: "#2AAA8A",
  boxShadow: 24,
  p: 3,
  overflowX: "auto", // Enable horizontal scrolling
  whiteSpace: "nowrap", // Prevent text wrapping
};
const modalStyle2 = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "66%", // Set to 2/3 of the screen width
  height: "70vh", // Adjust the height as needed
  bgcolor: "#2AAA8A",
  boxShadow: 24,
  p: 3,
  overflowX: "auto", // Enable horizontal scrolling
  whiteSpace: "nowrap", // Prevent text wrapping
};


export default function MyghalaModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [myghala, setMyghala] = useState([]);
  const [loading, setLoading] = useState(true);

  const [commodityList, setCommodityList] = useState([]);
  const [ghalaList, setGhalaList] = useState([]);
  const [userId, setUserId] = useState(null);

  const [selectedGhala, setSelectedGhala] = useState(null);
  const [bagsToSell, setBagsToSell] = useState(0);

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

  const handleSellCommodity = () => {
    if (selectedGhala && bagsToSell > 0) {
      axiosInstance.get('/user/me/')
        .then((res) => {
          const userIdData = res.data.id;
          setUserId(userIdData);
        });

      const newBagsStored = selectedGhala.bags_stored - bagsToSell;
      const newCommodity = selectedGhala.commodity_stored;
      setCommodityList([...commodityList, newCommodity]);

      const newGhala = selectedGhala.id;
      setGhalaList([...ghalaList, newGhala]);

      axiosInstance
        .put(`/myghalas/${selectedGhala.id}/`, {
          user: userId,
          bags_stored: newBagsStored,
          commodity_stored: commodityList,
          ghala: ghalaList,
        })
        .then((res) => {
          console.log(ghalaList);
          console.log(commodityList);
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
    }
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
          <p className="text-3xl text-white text-center pb-3 border-b-3 border-white">My Ghalas</p>

{loading && <p className="text-green-500">Loading...</p>}

{!loading && !hasGhalas && (
  <div className="text-center">
    <p>You haven't rented yet. <a href="/ghalas" className="text-green-500">Rent now</a></p>
  </div>
)}

{!loading && hasGhalas && (
  <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "flex-end" }}>
    {myghala.map((ghala) => (
      <div key={ghala.id} className="ml-4">
        <div className="shadow-md p-2 rounded-md border-1 border-green-500 bg-white p-3">
          <a className="absolute top-2 right-2 btn text-white text-bold" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
          </a>
          <p className="font-medium mb-2 pb-2 border-b-2 border-green-500">Ghala: {ghala.ghala_name}</p>
          <p className="">
            <span>Commodity stored: {ghala.commodity_name}</span></p>
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

{selectedGhala && (
<Modal
open={selectedGhala !== null}
onClose={() => setSelectedGhala(null)}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={modalStyle2} className="text-center">
  <p className="text-3xl text-white text-center border-b-1 border-green-500">Sell Commodity</p>
  <div className=" ">
    <p className="text-3xl">
      <span className="font-medium pb-3 border-b-2 border-gray-700 border-shadow"></span> {selectedGhala.ghala_name}
    </p>
    <p className="text-2xl">
      <span >Bags Stored:</span> {selectedGhala.bags_stored}
    </p>
  </div>
  <input
    className="border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 w-full px-3 py-2 rounded-md"
    type="number"
    placeholder="Enter bags to sell"
    value={bagsToSell}
    onChange={(e) => setBagsToSell(parseInt(e.target.value, 10))}
  />
  <p>Price: Ksh{selectedGhala.commodity_stored.commodity_price}</p>
  <button
    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
    type="submit"
  onClick={handleSellCommodity}>Sell</button>
          
          </Box>
        </Modal>
      )}
    </div>
  );
}
