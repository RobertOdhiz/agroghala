import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const modalStyle = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%", // Set to the desired width
  height: "50%", // Set to the desired height
  bgcolor: "#4CAF50",
  boxShadow: 24,
  p: 3,
  overflowX: "auto", // Enable horizontal scrolling
  whiteSpace: "nowrap", // Prevent text wrapping
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column", // Display content in a column layout
  justifyContent: "center", // Vertically center content
  alignItems: "center", // Horizontally center content
};

const centerText = {
  textAlign: "center",
};

const cancelButtonStyle = {
  backgroundColor: "white", // Adjust the background color as needed
  color: "#FF5733",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  position: "absolute",
  bottom: "16px",
  right: "16px",
};

export default function SellCommodityModal(props) {
  const { open, onClose, selectedGhala, onSellCommodity } = props;
  const [bagsToSell, setBagsToSell] = useState(0);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleSellButtonClick = () => {
    if (bagsToSell <= selectedGhala.bags_stored) {
      onSellCommodity(selectedGhala.id, bagsToSell);
      setSuccessModalOpen(true); // Open the success modal here
    } else {
      alert("Bags sold must be lower than what you have.");
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
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
            className="bg-green-500 hover.bg-green-600 text-white py-2 px-4 rounded-md"
            type="submit"
            onClick={handleSellButtonClick}
          >
            Sell
          </button>
        </Box>
      </Modal>

      {/* Success Modal */}
      <Modal
        open={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          onClose(); // Close the main modal when success modal is closed
        }}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box sx={modalStyle}>
          <div style={centerText}>
          <div className="flex justify-center items-center mb-4 text-white">
            <p className="text-3xl mr-2">Success</p>
            <p>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-bag-check"
                viewBox="0 0 16 16"
                >
                <path
                    fill-rule="evenodd"
                    d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                />
                <path
                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a1 1 0 0 1 1 1H3a1 1 0 0 1-1-1V5z"
                />
                </svg>
            </p>
            </div>

            <p className="text-white mt-4">
              Your commodity has been sold successfully.
              </p>
              <p className="text-white">
              Wait for a confirmation shortly.
            </p>
            <button
              style={cancelButtonStyle} // Cancel button in the success modal
              onClick={() => {
                setSuccessModalOpen(false);
                onClose(); // Close the main modal when success modal is closed
              }}
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
