import React, { useEffect, useRef } from "react";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

const SketchNode = ({ exec, funcs, doExec, ...rest }) => {
  const containerRef = useRef();

  const Sketch = (p) => exec(p, funcs);

  const inView = useIntersectionObserver({ ref: containerRef });

  useEffect(() => {
    let P5;
    if (containerRef.current && inView) {
      console.log(containerRef.current);
      const p5 = require("p5");
      P5 = new p5(Sketch, containerRef.current);
    } else P5 = null;

    return () => {
      P5 = null;
      if (containerRef && containerRef.current)
        containerRef.current.innerHTML = "";
    };
  }, [containerRef, inView]);

  return <div ref={containerRef} {...rest}></div>;
};

export default SketchNode;
