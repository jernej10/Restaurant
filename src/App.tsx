import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import AboutUs from "./components/AboutUs";
import Card from "./components/Card";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dish, Kategorija } from "./components/Classes/Dish";
import { Order } from "./components/Classes/Order";

//--------------------------
// vse jedi
let jedi: Dish[] = new Array();
jedi.push(
  new Dish(
    1,
    "Piščanec s solato",
    Kategorija.glavnaJed,
    "Odličen piščanec s solato.",
    ["laktoza", "gluten"],
    ["piščanec", "solata"],
    12,
    "https://images.unsplash.com/photo-1602253057119-44d745d9b860?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaHxlbnwwfHwwfHw%3D&w=1000&q=80"
  )
);
jedi.push(
  new Dish(
    2,
    "Špageti bolognese",
    Kategorija.glavnaJed,
    "Odlični špageti.",
    ["laktoza"],
    ["rezanci", "mleto meso", "mezga"],
    9,
    "https://odprtakuhinja.delo.si/wp-content/uploads/2020/07/Odprta-kuhinja-bolonjska-1024x768.jpg"
  )
);
jedi.push(
  new Dish(
    3,
    "Obloženi kruhki",
    Kategorija.predjed,
    "Odlični obloženi kruhki.",
    ["laktoza"],
    ["kruh", "pršut", "sir"],
    5,
    "https://www.zenskisvet.si/modules/uploader/uploads/news/pictures_news/oblozeni_kruhki_kot_jih_se_niste_videli.jpg"
  )
);
jedi.push(
  new Dish(
    4,
    "Panna cotta",
    Kategorija.sladica,
    "Slastna panna cotta.",
    ["laktoza", "gluten"],
    ["sladka smetan", "maline", "mleko", "sladkor"],
    4.5,
    "https://leaneen.com/wp-content/uploads/2018/04/Panna-cotta-z-jagodnim-pirejem-8-of-10-1.jpg"
  )
);
jedi.push(
  new Dish(
    5,
    "Čokoladni mousse",
    Kategorija.sladica,
    "Slasten čokoladni mousse.",
    ["oreščki"],
    ["temna čokolada", "jajca", "sladkor"],
    4.5,
    "https://www.citylife.si/storage/image/201703//standard/cld44q7vyaaq53.jpg"
  )
);

//kosarica
let kosarica: Dish[] = new Array();

//------------------------------

function App() {
  const [kosarica, setkosarica] = useState<Dish[]>([]);
  const [seznamNarocil, setseznamNarocil] = useState<Order[]>([]);
  const [dishes, setdishes] = useState<Dish[]>(jedi);

  const dodajvKosarico = (jed: Dish) => {
    setkosarica((kosarica) => [...kosarica, jed]);
  };

  const dodajvSeznamNarocil = (izbranKraj: string, hisnaSt: string) => {
    setseznamNarocil((seznam) => [
      ...seznam,
      new Order(seznamNarocil.length + 1, kosarica, izbranKraj, hisnaSt),
    ]);
  };

  const dodajkJedilniku = (jed: Dish) => {
    setdishes((jedi) => [...jedi, jed]);
  };

  const odstraniIzKosarice = (jed?: Dish, jedi?: Dish[]) => {
    if (typeof jed !== "undefined") {
      let filteredKosarica = kosarica.filter((item) => item !== jed);
      setkosarica(filteredKosarica);
    }

    if (typeof jedi !== "undefined") {
      setkosarica(new Array());
    }
  };

  const odstraniIzSeznamaJedi = (jed: Dish) => {
    let filteredJedi = dishes.filter((item) => item !== jed);
    setdishes(filteredJedi);
  };

  const odstraniIzSeznamaNarocil = (narocilo: Order) => {
    let filteredSeznam = seznamNarocil.filter((item) => item !== narocilo);
    setseznamNarocil(filteredSeznam);
  };

  const updateJed = (jed: Dish) => {
    let updateDishes = dishes.map((item) => (item.id === jed.id ? jed : item));
    console.log("to", updateDishes);

    setdishes(updateDishes);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation kosarica={kosarica}></Navigation>

        <Routes>
          <Route
            path="/"
            element={<Home jedi={dishes} dodajvKosarico={dodajvKosarico} />}
          ></Route>
          <Route
            path="/kosarica"
            element={
              <Card
                kosarica={kosarica}
                odstraniIzKosarice={odstraniIzKosarice}
                dodajvSeznamNarocil={dodajvSeznamNarocil}
              />
            }
          ></Route>
          <Route path="/aboutus" element={<AboutUs />}></Route>
          <Route
            path="/user"
            element={
              <UserProfile
                seznamNarocil={seznamNarocil}
                odstraniIzSeznamaNarocil={odstraniIzSeznamaNarocil}
                dodajkJedilniku={dodajkJedilniku}
                dishes={dishes}
                odstraniIzSeznamaJedi={odstraniIzSeznamaJedi}
                updateJed={updateJed}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
