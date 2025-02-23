"use client";

import { useState, useEffect } from "react";
import { fetchThreats, addThreat, deleteThreat } from "../utils/api";

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
		setThreats([...threats, addedThreat]); // Update UI
		setNewThreat({ type: "", severity: "" }); // Clear input
	};

	const handleDeleteThreat = async (id) => {
		await deleteThreat(id);
		setThreats(threats.filter((t) => t.id !== id)); // Remove from UI
	};

	return (
		<div className="container">
			<h1>Intrusion Detection System</h1>
			<div>
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
				<button onClick={handleAddThreat}>Add Threat</button>
			</div>
			<ul>
				{threats.map((threat) => (
					<li key={threat.id}>
						<strong>{threat.type}</strong> - {threat.severity} -{" "}
						{new Date(threat.timestamp).toLocaleString()}
						<button onClick={() => handleDeleteThreat(threat.id)}>
							❌ Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
