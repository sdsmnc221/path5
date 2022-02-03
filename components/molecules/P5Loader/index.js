import React, { useState, useEffect, useCallback, useRef } from "react";
import WebglLoader from "../../p5/WebglLoader";
import SketchNode from "../SketchNode";
import { Container } from "./index.style";

const P5Loader = ({ visible }) => {
  return (
    <Container visible={visible}>
      <SketchNode exec={WebglLoader} />
    </Container>
  );
};

export default P5Loader;
