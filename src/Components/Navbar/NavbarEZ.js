import React from "react";
import styles from "../Navbar/Navbar.module.css"
import { Link } from "react-router-dom"

const NavbarEZ = () => {
  return( 
  <>
  <div className={styles.nav}>
    <Link className={styles.link} to="/">
    <div className={styles.title}>
      TENTSHAPE - <span style={{fontWeight:"normal",fontSize:"2rem"}}>EZ BUILDERS</span>
    </div>
    </Link>
  </div>
  </>
  );
};

export default NavbarEZ;