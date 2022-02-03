import React, { useContext, useEffect, useState } from "react";
import { Container, Loader } from "./index.style";
import Instafeed from "instafeed.js";
import SketchNode from "../SketchNode";
import InfiniteGallery from "../../p5/InfiniteGallery";
import { InstaContext } from "../../../context/InstaProvider";
import { enableScroll } from "../../../utils/enableScroll";
import P5Loader from "../P5Loader";

const InstaFeed = ({ visible }) => {
  const { setGalleryVisible, setModalVisible, setId } =
    useContext(InstaContext);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    const feed = new Instafeed({
      accessToken:
        "IGQVJVZAHNoWE5uclZAaLU1HZAnNKNVVSOEQxa19yWnBQdTVGQll6UFRuX0RHdzZAkeWQ5ZA0FtclloUVo3WFh1UFo5UDZAkNTJlUzF1UDlIVnRrQUtfdnhNSWpRVnRZAb0lId25wWFJDRlZAkNjJSWXlhblNSZAAZDZD",
      template:
        '<figure class="instafeed__figure"><a href="{{link}}"><img class="instafeed__image" title="{{caption}}" crossorigin="anonymous" src="{{image}}" /></a></figure>',
      limit: 100,
    });
    feed.run();

    setTimeout(() => setLoaderVisible(false), 4800);

    return () => {};
  }, []);

  return (
    <Container className="instafeed" visible={visible}>
      <div id="instafeed" className="instafeed__gallery"></div>
      <SketchNode exec={InfiniteGallery} funcs={{ setModalVisible, setId }} />
      <button
        onClick={() => {
          setGalleryVisible(false);
          enableScroll();
        }}
      >
        Close
      </button>
      {loaderVisible && <P5Loader visible={loaderVisible} />}
    </Container>
  );
};

export default InstaFeed;
