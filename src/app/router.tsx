import MainLayout from "@/layouts/MainLayout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <div>Home</div> },
			{ path: "/about", element: <div>About Us</div> },
			{ path: "*", element: <div>Not Found</div> },
		],
	},
]);
