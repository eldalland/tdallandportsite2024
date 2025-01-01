import React from "react";
import styles from "../Navbar/Navbar.module.css"
import { Link } from "react-router-dom"

const NavbarEZ = ({text}) => {
  return( 
  <>
  <div className={styles.nav}>
    <Link className={styles.link} to="/">
    <div className={styles.title}>
      TENTSHAPE - <span className={styles.navspan}> &nbsp;{text}</span>
    </div>
    </Link>
  </div>
  </>
  );
};

export default NavbarEZ;