import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Spritesheet from "../../../assets/images/spritesheet.png";

const mask = keyframes`
  from {
    -webkit-mask-position: 0% 0;
    mask-position: 0% 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
`;

export const Container = styled.div`
  .loader {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-size: 64px 64px;
    background-image: linear-gradient(to right, white 1px, transparent 1px),
      linear-gradient(to bottom, white 1px, transparent 1px);
    background-color: #ea2560;
    z-index: 999;
    background-color: #ea2560;
    -webkit-mask: url("${Spritesheet.src}");
    mask: url("${Spritesheet.src}");
    -webkit-mask-size: 2300% 100%;
    mask-size: 2300% 100%;
    overflow: visible;
    display: none;
    pointer-events: none;
  }

  .loading {
    display: block;
    pointer-events: auto;
    -webkit-animation: ${mask} 3.2s steps(22) forwards;
    animation: ${mask} 3.2s steps(22) forwards;
    animation-play-state: running;
  }

  .delay {
    animation-delay: 1.6s;
  }
`;
