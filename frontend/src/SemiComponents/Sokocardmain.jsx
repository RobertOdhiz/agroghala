import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function SokoCard(props) {
  const { image, commodity, price } = props;

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={image}
        className="h-50"
        alt={commodity}
      />
      <CardContent>
        <p>{commodity}</p>
        <p>Ksh. {price}</p>
      </CardContent>
    </Card>
  );
}
