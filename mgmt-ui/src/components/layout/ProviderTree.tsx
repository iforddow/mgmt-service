import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "../../styles/theme";
import { colorSchemeManager } from "../../lib/config";

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            refetchOnWindowFocus: false,
        },
    },
});

export default function ProviderTree({ children }: { children: React.ReactNode }) {

    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
                {children}
            </MantineProvider>
        </QueryClientProvider>
    )

}