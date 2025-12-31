import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import IpLookupPage from "../../features/security/ip_lookup/IpLookupPage";
import BlockedListPage from "../../features/security/blocklist/BlockedListPage";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<HomePage />} />
                <Route path="/security/ip-lookup" element={<IpLookupPage />} />
                <Route path="/security/blocklist" element={<BlockedListPage />} />
            </Routes>
        </BrowserRouter>
    )

}