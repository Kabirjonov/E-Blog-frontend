import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home.page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/about", element: <div>About Us</div> },
			{ path: "*", element: <div>Not Found</div> },
		],
	},
]);
