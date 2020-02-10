import React from "react";

import style from "./Button.module.scss";

const Button = props => {
  return <button className={style.btn} onClick={props.onClick}></button>;
};

export default Button;
