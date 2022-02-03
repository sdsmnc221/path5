import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const ldsfb = keyframes`
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #ea2560;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  display: ${({ visible }) => (visible ? "block" : "none")};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};

  .instafeed__gallery {
    visibility: hidden;
  }

  > div:nth-of-type(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 320%;
    height: 320%;
    transform: translate(-50%, -50%) rotate(64deg);
    background-size: 64px 64px;
    background-image: linear-gradient(to right, white 1px, transparent 1px),
      linear-gradient(to bottom, white 1px, transparent 1px);
  }

  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-64deg);
  }

  button {
    position: absolute;
    top: 32px;
    right: 32px;
  }
`;
