import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { Loading } from "../components/Loading";
import { PhotoCard } from "../components/PhotoCard";

const GetSinglePhoto = gql`
  query getSinglePhoto($id: ID!) {
    photo(id: $id) {
      id
      categoryId
      src
      likes
      userId
      liked
    }
  }
`;

export function PhotoCardQuery({ id }) {
  const { loading, error, data } = useQuery(GetSinglePhoto, {
    variables: { id }
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <span role="img" aria-labelledby="emoji">
        Error! ⛔
      </span>
    );
  }

  return <PhotoCard {...data.photo} />;
}
