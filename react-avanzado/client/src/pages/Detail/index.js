import React from "react";

import { PhotoCardQuery } from "../../containers/PhotoCardQuery";
import { Layout } from "../../components/Layout";

export const Detail = ({ id }) => {
  return (
    <Layout title={`Fotografía ${id}`}>
      <PhotoCardQuery id={id} />
    </Layout>
  );
};
