import * as React from "react";
import Fab from "@mui/material/Fab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#23ce6b" },
  },
});

export default function FloatingActionButtons(props) {
  return (
    <ThemeProvider theme={theme}>
      <div
        sx={{ "& > :not(style)": { m: 1 } }}
        onClick={props.onClick}
        className=" flex justify-end"
      >
        <Fab variant="extended" color="primary">
          <p className="text-white">View Your Ghalas</p>
        </Fab>
      </div>
    </ThemeProvider>
  );
}
