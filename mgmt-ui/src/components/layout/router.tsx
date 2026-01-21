import DashboardPage from "@/features/dashboard/dashboard-page";
import BlockedAsnPage from "@/features/global-policies/blocked-asns/blocked-asn-page";
import BlockedIpPage from "@/features/global-policies/blocked-ips/blocked-ip-page";
import AuthenticationServicePage from "@/features/services/authentication/authenitcation-service-page";
import GeneralSettingsPage from "@/features/settings/pages/general/general-settings-page";
import StorageSettingsPage from "@/features/settings/pages/storage/storage-settings-page";
import SettingsPage from "@/features/settings/settings-page";
import IpLookupPage from "@/features/tools/ip-lookup/ip-lookup-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/services/authentication" element={<AuthenticationServicePage />} />
                <Route path="/settings">
                    <Route index element={<SettingsPage />} />
                    <Route path="general" element={<GeneralSettingsPage />} />
                    <Route path="storage" element={<StorageSettingsPage />} />
                </Route>
                <Route path="/policies/blocked-ips" element={<BlockedIpPage />} />
                <Route path="/policies/blocked-asns" element={<BlockedAsnPage />} />
                <Route path="/tools/ip-lookup" element={<IpLookupPage />} />
            </Routes>
        </BrowserRouter>
    );
}