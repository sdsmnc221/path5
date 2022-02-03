import styled from "@emotion/styled";

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  display: ${({ visible }) => (visible ? "block" : "none")};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  z-index: 99;

  .instamodal {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    iframe {
      border: none;
      height: 507px;
    }
  }

  button {
    position: absolute;
    top: 32px;
    right: 32px;
  }
`;
