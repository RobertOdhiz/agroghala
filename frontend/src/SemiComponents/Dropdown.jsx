import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CropSelect() {
  const [commodity, setcommodity] = React.useState("");

  const handleChange = (event) => {
    setcommodity(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Commodity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={commodity}
          label="Commodity"
          onChange={handleChange}
        >
          <MenuItem Value={0}>Select Commodity</MenuItem>
          <MenuItem Value={1}>Maize</MenuItem>
          <MenuItem value={2}>Beans</MenuItem>
          <MenuItem value={3}>Wheat</MenuItem>
          <MenuItem value={6}>Yam</MenuItem>
          <MenuItem value={4}>Sorghum</MenuItem>
          <MenuItem value={5}>Millet</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
