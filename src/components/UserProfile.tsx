import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Order } from "./Classes/Order";
import { Dish, Kategorija } from "./Classes/Dish";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface UserProfileProps {
  seznamNarocil: Order[];
  dishes: Dish[];
  odstraniIzSeznamaNarocil: (narocilo: Order) => void;
  dodajkJedilniku: (jed: Dish) => void;
  odstraniIzSeznamaJedi: (jed: Dish) => void;
  updateJed: (jed: Dish) => void;
}

function UserProfile({
  seznamNarocil,
  odstraniIzSeznamaNarocil,
  dodajkJedilniku,
  dishes,
  odstraniIzSeznamaJedi,
  updateJed,
}: UserProfileProps) {
  console.log("SEZNAM NAROCIL", seznamNarocil);

  const [value, setValue] = useState("1");
  const [imeJedi, setimeJedi] = useState("");
  const [kategorija, setkategorija] = useState("");
  const [opis, setopis] = useState("");
  const [btnTxt, setbtnTxt] = useState("Dodaj jed");
  const [tabTxt, settabTxt] = useState("Dodaj jed");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const sestavine: string[] = [
    "piščanec",
    "zelena solata",
    "jajca",
    "mleko",
    "temna čokolada",
    "govedina",
    "perutnina",
    "svinjina",
    "krompir",
    "riž",
  ];

  const alergeni: string[] = ["laktoza", "oreščki", "gluten"];

  const [izbraneSestavine, setizbranesestavine] = React.useState<string[]>([]);
  const [izbraniAlargeni, setizbranialargeni] = React.useState<string[]>([]);
  const [cena, setcena] = useState<number>(0);
  const [urlslike, seturlslike] = useState<string>("");
  const [izbranaJed, setizbranaJed] = useState<Dish>(
    new Dish(-1, "", "", "", [], [], 0, "")
  );

  const [open, setOpen] = React.useState<boolean>(false);

  /*
  useEffect(() => {
    setbtnTxt("Dodaj jed");
    settabTxt("Dodaj jed");
  }, [value]);
  */

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChangeSestavine = (
    event: SelectChangeEvent<typeof izbraneSestavine>
  ) => {
    const {
      target: { value },
    } = event;
    setizbranesestavine(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeAlergeni = (
    event: SelectChangeEvent<typeof izbraneSestavine>
  ) => {
    const {
      target: { value },
    } = event;
    setizbranialargeni(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const urediJed = (jed: Dish) => {
    setizbranaJed(jed);
    console.log("IZBRANA JED", jed);
    setValue("3");
    setbtnTxt("Uredi jed");
    settabTxt("Uredi jed");
    setimeJedi(jed.naziv);
    setopis(jed.opis);
    setcena(jed.cena);
    seturlslike(jed.slika);
    setkategorija(jed.kategorija);
    setizbranialargeni(jed.alergeni);
    setizbranesestavine(jed.sestavine);
  };

  const handleJed = (e: any) => {
    if (e.target.innerText === "UREDI JED") {
      updateJed(
        new Dish(
          izbranaJed.id,
          imeJedi,
          kategorija,
          opis,
          izbraniAlargeni,
          izbraneSestavine,
          cena,
          urlslike
        )
      );
      setValue("1");
    } else {
      dodajkJedilniku(
        new Dish(
          dishes.length + 1,
          imeJedi,
          kategorija,
          opis,
          izbraniAlargeni,
          izbraneSestavine,
          cena,
          urlslike
        )
      );
      setOpen(true);
    }
  };

  return (
    <div style={{ margin: "1rem 5rem" }}>
      <h2>Admin</h2>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="tabela narocil">
              <Tab label="Seznam jedi" value="1" />
              <Tab label="Seznam naročil" value="2" />
              <Tab label={tabTxt} value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Naziv jedi</TableCell>
                    <TableCell align="right">Kategorija</TableCell>
                    <TableCell align="right">Cena</TableCell>
                    <TableCell align="right">Uredi jed</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dishes.map((jed, index) => (
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
                          color="secondary"
                          onClick={() => urediJed(jed)}
                        >
                          uredi
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => odstraniIzSeznamaJedi(jed)}
                        >
                          odstrani
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value="2">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Jedi</TableCell>
                    <TableCell align="right">Kraj</TableCell>
                    <TableCell align="right">Hišna številka</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {seznamNarocil.map((narocilo, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {narocilo.id}
                      </TableCell>
                      <TableCell align="right">
                        {narocilo.jedi.map((jed) => jed.naziv).toString()}
                      </TableCell>
                      <TableCell align="right">{narocilo.kraj}</TableCell>
                      <TableCell align="right">
                        {narocilo.hisnaStevilka}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => odstraniIzSeznamaNarocil(narocilo)}
                        >
                          opravljeno &#10004;
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>{" "}
          </TabPanel>
          <TabPanel value="3">
            <TextField
              id="standard-basic"
              helperText="Ime jedi"
              variant="standard"
              value={imeJedi}
              onChange={(e) => setimeJedi(e.target.value)}
            />
            <br />
            <TextField
              id="standard-select-currency"
              select
              label=""
              value={kategorija}
              onChange={(e) => setkategorija(e.target.value)}
              helperText="Izberite kategorijo"
              variant="standard"
              style={{ margin: "15px 0px " }}
            >
              <MenuItem value={Kategorija.predjed}>
                {Kategorija.predjed}
              </MenuItem>
              <MenuItem value={Kategorija.glavnaJed}>
                {Kategorija.glavnaJed}
              </MenuItem>
              <MenuItem value={Kategorija.solata}>{Kategorija.solata}</MenuItem>
              <MenuItem value={Kategorija.sladica}>
                {Kategorija.sladica}
              </MenuItem>
            </TextField>
            <br />
            <TextField
              id="standard-multiline-static"
              helperText="Opis jedi"
              multiline
              value={opis}
              rows={5}
              variant="standard"
              onChange={(e) => setopis(e.target.value)}
            />
            <br />
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Sestavine
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={izbraneSestavine}
                onChange={handleChangeSestavine}
                input={<OutlinedInput label="Sestavine" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {sestavine.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={izbraneSestavine.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Alergeni
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={izbraniAlargeni}
                onChange={handleChangeAlergeni}
                input={<OutlinedInput label="Sestavine" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {alergeni.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={izbraniAlargeni.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <TextField
              id="standard-number"
              helperText="Cena(€)"
              type="number"
              value={cena}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={(e) => setcena(parseInt(e.target.value))}
            />
            <br />
            <TextField
              id="standard-basic"
              helperText="URL slike jedi"
              variant="standard"
              value={urlslike}
              onChange={(e) => seturlslike(e.target.value)}
            />
            <br />
            <Button
              variant="contained"
              color="warning"
              style={{ margin: "25px 0px" }}
              onClick={handleJed}
            >
              {btnTxt}
            </Button>
          </TabPanel>
        </TabContext>
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success">Jed dodana!</Alert>
      </Snackbar>
    </div>
  );
}

export default UserProfile;
