import { Routes, Route } from "react-router-dom";
import { ROUTES } from './constants/routes'

// Imported Pages
import MainLayout from "./components/Layout/MainLayout";
import Homepage from './pages/HomePage';
import SavedSongs from "./pages/SavedSongs";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path={ROUTES.HOME} element={<Homepage />} />
                <Route path={ROUTES.SAVED_SONGS} element={<SavedSongs />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
            </Route>
        </Routes>
    )
}

export default App
