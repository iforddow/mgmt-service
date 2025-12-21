import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import IpLookupPage from "../../features/ip_lookup/IpLookupPage";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<HomePage />} />
                <Route path="/ip-lookup" element={<IpLookupPage />} />
            </Routes>
        </BrowserRouter>
    )

}