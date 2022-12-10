import React from "react";
import styles from "./SwitchButton.module.css"

function SwitchButton(props) {
  const { onButtonClick } = props;
  return (
    <>
      <button onClick={onButtonClick} className={styles.switchButton}><i className="fa-solid fa-arrow-right-arrow-left"></i></button>
    </>
  );
}

export default SwitchButton;
