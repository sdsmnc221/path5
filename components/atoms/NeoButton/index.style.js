import styled from "@emotion/styled";

export const Container = styled.button`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  font-size: ${({ size }) => size}px;
  border-radius: 100%;
  border: none;
  outline: none;
  color: #ea2560;
  transition: all ease-in-out 0.6s;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #ffffff, #ffe6f9);
  box-shadow: 11px 11px 22px #ffe6f9, -22px -22px 22px #ffffff;
  cursor: pointer;

  &:hover {
    transform: translateY(-3p.2x);
    background: linear-gradient(145deg, #ffe6f9, #ffffff);
    box-shadow: 11px 11px 22px #ffe6f9, -11px -11px 22px #ffffff;
  }

  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.6s;
    background-color: #ffe6f9;
    pointer-events: none;
    mix-blend-mode: screen;
    filter: blur(3.2px);
  }

  &:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
  }

  span {
    display: inline-block;
    padding-top: ${({ size }) => size / 2}px;
    pointer-events: none;
    mix-blend-mode: normal;
    transition: all ease-in-out 0.6s;
  }

  * {
    filter: blur(3.2px);
    transition: all ease-in-out 0.6s;
  }

  &:hover * {
    filter: blur(0);
  }

  &.hero-cta {
    position: absolute;
    bottom: 10%;
    right: 32%;
    z-index: 99;

    svg {
      height: 100%;
      width: 100%;

      text {
        transform: scale(2) translate(14%, -2%);
        fill: #ea2560;
      }
    }

    &:hover.hero-cta {
      svg {
        transform: scale(0.8);
      }
    }
  }
`;
