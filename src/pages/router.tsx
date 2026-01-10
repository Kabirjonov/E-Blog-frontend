import MainLayout from "@/layouts/MainLayout";
import AuthPage from "@/pages/auth.page";
import Home from "@/pages/Home.page";
import { createBrowserRouter } from "react-router-dom";
import RecoveryAccount from "./recovery-account";
import ShowOne from "./ShowOne.page";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/about", element: <div>About Us</div> },
			{ path: "/auth", element: <AuthPage /> },
			{ path: "/recovery-account/:token", element: <RecoveryAccount /> },
			{ path: "/recovery-account/:id", element: <ShowOne /> },
			{ path: "*", element: <div>Not Found</div> },
		],
	},
]);
