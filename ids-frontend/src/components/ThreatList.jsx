"use client";

import { useState, useEffect } from "react";
import { fetchThreats, addThreat, deleteThreat } from "../utils/api";
import styles from "../styles/ThreatList.module.scss"; 

export default function ThreatList() {
	const [threats, setThreats] = useState([]);
	const [newThreat, setNewThreat] = useState({ type: "", severity: "" });

	useEffect(() => {
		async function loadThreats() {
			const data = await fetchThreats();
			setThreats(data);
		}
		loadThreats();
	}, []);

	const handleAddThreat = async () => {
		if (!newThreat.type || !newThreat.severity) return;
		const addedThreat = await addThreat(newThreat);
		setThreats([...threats, addedThreat]);
		setNewThreat({ type: "", severity: "" });
	};

	const handleDeleteThreat = async (id) => {
		await deleteThreat(id);
		setThreats(threats.filter((t) => t.id !== id));
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Intrusion Detection System</h1>
			<div className={styles.inputGroup}>
				<input
					type="text"
					placeholder="Type (e.g. Malware)"
					value={newThreat.type}
					onChange={(e) => setNewThreat({ ...newThreat, type: e.target.value })}
				/>
				<input
					type="text"
					placeholder="Severity (High/Medium/Low)"
					value={newThreat.severity}
					onChange={(e) =>
						setNewThreat({ ...newThreat, severity: e.target.value })
					}
				/>
				<button className={styles.addButton} onClick={handleAddThreat}>
					Add Threat
				</button>
			</div>
			<ul className={styles.threatList}>
				{threats.map((threat) => (
					<li key={threat.id} className={styles.threatItem}>
						<strong>{threat.type}</strong> - {threat.severity} -{" "}
						{new Date(threat.timestamp).toLocaleString()}
						<div className={styles.buttonGroup}>
							<button className={styles.editButton}>✏️ Edit</button>
							<button
								className={styles.deleteButton}
								onClick={() => handleDeleteThreat(threat.id)}
							>
								❌ Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
