import React, { createContext, useState, useEffect } from "react";

export const InstaContext = createContext({
  id: "",
  setId: () => {},
  modalVisible: false,
  setModalVisible: () => {},
  galleryVisible: false,
  setGalleryVisible: () => {},
});

const InstaProvider = (props) => {
  // default values
  const [id, setId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);

  useEffect(() => {
    console.log(modalVisible);
  }, [modalVisible]);

  return (
    <InstaContext.Provider
      value={{
        id,
        setId,
        modalVisible,
        setModalVisible,
        galleryVisible,
        setGalleryVisible,
      }}
    >
      {props.children}
    </InstaContext.Provider>
  );
};

export default InstaProvider;
