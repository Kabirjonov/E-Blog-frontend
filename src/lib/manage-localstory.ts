export const setItem = (key: string, data: string) => {
	try {
		localStorage.setItem(key, data);
	} catch (error) {
		console.log("Error saving data");
	}
};
export const getItem = (key: string) => {
	try {
		return localStorage.getItem(key);
	} catch (error) {
		console.log("Error getting data");
	}
};
export const deleteItem = (key: string) => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.log("Error deleting data");
	}
};
