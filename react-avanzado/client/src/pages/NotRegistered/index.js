import React, { useContext } from "react";

import { Context } from "../../Context";
import { UserForm } from "../../components/UserForm";
import { RegisterMutation } from "../../containers/RegisterMutation";
import { LoginMutation } from "../../containers/LoginMutation";

export function NotRegistered() {
  const { activateAuth } = useContext(Context);

  return (
    <>
      <RegisterMutation>
        {({ signup }) => {
          const [mutation, { loading, error }] = signup;

          const handleSubmit = input => {
            mutation({ variables: { input } }).then(({ data }) =>
              activateAuth(data.signup)
            );
          };
          const errorMsg =
            error &&
            "No se puede registrar el usuario. Ya existe o los datos no son correctos.";

          return (
            <UserForm
              error={errorMsg}
              disabled={loading}
              title="Registrarse"
              onSubmit={handleSubmit}
            />
          );
        }}
      </RegisterMutation>

      <LoginMutation>
        {({ login }) => {
          const [mutation, { loading, error }] = login;

          const handleSubmit = input => {
            mutation({ variables: { input } }).then(({ data }) =>
              activateAuth(data.login)
            );
          };
          const errorMsg =
            error &&
            "No se puede iniciar sesión. El usuario no existe o el password no es correcto.";

          return (
            <UserForm
              disabled={loading}
              error={errorMsg}
              title="Iniciar sesión"
              onSubmit={handleSubmit}
            />
          );
        }}
      </LoginMutation>
    </>
  );
}
