import React from "react";

import { ListOfCategories } from "../../components/ListOfCategories";
import { ListOfPhotoCards } from "../../containers/ListOfPhotoCards";

export const Home = ({ id }) => {
  return (
    <>
      <ListOfCategories />
      <ListOfPhotoCards categoryId={id} />
    </>
  );
};
