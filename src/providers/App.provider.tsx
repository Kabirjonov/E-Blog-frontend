import { router } from "@/app/router";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./thema.provider";
import { Toaster } from "sonner";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export default function AppProvider() {
	const queryClient = new QueryClient();
	return (
		<div>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
					<RouterProvider router={router} />
					<Toaster position='top-right' />
				</ThemeProvider>
			</QueryClientProvider>
		</div>
	);
}
