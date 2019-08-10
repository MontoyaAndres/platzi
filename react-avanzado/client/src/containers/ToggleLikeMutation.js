import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const likeAnonymousPhoto = gql`
  mutation likeAnonymousPhoto($input: LikePhoto!) {
    likeAnonymousPhoto(input: $input) {
      id
      liked
      likes
    }
  }
`;

export const ToggleLikeMutation = ({ children }) => {
  const [mutation] = useMutation(likeAnonymousPhoto);

  return children({ mutation });
};
