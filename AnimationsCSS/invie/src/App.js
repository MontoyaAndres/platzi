import React, { memo, useContext } from "react";
import cheet from "cheet.js";

import "./css/invie.css";
import "./css/animations.css";

import Portada from "./components/Portada";
import Guitarras from "./components/Guitarras";
import Footer from "./components/Footer";
import { DataContext } from "./context";

const App = () => {
  const [data, setData] = useContext(DataContext);

  cheet("i n v i e", function() {
    setData(true);
  });

  cheet("g o b a c k", function() {
    setData(false);
  });

  return (
    <section className="Invie">
      <Portada
        menu={data.menu}
        logo={data.logoPortada}
        isAnimated={data.isAnimated}
      />
      <Guitarras guitarras={data.guitarras} />
      <Footer />
    </section>
  );
};

export default memo(App);
