import { Dish } from "./Dish";

class Order {
  id: number;
  jedi: Dish[];
  kraj: string;
  hisnaStevilka: string;

  constructor(id: number, jedi: Dish[], kraj: string, hisnaStevilka: string) {
    this.id = id;
    this.jedi = jedi;
    this.kraj = kraj;
    this.hisnaStevilka = hisnaStevilka;
  }
}

export { Order };
