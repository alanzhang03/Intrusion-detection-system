"use client";

import { useState, useEffect } from "react";
import {
	fetchThreats,
	addThreat,
	updateThreat,
	deleteThreat,
} from "../utils/api";

export default function ThreatList() {
	const [threats, setThreats] = useState([]);
	const [newThreat, setNewThreat] = useState({ type: "", severity: "" });
	const [editingThreat, setEditingThreat] = useState(null);

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

	const handleUpdateThreat = async () => {
		if (!editingThreat || !editingThreat.type || !editingThreat.severity)
			return;
		const updatedThreat = await updateThreat(editingThreat.id, editingThreat);
		setThreats(
			threats.map((t) => (t.id === updatedThreat.id ? updatedThreat : t))
		);
		setEditingThreat(null); // Reset editing state
	};

	const handleDeleteThreat = async (id) => {
		await deleteThreat(id);
		setThreats(threats.filter((t) => t.id !== id)); // Remove from UI
	};

	return (
		<div className="container">
			<h1>Intrusion Detection System</h1>

			{/* Add New Threat */}
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

			{/* Edit Threat */}
			{editingThreat && (
				<div>
					<h3>Editing Threat</h3>
					<input
						type="text"
						value={editingThreat.type}
						onChange={(e) =>
							setEditingThreat({ ...editingThreat, type: e.target.value })
						}
					/>
					<input
						type="text"
						value={editingThreat.severity}
						onChange={(e) =>
							setEditingThreat({ ...editingThreat, severity: e.target.value })
						}
					/>
					<button onClick={handleUpdateThreat}>Update</button>
					<button onClick={() => setEditingThreat(null)}>Cancel</button>
				</div>
			)}

			{/* Display Threats */}
			<ul>
				{threats.map((threat) => (
					<li key={threat.id}>
						<strong>{threat.type}</strong> - {threat.severity} -{" "}
						{new Date(threat.timestamp).toLocaleString()}
						<button onClick={() => setEditingThreat(threat)}>✏️ Edit</button>
						<button onClick={() => handleDeleteThreat(threat.id)}>
							❌ Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
