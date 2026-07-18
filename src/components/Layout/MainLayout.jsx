import { Outlet } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />

            <main className="flex-grow max-w-7xl w-full mx-auto p-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}
