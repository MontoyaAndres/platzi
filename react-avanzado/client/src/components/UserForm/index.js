import React from "react";

import { Error, Form, Input, Title } from "./styles";
import { Button } from "../Button";
import { useInputValue } from "../../hooks/useInputValue";

export const UserForm = ({ disabled, error, title, onSubmit }) => {
  const email = useInputValue("");
  const password = useInputValue("");

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ email: email.value, password: password.value });
  };

  return (
    <>
      <Form disabled={disabled} onSubmit={handleSubmit}>
        <Title>{title}</Title>
        <Input placeholder="Email" {...email} />
        <Input placeholder="Password" type="password" {...password} />
        <Button>{title}</Button>
      </Form>
      {error && <Error>{error}</Error>}
    </>
  );
};
