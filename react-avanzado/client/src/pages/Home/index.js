import React from "react";
import { Helmet } from "react-helmet";

import { ListOfCategories } from "../../components/ListOfCategories";
import { ListOfPhotoCards } from "../../containers/ListOfPhotoCards";

const HomePage = ({ id }) => {
  return (
    <>
      <Helmet>
        <title>Petgram - Tu app de fotos de mascotas</title>
        <meta
          name="description"
          content="Con Petgram puedes encontrar fotos de animales domésticos muy fácilmente"
        />
      </Helmet>
      <ListOfCategories />
      <ListOfPhotoCards categoryId={id} />
    </>
  );
};

export const Home = React.memo(HomePage, (prevProps, props) => {
  return prevProps.id === props.id;
});
