import { Toaster } from "sonner";
import { ThemeProvider } from "../provider/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";
import BaseSetup from "./base-setup";

export default function ProviderTree() {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                refetchOnWindowFocus: false,
            },
        },
    });

    return (
        <ThemeProvider>
            <Toaster />
            <QueryClientProvider client={queryClient}>
                <BaseSetup />
                <Router />
            </QueryClientProvider>
        </ThemeProvider>
    );
}