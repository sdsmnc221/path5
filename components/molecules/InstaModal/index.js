import React, { useContext } from "react";
import { InstaContext } from "../../../context/InstaProvider";
import { Container } from "./index.style";

const InstaModal = ({ visible }) => {
  const { id, setModalVisible, setId } = useContext(InstaContext);

  return (
    <Container visible={visible}>
      <div className="instamodal">
        <iframe src={`https://www.instagram.com/${id}/embed`} />
      </div>
      <button
        onClick={() => {
          setModalVisible(false);
          setId("");
        }}
      >
        Close
      </button>
    </Container>
  );
};

export default InstaModal;
