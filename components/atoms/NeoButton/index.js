import React from "react";
import { Container } from "./index.style";

const NeoButton = ({ label, size = 64, className = "", html }) => {
  return html ? (
    <Container
      size={size}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <Container size={size} className={className}>
      {label && <span>{label}</span>}
    </Container>
  );
};

export default NeoButton;
