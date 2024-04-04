import React from "react";
import Navbar from "../../Navbar/Navbar";
import Homepage from "../../Homepage/Homepage";
import HomeFooter from "../../HomeFooter/HomeFooter";
import styles from "../Hpage/Hpage.module.css";

const Hpage = () => {
  return (
    <>
    
      <Homepage className={styles.Hpage}/>

    </>
  );
};

export default Hpage;
