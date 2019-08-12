import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Login = gql`
  mutation login($input: UserCredentials!) {
    login(input: $input)
  }
`;

export const LoginMutation = ({ children }) => {
  const login = useMutation(Login);

  return children({ login });
};
