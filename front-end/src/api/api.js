import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

class YodlrApi {
	static async request(endpoint, data = {}, method = "get") {
		const url = !endpoint ? BASE_URL : `${BASE_URL}/${endpoint}`;
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
		return await this.request(Id);
	}

	static async updateUserById(Id, formData) {
		await this.request(Id, formData, "put");
	}

	static async deleteUser(Id) {
		await this.request(Id, {}, "delete");
	}
}

export default YodlrApi;
