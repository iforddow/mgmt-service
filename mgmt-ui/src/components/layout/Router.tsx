import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )

}