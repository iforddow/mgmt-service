import { Button, Card, Title, Text, CopyButton, Tooltip, ActionIcon, Box, Group, Stack, Grid, AspectRatio, Menu, useMantineTheme, Badge, Paper, ThemeIcon, SimpleGrid, Center } from "@mantine/core";
import { IconCheck, IconChevronDown, IconCopy, IconGlobe, IconMap2, IconNetwork, IconShield, IconTopologyStar, IconX } from "@tabler/icons-react";
import { Layer, Source, Map } from "react-map-gl/maplibre";
import type { IpAddressInfoType } from "../../../../types/IpAddressInfoType";

interface IpLookupResultCardProps {
    submittedIp: string;
    ipData: IpAddressInfoType;
    onReset: () => void;
}

// Helper component for displaying info rows
function InfoRow({ label, value }: { label: string; value: string | number | undefined }) {
    return (
        <Group justify="space-between" py={6} style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}>
            <Text size="sm" c="dimmed" fw={500}>{label}</Text>
            <Text size="sm" fw={600}>{value || '—'}</Text>
        </Group>
    );
}

// Helper component for boolean trait badges
function TraitBadge({ label, value }: { label: string; value: boolean | undefined }) {
    return (
        <Group justify="space-between" py={8}>
            <Text size="sm" c="dimmed" fw={500}>{label}</Text>
            <Badge
                size="sm"
                variant="light"
                color={value ? 'secondary' : 'gray'}
                leftSection={value ? <IconCheck size={12} /> : <IconX size={12} />}
            >
                {value ? 'Yes' : 'No'}
            </Badge>
        </Group>
    );
}

export default function IpLookupResultComponent({ submittedIp, ipData, onReset }: IpLookupResultCardProps) {

    const theme = useMantineTheme();

    // Default coordinates if not available
    const latitude = ipData.latitude ?? 0;
    const longitude = ipData.longitude ?? 0;
    const hasLocation = ipData.latitude != null && ipData.longitude != null;

    return (
        <Box p="md">
            {/* Header Section */}
            <Paper
                radius="lg"
                p="lg"
                mb="lg"
                style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary[6]} 0%, ${theme.colors.primary[8]} 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Decorative circles */}
                <Box
                    style={{
                        position: 'absolute',
                        top: -50,
                        right: -50,
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                    }}
                />
                <Box
                    style={{
                        position: 'absolute',
                        bottom: -30,
                        right: 100,
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                    }}
                />

                <Group justify="space-between" align="flex-start" style={{ position: 'relative', zIndex: 1 }}>
                    <Stack gap="xs">
                        <Group gap="xs" align="center">
                            <ThemeIcon size="lg" radius="md" variant="white" color="primary">
                                <IconGlobe size={20} />
                            </ThemeIcon>
                            <Title order={3} c="white">IP Information</Title>
                        </Group>
                        <Group gap="xs" align="center">
                            <Text size="xl" fw={700} c="white" style={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                                {submittedIp}
                            </Text>
                            <CopyButton value={submittedIp} timeout={2000}>
                                {({ copied, copy }) => (
                                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="bottom">
                                        <ActionIcon
                                            color="white"
                                            variant="subtle"
                                            onClick={copy}
                                            style={{ opacity: 0.9 }}
                                        >
                                            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </Group>
                        <Group gap="sm" mt="xs">
                            <Menu
                                transitionProps={{ transition: 'pop-top-left' }}
                                position="bottom-start"
                                width={220}
                                withinPortal
                                radius="md"
                            >
                                <Menu.Target>
                                    <Button
                                        color="white"
                                        variant="white"
                                        rightSection={<IconChevronDown size={18} stroke={1.5} />}
                                        pr={12}
                                        radius="md"
                                        style={{ color: theme.colors.error[6] }}
                                    >
                                        Block
                                    </Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        leftSection={<IconNetwork size={16} color={theme.colors.error[6]} stroke={1.5} />}
                                    >
                                        IP Address
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={<IconTopologyStar size={16} color={theme.colors.error[6]} stroke={1.5} />}
                                    >
                                        ASN
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Stack>
                    <ActionIcon
                        variant="subtle"
                        color="white"
                        size="lg"
                        onClick={onReset}
                        style={{ opacity: 0.9 }}
                    >
                        <IconX size={20} />
                    </ActionIcon>
                </Group>
            </Paper>

            {/* Content Grid */}
            <Grid gutter="lg">
                {/* Location Card with Map */}
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Card
                        radius="lg"
                        padding={0}
                        shadow="md"
                        withBorder
                        style={{ overflow: 'hidden' }}
                    >
                        <Card.Section>
                            <AspectRatio ratio={16 / 9}>
                                {hasLocation ? (
                                    <Map
                                        initialViewState={{
                                            latitude: latitude,
                                            longitude: longitude,
                                            zoom: 8
                                        }}
                                        style={{ width: '100%', height: '100%' }}
                                        mapStyle="https://tiles.openfreemap.org/styles/liberty"
                                        attributionControl={false}
                                    >
                                        <Source
                                            id="ip-location"
                                            type="geojson"
                                            data={{
                                                type: 'Feature',
                                                geometry: {
                                                    type: 'Point',
                                                    coordinates: [longitude, latitude]
                                                },
                                                properties: {
                                                    accuracyRadius: ipData.accuracyRadius || 1000
                                                }
                                            }}
                                        >
                                            <Layer
                                                id="accuracy-radius"
                                                type="circle"
                                                paint={{
                                                    'circle-radius': [
                                                        'interpolate',
                                                        ['exponential', 2],
                                                        ['zoom'],
                                                        0, 0,
                                                        20, [
                                                            '/',
                                                            ['*', ['get', 'accuracyRadius'], 8000],
                                                            ['cos', ['*', ['get', 'accuracyRadius'], ['/', Math.PI, 180]]]
                                                        ]
                                                    ],
                                                    'circle-color': `${theme.colors.primary[5]}33`,
                                                    'circle-stroke-color': `${theme.colors.primary[5]}99`,
                                                    'circle-stroke-width': 2
                                                }}
                                            />
                                            <Layer
                                                id="center-dot"
                                                type="circle"
                                                paint={{
                                                    'circle-radius': 8,
                                                    'circle-color': theme.colors.primary[6],
                                                    'circle-stroke-color': '#fff',
                                                    'circle-stroke-width': 2
                                                }}
                                            />
                                        </Source>
                                    </Map>
                                ) : (
                                    <Center bg="gray.1" h="100%">
                                        <Stack align="center" gap="xs">
                                            <IconMap2 size={48} stroke={1} color="gray" />
                                            <Text c="dimmed" size="sm">Location data not available</Text>
                                        </Stack>
                                    </Center>
                                )}
                            </AspectRatio>
                        </Card.Section>
                        <Box p="md">
                            <Group gap="xs" mb="md">
                                <ThemeIcon size="lg" radius="md" variant="light" color="primary">
                                    <IconMap2 size={20} />
                                </ThemeIcon>
                                <Title order={4} fw={600}>Location Details</Title>
                            </Group>
                            <Stack gap={0}>
                                <InfoRow label="Continent" value={ipData.continent} />
                                <InfoRow label="Country" value={ipData.country && ipData.countryIsoCode ? `${ipData.country} (${ipData.countryIsoCode})` : ipData.country} />
                                <InfoRow label="Province/State" value={ipData.region} />
                                <InfoRow label="City" value={ipData.city} />
                                <InfoRow label="Postal Code" value={ipData.postalCode} />
                                <InfoRow label="Coordinates" value={hasLocation ? `${latitude}, ${longitude}` : undefined} />
                                <InfoRow label="Time Zone" value={ipData.timeZone} />
                            </Stack>
                        </Box>
                    </Card>
                </Grid.Col>

                {/* Right Column - ASN and Traits */}
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Stack gap="lg" h="100%">
                        {/* ASN Card */}
                        <Card radius="lg" padding="md" shadow="md" withBorder>
                            <Group gap="xs" mb="md">
                                <ThemeIcon size="lg" radius="md" variant="light" color="secondary">
                                    <IconTopologyStar size={20} />
                                </ThemeIcon>
                                <Title order={4} fw={600}>ASN Details</Title>
                            </Group>
                            <SimpleGrid cols={1} spacing={0}>
                                <InfoRow label="ASN Number" value={ipData.asnNumber} />
                                <InfoRow label="Organization" value={ipData.asnOrganization} />
                                <InfoRow label="Network" value={ipData.network} />
                            </SimpleGrid>
                        </Card>

                        {/* IP Traits Card */}
                        <Card radius="lg" padding="md" shadow="md" withBorder>
                            <Group gap="xs" mb="md">
                                <ThemeIcon size="lg" radius="md" variant="light" color="error">
                                    <IconShield size={20} />
                                </ThemeIcon>
                                <Title order={4} fw={600}>Security Traits</Title>
                            </Group>
                            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                                <TraitBadge label="Anonymous" value={ipData.isAnonymous} />
                                <TraitBadge label="Anonymous VPN" value={ipData.isAnonymousVpn} />
                                <TraitBadge label="Anycast" value={ipData.isAnycast} />
                                <TraitBadge label="Legitimate Proxy" value={ipData.isLegitimateProxy} />
                                <TraitBadge label="Hosting Provider" value={ipData.isHostingProvider} />
                                <TraitBadge label="Public Proxy" value={ipData.isPublicProxy} />
                                <TraitBadge label="Residential Proxy" value={ipData.isResidentialProxy} />
                                <TraitBadge label="Tor Exit Node" value={ipData.isTorExitNode} />
                            </SimpleGrid>
                        </Card>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Box>
    )
}