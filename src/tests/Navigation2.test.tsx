import { render } from "@testing-library/react";
import Navigation from "../components/Navigation";
import { Dish, Kategorija } from "../components/Classes/Dish";
import { BrowserRouter as Router } from "react-router-dom";

it("dodajanje izdelkov v košarico", () => {
  let kosarica: Dish[] = [];

  const utils = render(
    <Router>
      <Navigation kosarica={kosarica}></Navigation>
    </Router>
  );
  expect(utils.container.querySelector("#stevecKosarica")?.textContent).toEqual(
    ""
  );
});
