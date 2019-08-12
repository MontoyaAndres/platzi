import React, { useContext } from "react";

import { Context } from "../../Context";
import { Button } from "../../components/Button";

export function Profile() {
  const { removeAuth } = useContext(Context);

  return <Button onClick={removeAuth}>Cerrar sesión</Button>;
}

export default Profile;
