import React, { useState, useEffect } from "react";
import "./styles/home.css";
import DishCard from "./DishCard";
import { Dish } from "./Classes/Dish";
import DishCardModal from "./DishCardModal";
import Button from "@mui/material/Button";

interface HomeProps {
  jedi: Dish[];
  dodajvKosarico: (jed: Dish) => void;
}

function Home({ jedi, dodajvKosarico }: HomeProps) {
  //const [dishes, setdishes] = useState<Dish[]>(jedi);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(jedi);
  const [open, setOpen] = React.useState(false);
  const [izbranaJed, setIzbranaJed] = React.useState<Dish>(
    new Dish(-1, "", "", "", [], [], 0, "")
  );

  const handleClickOpen = (jed: Dish) => {
    setIzbranaJed(jed);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filtrirajPredjedi = () => {
    setFilteredDishes(jedi.filter((item) => item.kategorija === "Predjed"));
  };

  const filtrirajGlavnoJed = () => {
    setFilteredDishes(jedi.filter((item) => item.kategorija === "Glavna jed"));
  };

  const filtrirajSladice = () => {
    setFilteredDishes(jedi.filter((item) => item.kategorija === "Sladica"));
  };

  const filtrirajSolate = () => {
    setFilteredDishes(jedi.filter((item) => item.kategorija === "Solata"));
  };

  return (
    <div>
      <section className="heroSection">
        <img
          src="https://i.pinimg.com/originals/98/6b/dd/986bdd81b21c8f044cad48ef37b94539.jpg"
          alt="Restaurant"
        />
        <div className="heroTextContainer">
          <h1>VRHUNSKE JEDI IZ NAŠE KUHINJE!</h1>
          <p>
            Svojo kuhinjo gradimo na najboljšem, kar ponuja narava v danih
            letnih časih. Umeščeni smo v območje, ki je bogato s postrvmi,
            divjačino, gozdnim sadjem in divjimi rastlinami, ki jih vsakodnevno
            vključujemo v naše krožnike. Vabljeni!
          </p>
        </div>
      </section>
      <main>
        <h2>Naše jedi</h2>
        <div className="filterContainer">
          <p style={{ color: "grey" }}>Filtriraj:</p>
          <Button variant="outlined" onClick={filtrirajPredjedi}>
            Predjed
          </Button>
          <Button variant="outlined" onClick={filtrirajGlavnoJed}>
            Glavna jed
          </Button>
          <Button variant="outlined" onClick={filtrirajSladice}>
            Sladica
          </Button>
          <Button variant="outlined" onClick={filtrirajSolate}>
            Solata
          </Button>
        </div>

        <div className="cardGrid">
          {filteredDishes.map((jed) => (
            <DishCard
              key={jed.id}
              jed={jed}
              dodaj={dodajvKosarico}
              handleClickOpen={handleClickOpen}
            ></DishCard>
          ))}
        </div>
        <DishCardModal
          handleClose={handleClose}
          open={open}
          izbranaJed={izbranaJed}
        ></DishCardModal>
      </main>
    </div>
  );
}

export default Home;
