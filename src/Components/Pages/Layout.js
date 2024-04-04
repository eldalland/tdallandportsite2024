import React from "react";
import styles from "./Hpage/Hpage.module.css"
import Homepage from "../Homepage/Homepage";

const Layout = () => {
  return( 
  <>
<Homepage clasName={styles.Hpage}/>
  </>
  );
};

export default Layout;
