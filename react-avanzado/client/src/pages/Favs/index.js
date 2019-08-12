import React from "react";

import { FavsQuery } from "../../containers/FavsQuery";
import { Layout } from "../../components/Layout";

export function Favs() {
  return (
    <Layout
      title="Tus favoritos"
      subtitle="Aquí tienes las fotos que te han gustado"
    >
      <FavsQuery />
    </Layout>
  );
}
