import IpLookupForm, { type IpLookupFormRef } from "./components/IpLookupForm";
import { useRef, useState } from "react";
import { useIpLookup } from "./service/IpLookupService";
import IpLookupResultComponent from "./components/IpLookupResultCard";
import { Box, Center, Paper, Stack, Text, ThemeIcon, Transition, useMantineTheme } from "@mantine/core";
import { IconWorldSearch } from "@tabler/icons-react";
import BasePage from "../../../components/layout/page/BasePage";
import ScrollArea from "../../../components/ui/ScrollArea";

export default function IpLookupPage() {

    const formRef = useRef<IpLookupFormRef>(null);
    const [submittedIp, setSubmittedIp] = useState<string>('');
    const [shouldFetch, setShouldFetch] = useState(false);
    const [showError, setShowError] = useState(true);

    const theme = useMantineTheme();

    // Use the custom hook to fetch ASN data
    const { data: ipData, isLoading, error, isError } = useIpLookup(submittedIp, shouldFetch);

    // Handle form submission
    const handleSubmit = (values: { ipAddress: string }) => {
        setSubmittedIp(values.ipAddress);
        setShouldFetch(true);
        setShowError(true);
    };

    // Handle form reset
    const handleReset = () => {
        setSubmittedIp('');
        setShouldFetch(false);
    };

    const showResults = !!(ipData && !isLoading && shouldFetch);

    return (
        <BasePage>
            <ScrollArea h="100%">
                <Box
                    style={{
                        background: `radial-gradient(ellipse at top left, ${theme.colors.primary[1]}15 0%, transparent 50%), 
                                     radial-gradient(ellipse at bottom right, ${theme.colors.secondary[1]}15 0%, transparent 50%)`,
                        position: 'relative',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Decorative background elements */}
                    <Box
                        style={{
                            position: 'absolute',
                            top: '10%',
                            right: '5%',
                            width: 300,
                            height: 300,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${theme.colors.primary[2]}10, ${theme.colors.primary[4]}05)`,
                            filter: 'blur(60px)',
                            pointerEvents: 'none',
                        }}
                    />
                    <Box
                        style={{
                            position: 'absolute',
                            bottom: '15%',
                            left: '10%',
                            width: 250,
                            height: 250,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${theme.colors.secondary[2]}10, ${theme.colors.secondary[4]}05)`,
                            filter: 'blur(60px)',
                            pointerEvents: 'none',
                        }}
                    />

                    <Transition mounted={showResults} transition="fade" duration={300}>
                        {(styles) => (
                            <Box style={styles} h="100%">
                                {showResults && (
                                    <IpLookupResultComponent
                                        submittedIp={submittedIp}
                                        ipData={ipData!}
                                        onReset={() => {
                                            formRef.current?.reset();
                                            handleReset();
                                        }}
                                    />
                                )}
                            </Box>
                        )}
                    </Transition>

                    {!showResults && (
                        <Transition mounted={!showResults} transition="fade" duration={300}>
                            {(styles) => (
                                <Center flex={1} style={styles}>
                                    <Paper
                                        shadow="xl"
                                        radius="lg"
                                        p="xl"
                                        withBorder
                                        style={{
                                            borderColor: theme.colors.primary[2],
                                            background: `linear-gradient(145deg, 
                                        var(--mantine-color-body) 0%, 
                                        ${theme.colors.primary[0]}20 100%)`,
                                            backdropFilter: 'blur(10px)',
                                            minWidth: 320,
                                            maxWidth: 480,
                                            width: '90%',
                                        }}
                                    >
                                        <Stack align="center" gap="lg">
                                            <ThemeIcon
                                                size={72}
                                                radius="xl"
                                                variant="gradient"
                                                gradient={{ from: 'primary.5', to: 'primary.7', deg: 135 }}
                                                style={{
                                                    boxShadow: `0 8px 32px ${theme.colors.primary[4]}40`,
                                                }}
                                            >
                                                <IconWorldSearch size={40} stroke={1.5} />
                                            </ThemeIcon>

                                            <Stack align="center" gap={4}>
                                                <Text
                                                    size="sm"
                                                    c="dimmed"
                                                    ta="center"
                                                    maw={300}
                                                >
                                                    Enter an IP address to discover location, ASN, and network details
                                                </Text>
                                            </Stack>

                                            <Box w="100%">
                                                <IpLookupForm
                                                    ref={formRef}
                                                    isLoading={isLoading}
                                                    isError={isError}
                                                    error={error}
                                                    showError={showError}
                                                    setShowError={setShowError}
                                                    onSubmit={handleSubmit}
                                                />
                                            </Box>
                                        </Stack>
                                    </Paper>
                                </Center>
                            )}
                        </Transition>
                    )}
                </Box>
            </ScrollArea>
        </BasePage>
    );
}