import axios from "axios";

const API_URL = "http://localhost:8080/api/threats";

export const fetchThreats = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching threats:", error);
		return [];
	}
};

export const addThreat = async (threat) => {
	try {
		const response = await axios.post(API_URL, threat, {
			headers: { "Content-Type": "application/json" },
		});
		return response.data;
	} catch (error) {
		console.error("Error adding threat:", error);
	}
};

export const deleteThreat = async (id) => {
	try {
		await axios.delete(`${API_URL}/${id}`);
	} catch (error) {
		console.error("Error deleting threat:", error);
	}
};
