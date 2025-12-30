// src/layouts/MainLayout.tsx
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
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
