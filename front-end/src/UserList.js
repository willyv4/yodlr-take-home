import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import YodlrApi from "./api/api";
import DeleteUser from "./DeleteUser";

const UserList = () => {
	const [users, setUsers] = useState();
	const [open, setOpen] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		async function getUsers() {
			const data = await YodlrApi.getUserList();
			setUsers(data);
		}

		if (!users) getUsers();
	}, [users, setUsers]);

	if (!users) return <div>Loading...</div>;

	const handleClick = (id) => {
		setOpen(true);

		async function getUser() {
			const res = await YodlrApi.getUserById(id);
			console.log("userDatae: ", res);
			setUserObj(res);
		}

		getUser();
	};

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					<NavLink
						to="/registration"
						className="mt-8 -ml-16 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Add user
					</NavLink>
				</div>
			</div>

			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
									>
										Name
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Admin
									</th>

									<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{users.map((person) => (
									<tr key={person.email + person.id}>
										<td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
											<div className="flex items-center">
												<div className="h-11 w-11 flex-shrink-0">
													<img
														className="h-11 w-11 rounded-full"
														src="https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
														alt=""
													/>
												</div>
												<div className="ml-4">
													<div className="font-medium text-gray-900">
														{person.firstName + " " + person.lastName}
													</div>
													<div className="mt-1 text-gray-500">
														{person.email}
													</div>
												</div>
											</div>
										</td>
										<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
											<span
												className={`${
													person.state !== "active" &&
													"bg-yellow-50 text-yellow-700 ring-yellow-600/20"
												} inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20`}
											>
												{person.state}
											</span>
										</td>

										<td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
											<NavLink
												to={`/users/${person.id}`}
												className="text-indigo-600 hover:text-indigo-900"
											>
												Edit
												<span className="sr-only">
													{person.firstName + " " + person.lastName}
												</span>
											</NavLink>
											<button
												onClick={() => handleClick(person.id)}
												className="ml-2 text-rose-500"
											>
												Delete
											</button>
											<DeleteUser
												open={open}
												setOpen={setOpen}
												userObj={userObj}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserList;
