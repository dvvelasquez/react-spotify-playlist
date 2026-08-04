import { Outlet } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-900">
            <Navbar />

            <main className="grow max-w-7xl w-full mx-auto px-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}
