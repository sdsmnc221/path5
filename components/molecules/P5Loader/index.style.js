import styled from "@emotion/styled";

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 64px 64px;
  background-image: linear-gradient(to right, white 1px, transparent 1px),
    linear-gradient(to bottom, white 1px, transparent 1px);
  background-color: #ea2560;
  z-index: 999;
  transition: all ease 1.6s;
  overflow: hidden;
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  opacity: ${({ visible }) => (visible ? 1 : 0)};

  div {
    width: 100%;
    height: 100%;
  }
`;
