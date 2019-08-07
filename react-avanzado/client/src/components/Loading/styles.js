import styled, { keyframes } from "styled-components";

const rotateFrames = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: 1.5s ${rotateFrames} linear infinite;
  border: 5px solid violet;
  border-right: 5px solid transparent;
  border-radius: 50%;
  height: 60px;
  margin-bottom: 10px;
  margin-left: calc(50% - 40px);
  width: 60px;
`;
