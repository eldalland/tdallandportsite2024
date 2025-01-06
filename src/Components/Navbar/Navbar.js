import React from "react";
import styles from "../Navbar/Navbar.module.css"
import { Link } from "react-router-dom"

const Navbar = () => {
  return( 
  <>
  <div className={styles.nav}>
    <Link id ="navbar-logo" className={styles.link} to="/">
    <div className={styles.title}>
      TENTSHAPE
    </div>
    </Link>
  </div>
  </>
  );
};

export default Navbar;