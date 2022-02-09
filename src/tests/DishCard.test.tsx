import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/react";
import DishCard from "../components/DishCard";
import { Dish, Kategorija } from "../components/Classes/Dish";

it("pogled jedi", () => {
  const handleAdd = jest.fn();
  const handleOpen = jest.fn();

  const utils = render(
    <DishCard
      jed={
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
      }
      dodaj={handleAdd}
      handleClickOpen={handleOpen}
    />
  );

  expect(utils.queryByText("Panna cotta")).toBeTruthy();
  expect(utils.queryByText("Slastna panna cotta.")).toBeTruthy();
  expect(utils.queryByText("4.5€")).toBeTruthy();
  expect(utils.queryByText("Sladica")).toBeTruthy();
});
