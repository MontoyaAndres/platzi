import React, { useState } from "react";

import logoPortada from "../images/invie.png";
import logoPlatzi from "../images/platzi.png";
import acustica from "../images/invie-acustica.png";
import classic from "../images/invie-classic.png";
import easterA from "../images/easter-a.png";
import easterB from "../images/easter-b.png";

const data = {
  isAnimated: false,
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
      alt: "Guitarra Invie Classic",
      name: "Invie Classic",
      features: ["Estilo vintage", "Liviana", "Empieza tu camino como Rockstar"]
    }
  ]
};

const easter = {
  isAnimated: "is-animated",
  menu: [],
  logoPortada: logoPlatzi,
  guitarras: [
    {
      image: easterA,
      alt: "Guitarra padre de familia",
      name: "Invie Familiar",
      features: [
        "Lista para copiar a los Simpsons",
        "Aire puro",
        "Chistes malos"
      ]
    },
    {
      image: easterB,
      alt: "Guitarra Invie Classic",
      name: "Invie Anime",
      features: ["Estilo vintage", "Liviana", "Empieza tu camino como Rockstar"]
    }
  ]
};

export const DataContext = React.createContext(null);

export function DataContextProvier({ children }) {
  const [value, setValue] = useState(data);

  function setData(initial) {
    if (initial) {
      setValue({ ...value, ...easter });
    } else {
      setValue({ ...easter, ...data });
    }
  }

  return (
    <DataContext.Provider value={[value, setData]}>
      {children}
    </DataContext.Provider>
  );
}
