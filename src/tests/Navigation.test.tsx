import { render } from "@testing-library/react";
import Navigation from "../components/Navigation";
import { Dish, Kategorija } from "../components/Classes/Dish";
import { BrowserRouter as Router } from "react-router-dom";

it("dodajanje izdelkov v košarico", () => {
  let kosarica: Dish[] = [];
  kosarica.push(
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
  kosarica.push(
    new Dish(
      5,
      "Panna cotta",
      Kategorija.sladica,
      "Slastna panna cotta.",
      ["laktoza", "gluten"],
      ["sladka smetan", "maline", "mleko", "sladkor"],
      4.5,
      "https://leaneen.com/wp-content/uploads/2018/04/Panna-cotta-z-jagodnim-pirejem-8-of-10-1.jpg"
    )
  );

  const utils = render(
    <Router>
      <Navigation kosarica={kosarica}></Navigation>
    </Router>
  );
  expect(utils.container.querySelector("#stevecKosarica")?.textContent).toEqual(
    "2"
  );
});
