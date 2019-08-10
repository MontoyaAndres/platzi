import React, { useState } from "react";

import { Article, Img, ImgWrapper } from "./styles";
import { useNearScreen } from "../../hooks/useNearScreen";
import { ToggleLikeMutation } from "../../containers/ToggleLikeMutation";
import { FavButton } from "../FavButton";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60";

export const PhotoCard = ({ id = 0, likes = 0, src = DEFAULT_IMAGE }) => {
  const [show, ref] = useNearScreen();
  const [like, setLike] = useState(`like-${id}`);

  return (
    <Article ref={ref}>
      {show && (
        <>
          <a href={`/?detail=${id}`}>
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </a>

          <ToggleLikeMutation>
            {({ mutation }) => {
              const handleFavClick = e => {
                e.preventDefault();
                setLike(!like);
                !like && mutation({ variables: { input: { id } } });
              };

              return (
                <FavButton
                  liked={like}
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
