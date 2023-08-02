import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Register from "./Register";
import UserList from "./UserList";

function App() {
	return (
		<div className="">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/registration" element={<Register />} />
					<Route path="/admin" element={<UserList />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
