import React, { useState } from "react";
import { Dish } from "./Classes/Dish";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./styles/home.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Order } from "./Classes/Order";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CardProps {
  kosarica: Dish[];
  odstraniIzKosarice: (jed?: Dish, jedi?: Dish[]) => void;
  dodajvSeznamNarocil: (izbranKraj: string, hisnaSt: string) => void;
}

const kraji: string[] = [
  "Maribor",
  "Ljubljana",
  "Novo mesto",
  "Celje",
  "Murska Sobota",
  "Koper",
];

const hisneSt: string[] = [
  "Groharjeva 10",
  "Vrtna ulica 6",
  "38b Brdinje",
  "Savska cesta 20",
  "Kettejeva 4",
];

function Card({
  kosarica,
  odstraniIzKosarice,
  dodajvSeznamNarocil,
}: CardProps) {
  const [izbranKraj, setIzbranKraj] = React.useState<string>("Maribor");
  const [hisnaSt, setHisnaSt] = React.useState<string>("Groharjeva 10");
  const [open, setOpen] = React.useState<boolean>(false);
  const [alertText, setalertText] = useState<string>("");
  const [alertColor, setalertColor] = useState<any>("error");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChangeKraj = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIzbranKraj(event.target.value);
  };

  const handleChangeHisna = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHisnaSt(event.target.value);
  };

  const izvedbaNarocila = () => {
    if (kosarica.length !== 0) {
      dodajvSeznamNarocil(izbranKraj, hisnaSt);
      odstraniIzKosarice(kosarica[0], kosarica);
      setalertText("Hvala za nakup!");
      setalertColor("success");
      setOpen(true);
    } else {
      setalertText("Košarica ne sme biti prazna!");
      setalertColor("error");
      setOpen(true);
    }
  };

  return (
    <main>
      <h2>Košarica</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Naziv jedi</TableCell>
              <TableCell align="right">Kategorija</TableCell>
              <TableCell align="right">Cena</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kosarica.map((jed, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {jed.naziv}
                </TableCell>
                <TableCell align="right">{jed.kategorija}</TableCell>
                <TableCell align="right">{jed.cena}€</TableCell>
                <TableCell align="right">
                  {" "}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => odstraniIzKosarice(jed)}
                  >
                    odstrani
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TextField
        id="standard-select-currency"
        select
        label="DOSTAVA"
        value={izbranKraj}
        onChange={handleChangeKraj}
        helperText="Izberite kraj dostave"
        variant="standard"
        style={{ margin: "15px 0px " }}
      >
        {kraji.map((kraj, index) => (
          <MenuItem key={index} value={kraj}>
            {kraj}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <TextField
        id="standard-select-currency"
        select
        label=""
        value={hisnaSt}
        onChange={handleChangeHisna}
        helperText="Izberite hišno številko"
        variant="standard"
        style={{ margin: "15px 0px " }}
      >
        {hisneSt.map((hisnaStevilka, index) => (
          <MenuItem key={index} value={hisnaStevilka}>
            {hisnaStevilka}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <Button
        variant="contained"
        color="warning"
        style={{ margin: "25px 0px" }}
        onClick={izvedbaNarocila}
      >
        Nakup
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={alertColor}>{alertText}</Alert>
      </Snackbar>
    </main>
  );
}

export default Card;
