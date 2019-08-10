import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Loading } from "../components/Loading";
import { ListOfPhotoCardsComponent } from "../components/ListOfPhotoCards";
import { GetPhotos } from "../graphql/query";

export function ListOfPhotoCards() {
  const { loading, data } = useQuery(GetPhotos);

  if (loading) {
    return <Loading />;
  }

  return <ListOfPhotoCardsComponent data={data} />;
}
