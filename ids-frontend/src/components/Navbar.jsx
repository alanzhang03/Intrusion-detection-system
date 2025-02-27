import React from "react";
import styles from "../styles/Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navCont}>
        <div className={styles.logo}>IDS Logo</div>
        <ul className={styles.navLinks}>
          <li>Home</li>
          <li>About</li>
          <li>Testing</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
