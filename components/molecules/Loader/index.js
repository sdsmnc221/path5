import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "./index.style";

const Loader = () => {
  const [hidden, setHidden] = useState("");
  const [visibilityChange, setVisibilityChange] = useState("");
  const [loaderVisible, setLoaderVisible] = useState(true);
  const loaderRef = useRef(null);

  const handleVisibilityChange = useCallback(() => {
    setLoaderVisible(document.visibilityState == "visible");
  }, [loaderVisible]);

  useEffect(() => {
    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 and Firefox 18 and later support
      setHidden("hidden");
      setVisibilityChange("visibilitychange");
    } else if (typeof document.msHidden !== "undefined") {
      setHidden("mshidden");
      setVisibilityChange("msvisibilitychange");
    } else if (typeof document.webkitHidden !== "undefined") {
      setHidden("webkithidden");
      setVisibilityChange("webkitvisibilitychange");
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (
      typeof document.addEventListener === "undefined" ||
      hidden === undefined
    ) {
      console.log(
        "This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
      );
    } else {
      // Handle page visibility change
      document.addEventListener(
        visibilityChange,
        handleVisibilityChange,
        false
      );

      // When the video pauses
    }

    if (loaderRef.current) {
      loaderRef.current.classList.add("delay");
      setTimeout(() => {
        loaderRef.current.classList.remove("delay");
      }, 1600);
    }

    return () => {
      document.removeEventListener(
        visibilityChange,
        handleVisibilityChange,
        false
      );
    };
  }, []);

  useEffect(() => {
    if (loaderRef.current) {
      console.log(loaderRef.current.classList);
      if (loaderVisible) {
        loaderRef.current.classList.add("loading");

        if (loaderRef.current.classList.contains("loading")) {
          setTimeout(() => {
            loaderRef.current.classList.remove("loading");
          }, 3200);
        }
      }
    }
  }, [loaderRef.current, loaderVisible]);

  return (
    <Container>
      <div ref={loaderRef} className="loader"></div>
    </Container>
  );
};

export default Loader;
