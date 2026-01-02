import MainLayout from "@/layouts/MainLayout";
import AuthPage from "@/pages/auth.page";
import Home from "@/pages/Home.page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/about", element: <div>About Us</div> },
			{ path: "/auth", element: <AuthPage /> },
			{ path: "*", element: <div>Not Found</div> },
		],
	},
]);
