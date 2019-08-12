import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { ListOfFavs } from "../components/ListOfFavs";
import { Loading } from "../components/Loading";

const GetFavs = gql`
  query getFavs {
    favs {
      id
      categoryId
      src
      likes
      userId
    }
  }
`;

export const FavsQuery = () => {
  const { loading, error, data } = useQuery(GetFavs, {
    fetchPolicy: "network-only"
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

  return <ListOfFavs favs={data.favs} />;
};
