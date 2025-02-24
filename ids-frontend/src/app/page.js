import Image from "next/image";
import styles from "./page.module.css";
import ThreatList from "../components/ThreatList";

export default function Home() {
	return (
		<>
			<ThreatList />
		</>
	);
}
