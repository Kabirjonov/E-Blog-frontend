import { router } from "@/app/router";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./thema.provider";
export default function AppProvider() {
	return (
		<div>
			<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
				<RouterProvider router={router} />
			</ThemeProvider>
		</div>
	);
}
