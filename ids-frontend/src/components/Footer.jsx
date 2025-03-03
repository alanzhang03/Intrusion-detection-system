import React from "react";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<p>&copy; {new Date().getFullYear()}</p>
				<ul className={styles.footerLinks}>
					<li>
						<a href="#">Privacy Policy</a>
					</li>
					<li>
						<a href="#">Terms of Service</a>
					</li>
					<li>
						<a href="#">Contact</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
