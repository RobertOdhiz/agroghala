import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="md:px-28 md:mx-20 m-4">
      <div className="  flex justify-center p-4 mb-8">
        <p className="font-thin md:text-5xl text-3xl">Why Choose AgroGhala?</p>
      </div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <div className="bg-[#23CE6B]">
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <p className="text-white text-2xl">Plenty of Storage</p>
          </AccordionSummary>
        </div>
        <AccordionDetails>
          <p className="font-thin text-lg">
            Since we connect numerous warehouses, we have unlimited grain
            storage space for your commodities.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <div className="bg-[#23CE6B]">
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <p className="text-white text-2xl">Affordable Storage</p>
          </AccordionSummary>
        </div>
        <AccordionDetails>
          <p className="font-thin text-lg">
            Agroghala strives to offer plenty of storage at affordable prices
            thus making it accessible to farmers of all income.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <div className="bg-[#23CE6B] ">
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <p className="text-white text-2xl">Accessible Storage Facilities</p>
          </AccordionSummary>
        </div>
        <AccordionDetails>
          <p className="font-thin text-lg">
            The Ghalas on Agroghala are always next to you hence very
            accessible.
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
