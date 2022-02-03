import { useContext, useEffect, useState } from "react";

import Head from "next/head";
import SketchNode from "../components/molecules/SketchNode";
import TextDrawing from "../components/p5/TextDrawing";
import InstaFeed from "../components/molecules/InstaFeed";
import styles from "../styles/Home.module.scss";
import InstaModal from "../components/molecules/InstaModal";
import { InstaContext } from "../context/InstaProvider";
import { disableScroll } from "../utils/enableScroll";
import NeoButton from "../components/atoms/NeoButton";

export default function Home() {
  const { modalVisible, setModalVisible, galleryVisible, setGalleryVisible } =
    useContext(InstaContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>path5</title>
        <meta
          name="description"
          content="From mathematics to web-friendly generative artworks."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section>
          <SketchNode className="text-drawing" exec={TextDrawing} />
          <img src="/images/hero-wave-mask.svg" alt="" />
          <NeoButton
            className="hero-cta"
            size={180}
            html={`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2300 1000">
                  <title>Scroll Down</title>
                  <defs>
                    <path d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250" id="textcircle">
                      <animateTransform
                              attributeName="transform"
                              begin="0s"
                              dur="30s"
                              type="rotate"
                              from="0 250 250"
                              to="360 250 250"
                              repeatCount="indefinite" 
                        />
                    </path>
                  </defs>
                  <text dy="700" textLength="1240">
                    <textPath xlink:href="#textcircle">• NWOD  • LLORCS </textPath>
                  </text>
                </svg>`}
          />
        </section>
        <section>
          <button
            onClick={() => {
              setGalleryVisible(true);
              setModalVisible(false);
              disableScroll();
            }}
          >
            Showcase
          </button>
        </section>
      </main>
      {galleryVisible && <InstaFeed visible={galleryVisible} />}
      {modalVisible && galleryVisible && (
        <InstaModal visible={modalVisible && galleryVisible} />
      )}
    </div>
  );
}
