import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const SignupMutation = gql`
  mutation signup($input: UserCredentials!) {
    signup(input: $input)
  }
`;

export const RegisterMutation = ({ children }) => {
  const signup = useMutation(SignupMutation);

  return children({ signup });
};
