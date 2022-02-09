import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Dish } from "./Classes/Dish";

interface DishCardModalProps {
  handleClose: () => void;
  open: boolean;
  izbranaJed: Dish;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function DishCardModal({ handleClose, open, izbranaJed }: DishCardModalProps) {
  console.log("IZBRANA JED", izbranaJed);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{izbranaJed.naziv}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p>|{izbranaJed.kategorija}|</p>
            <p>{izbranaJed.opis}</p>
            <h2>Sestavine:</h2>
            <ul>
              {izbranaJed.sestavine.map((sestavina, index) => (
                <li key={index}>{sestavina}</li>
              ))}
            </ul>
            <h2>Alergeni</h2>
            <ul>
              {izbranaJed.alergeni.map((alergen, index) => (
                <li key={index}>{alergen}</li>
              ))}
            </ul>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DishCardModal;
