import React from "react";
import { Link } from "@reach/router";

import { Article, Img, ImgWrapper } from "./styles";
import { useNearScreen } from "../../hooks/useNearScreen";
import { ToggleLikeMutation } from "../../containers/ToggleLikeMutation";
import { FavButton } from "../FavButton";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60";

export const PhotoCard = ({
  id = 0,
  liked,
  likes = 0,
  src = DEFAULT_IMAGE
}) => {
  const [show, ref] = useNearScreen();

  return (
    <Article ref={ref}>
      {show && (
        <>
          <Link to={`/detail/${id}`}>
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </Link>

          <ToggleLikeMutation>
            {({ mutation }) => {
              const handleFavClick = () => {
                mutation({ variables: { input: { id } } });
              };

              return (
                <FavButton
                  liked={liked}
                  likes={likes}
                  onClick={handleFavClick}
                />
              );
            }}
          </ToggleLikeMutation>
        </>
      )}
    </Article>
  );
};
