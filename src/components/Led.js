import React from "react";

import style from "./Led.module.scss";

const Led = props => {
  return (
    <div
      className={
        props.condition
          ? style.ledOn
          : style.ledOff
      }
    ></div>
  );
};

export default Led;
