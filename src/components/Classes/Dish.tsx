enum Kategorija {
  glavnaJed = "Glavna jed",
  predjed = "Predjed",
  sladica = "Sladica",
  solata = "Solata",
}

class Dish {
  id: number;
  naziv: string;
  kategorija: string;
  opis: string;
  alergeni: string[];
  sestavine: string[];
  cena: number;
  slika: string;

  constructor(
    id: number,
    naziv: string,
    kategorija: string,
    opis: string,
    alergeni: string[],
    sestavine: string[],
    cena: number,
    slika: string
  ) {
    this.id = id;
    this.naziv = naziv;
    this.kategorija = kategorija;
    this.opis = opis;
    this.alergeni = alergeni;
    this.sestavine = sestavine;
    this.cena = cena;
    this.slika = slika;
  }
}

export { Dish, Kategorija };
