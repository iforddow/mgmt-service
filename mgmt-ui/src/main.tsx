import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from 'sonner';
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { ThemeProvider } from "./components/provider/theme-provider";
import DashboardPage from "./features/dashboard/dashboard-page";
import AuthenticationServicePage from "./features/services/authentication/authenitcation-service-page";
import SettingsPage from "./features/settings/settings-page";
import BlockedAsnPage from "./features/global-policies/blocked-asns/blocked-asn-page";
import BlockedIpPage from "./features/global-policies/blocked-ips/blocked-ip-page";
import IpLookupPage from "./features/tools/ip-lookup/ip-lookup-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GeneralSettingsPage from "./features/settings/pages/general/general-settings-page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Toaster
    />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/services/authentication" element={<AuthenticationServicePage />} />
          <Route path="/settings">
            <Route index element={<SettingsPage />} />
            <Route path="general" element={<GeneralSettingsPage />} />
          </Route>
          <Route path="/policies/blocked-ips" element={<BlockedIpPage />} />
          <Route path="/policies/blocked-asns" element={<BlockedAsnPage />} />
          <Route path="/tools/ip-lookup" element={<IpLookupPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>,
)
