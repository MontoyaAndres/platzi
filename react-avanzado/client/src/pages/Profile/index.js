import React, { useContext } from "react";

import { Context } from "../../Context";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/Button";

export function Profile() {
  const { removeAuth } = useContext(Context);

  return (
    <Layout title="Tu perfil">
      <Button onClick={removeAuth}>Cerrar sesión</Button>
    </Layout>
  );
}

export default Profile;
