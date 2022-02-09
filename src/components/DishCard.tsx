import React, { FC, SyntheticEvent, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Dish } from "./Classes/Dish";
import DishCardModal from "./DishCardModal";

interface DishCardProps {
  jed: Dish;
  dodaj: (jed: Dish) => void;
  handleClickOpen: (jed: Dish) => void;
}

const DishCard: FC<DishCardProps> = ({ jed, dodaj, handleClickOpen }) => {
  console.log(jed);

  return (
    <>
      <Card
        sx={{ maxWidth: 345 }}
        style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)", cursor: "pointer" }}
        onClick={(e: any) => e.target.type != "button" && handleClickOpen(jed)}
      >
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={jed.naziv}
          subheader={jed.kategorija}
        />
        <CardMedia
          component="img"
          height="194"
          image={jed.slika}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {jed.opis}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <p>{jed.cena}€</p>
          <Button variant="contained" onClick={() => dodaj(jed)}>
            V košarico
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default DishCard;
