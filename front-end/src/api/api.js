import axios from "axios";

const BASE_URL = "http://localhost:3000";

class YodlrApi {
	static async request(endpoint, data = {}, method = "get") {
		const url = `${BASE_URL}/users`;
		if (endpoint) url.concat("/", endpoint);
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	static async register(registerData) {
		return await this.request("", registerData, "post");
	}

	static async getUserList() {
		return await this.request();
	}

	static async getUserById(Id) {
		console.log("id:", Id);
		return await this.request(Id);
	}
}

export default YodlrApi;
