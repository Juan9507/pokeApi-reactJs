import React from "react";
import { AiFillStar } from "react-icons/ai";

const Star = (props) => {
  const { id, outstandingStartUseState, outstanding } = props;
  let localCopy = JSON.parse(localStorage.getItem("copyFavority"));

  return (
    <>
      <AiFillStar
        onClick={() => outstanding(id)}
        style={{
          fontSize: "30px",
          cursor: "pointer",
          color:
            (outstandingStartUseState != undefined &&
              outstandingStartUseState.find((value) => value.id == id)) ||
            (localCopy && localCopy.find((value) => value.id == id))
              ? "#D4AF37"
              : "#ABA3A2",
        }}
      />
    </>
  );
};

export default Star;
