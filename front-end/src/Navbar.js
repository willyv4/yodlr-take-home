import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import logo from "./assets/logo.png";

const navigation = [
	{ name: "Registration", href: "#", current: true },
	{ name: "Admin", href: "#", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
								<span className="absolute -inset-0.5" />
								<span className="sr-only">Open main menu</span>
								{open ? (
									<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
								) : (
									<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
								)}
							</Disclosure.Button>
						</div>
						<div className="flex flex-shrink-0 items-center">
							<img className="h-8 w-auto" src={logo} alt="Your Company" />
						</div>
						<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
							<div className="hidden sm:ml-6 sm:block">
								<div className="flex space-x-4">
									{navigation.map((item) => (
										<NavLink
											to={`/${item.name.toLowerCase()}`}
											key={item.name}
											href={item.href}
											className={classNames(
												item.current
													? "bg-gray-900 text-white"
													: "text-gray-300 hover:bg-gray-700 hover:text-white",
												"rounded-md px-3 py-2 text-sm font-medium"
											)}
											aria-current={item.current ? "page" : undefined}
										>
											{item.name}
										</NavLink>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Disclosure>
	);
}
