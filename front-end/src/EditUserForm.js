import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YodlrApi from "./api/api";

export default function EditUserForm() {
	const [user, setUser] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		async function getUser() {
			const res = await YodlrApi.getUserById(id);
			setUser(res);
		}
		if (!user) getUser();
	}, [id, user]);

	const INITIAL_STATE = {
		id: id,
		email: "",
		firstName: "",
		lastName: "",
		state: "",
	};

	const [formData, setFormData] = useState(INITIAL_STATE);

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		async function updateUser() {
			const res = await YodlrApi.updateUserById(id, formData);
			console.log(res);
		}
		updateUser();
	};

	useEffect(() => {
		if (user) {
			setFormData({
				id: id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				state: user.state,
			});
		}
	}, [user, id]);

	if (!user) return <div>Loading...</div>;

	console.log("user to edit:", user);
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Edit {user.firstName + " " + user.lastName}
			</h2>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					className="space-y-6"
					action="#"
					method="POST"
					onSubmit={handleSubmit}
				>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="block w-full pl-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								First Name
							</label>
						</div>
						<div className="mt-2">
							<input
								id="firstName"
								name="firstName"
								type="text"
								value={formData.firstName}
								onChange={handleChange}
								required
								className="block w-full pl-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="lastName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Last Name
							</label>
						</div>
						<div className="mt-2">
							<input
								id="lastName"
								name="lastName"
								type="text"
								value={formData.lastName}
								onChange={handleChange}
								required
								className="block w-full pl-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="state"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Admin
							</label>
						</div>
						<div className="mt-2">
							<input
								id="state"
								name="state"
								type="text"
								value={formData.state}
								onChange={handleChange}
								required
								className="block w-full pl-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
