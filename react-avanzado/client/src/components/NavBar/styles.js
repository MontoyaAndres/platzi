import styled from "styled-components";
import { Link as LinkRouter } from "@reach/router";

import { fadeIn } from "../../styles/animation";

export const Link = styled(LinkRouter)`
  transition: color 0.5s ease;
  align-items: center;
  color: #888;
  display: inline-flex;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  width: 100%;

  &[aria-current] {
    color: #000;

    &:after {
      ${fadeIn({ time: "0.5s" })};
      content: "·";
      position: absolute;
      bottom: 0;
      font-size: 34px;
      line-height: 20px;
    }
  }
`;

export const Nav = styled.nav`
  align-items: center;
  background: #fcfcfc;
  border-top: 1px solid #e0e0e0;
  display: flex;
  height: 50px;
  justify-content: space-around;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 500px;
  text-align: center;
  width: 100%;
  z-index: 1000;
`;
