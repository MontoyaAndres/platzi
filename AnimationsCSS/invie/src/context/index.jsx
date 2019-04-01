import React, { useState } from "react";

import logoPortada from "../images/invie.png";
import acustica from "../images/invie-acustica.png";
import classic from "../images/invie-classic.png";

const data = {
  menu: [
    {
      href: "index.html",
      title: "home"
    },
    {
      href: "#guitarras",
      title: "Guitarras"
    },
    {
      href: "precios.html",
      title: "Precios"
    }
  ],
  logoPortada,
  guitarras: [
    {
      image: acustica,
      alt: "Guitarra Invie Acustica",
      name: "Invie Acustica",
      features: [
        "Estilo vintage",
        "Madera pura",
        "Incluye estuche invisible de aluminio"
      ]
    },
    {
      image: classic,
      alt: "Guitarra Invie Acustica",
      name: "Invie Classic",
      features: ["Estilo vintage", "Liviana", "Empieza tu camino como Rockstar"]
    }
  ]
};

export const DataContext = React.createContext(null);

export function DataContextProvier({ children }) {
  const [value, setValue] = useState(data);

  function setData() {
    setValue({ ...value, menu: [{ href: "index.html", title: "home" }] });
  }

  return (
    <DataContext.Provider value={[value, setData]}>
      {children}
    </DataContext.Provider>
  );
}
