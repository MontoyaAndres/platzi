import React, { memo } from "react";

import "./css/invie.css";
import Portada from "./components/Portada";
import Guitarras from "./components/Guitarras";
import Footer from "./components/Footer";

const App = () => (
  <section className="Invie">
    <Portada />
    <Guitarras />
    <Footer />
  </section>
);

export default memo(App);
