// src/layouts/MainLayout.tsx
import Footer from "@/layouts/footer";
import Navbar from "@/layouts/navbar";
import { useCheckAuth } from "@/hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
	useCheckAuth();
	return (
		<>
			<Navbar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
