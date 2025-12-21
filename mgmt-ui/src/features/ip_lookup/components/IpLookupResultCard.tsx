import { Button, Card, Title, Text, CopyButton, Tooltip, ActionIcon, Divider, Box, Group, Stack, Grid, AspectRatio, Menu, useMantineTheme } from "@mantine/core";
import { IconCheck, IconChevronDown, IconCopy, IconInfoCircle, IconMap2, IconNetwork, IconTopologyStar, IconX } from "@tabler/icons-react";
import { Layer, Source, Map } from "react-map-gl/maplibre";
import type { IpAddressInfoType } from "../../../types/IpAddressInfoType";

interface IpLookupResultCardProps {
    submittedIp: string;
    ipData: IpAddressInfoType;
    onReset: () => void;
}

export default function IpLookupResultComponent({ submittedIp, ipData, onReset }: IpLookupResultCardProps) {

    const theme = useMantineTheme();

    return (
        <Box>
            <Group justify="space-between" align="flex-start">
                <Stack gap={0}>
                    <Title order={2}>IP Information</Title>
                    <Group gap={"0.25rem"} align="center" mb={"sm"}>
                        <Text fs="italic" size="xl">{submittedIp}</Text>
                        <CopyButton value={submittedIp} timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="bottom">
                                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                    </Group>
                    <Group gap={"sm"}>
                        <Menu
                            transitionProps={{ transition: 'pop-top-left' }}
                            position="bottom-start"
                            width={220}
                            withinPortal
                            radius="md"
                        >
                            <Menu.Target>
                                <Button color="error" rightSection={<IconChevronDown size={18} stroke={1.5} />} pr={12} radius="md">
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
                <Group>
                    <ActionIcon variant="subtle" color="error" size={"lg"} onClick={onReset}>
                        <IconX size={16} />
                    </ActionIcon>
                </Group>
            </Group >
            <Grid my="md">
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Card w={"full"} padding={"md"} shadow="sm">
                        <Card.Section>
                            <AspectRatio ratio={16 / 9}>
                                <Map
                                    initialViewState={{
                                        latitude: ipData.latitude,
                                        longitude: ipData.longitude,
                                        zoom: 8
                                    }}
                                    style={{ width: '100%', height: '100%' }}
                                    mapStyle="https://tiles.openfreemap.org/styles/positron"
                                    attributionControl={false}
                                >
                                    <Source
                                        id="ip-location"
                                        type="geojson"
                                        data={{
                                            type: 'Feature',
                                            geometry: {
                                                type: 'Point',
                                                coordinates: [ipData.longitude, ipData.latitude]
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
                                                'circle-color': 'rgba(66, 135, 245, 0.2)',
                                                'circle-stroke-color': 'rgba(66, 135, 245, 0.6)',
                                                'circle-stroke-width': 2
                                            }}
                                        />
                                        <Layer
                                            id="center-dot"
                                            type="circle"
                                            paint={{
                                                'circle-radius': 6,
                                                'circle-color': '#2563eb',
                                            }}
                                        />
                                    </Source>
                                </Map>
                            </AspectRatio>
                        </Card.Section>
                        <Group mt={"md"} gap={"xs"}>
                            <IconMap2 size={"2rem"} stroke={1} />
                            <Title order={2} fw={600}>Location Details</Title>
                        </Group>
                        <Divider my="sm" />
                        <Group gap={"0.5rem"}>
                            <Text size="md" fw={500}>Continent:</Text>
                            <Text size="md">{ipData.continent}</Text>
                        </Group>
                        <Group gap={"0.5rem"}>
                            <Text size="md" fw={500}>Country:</Text>
                            <Text size="md">{ipData.country} ({ipData.countryIsoCode})</Text>
                        </Group>
                        <Group gap={"0.5rem"}>
                            <Text size="md" fw={500}>Province/State:</Text>
                            <Text size="md">{ipData.region}</Text>
                        </Group>
                        <Group gap={"0.5rem"}>
                            <Text size="md" fw={500}>City:</Text>
                            <Text size="md">{ipData.city}</Text>
                        </Group>
                        <Group gap={"0.5rem"}>
                            <Text size="md" fw={500}>Postal Code:</Text>
                            <Text size="md">{ipData.postalCode}</Text>
                        </Group>
                        <Group gap={"0.5rem"}>
                            <Text size="md" fw={500}>Longitude:</Text>
                            <Text size="md">{ipData.longitude}</Text>
                        </Group>
                        <Group gap={"0.5rem"}>
                            <Text size="md" fw={500}>Latitude:</Text>
                            <Text size="md">{ipData.latitude}</Text>
                        </Group>
                        <Group gap={"0.5rem"}>
                            <Text size="md" fw={500}>Time Zone:</Text>
                            <Text size="md">{ipData.timeZone}</Text>
                        </Group>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Stack h={'100%'}>
                        <Card w={"full"} h={'50%'} padding={"md"} shadow="sm">
                            <Group gap={"xs"}>
                                <IconTopologyStar size={"2rem"} stroke={1} />
                                <Title order={2} fw={600}>ASN Details</Title>
                            </Group>
                            <Divider my="sm" />
                            <Group gap={"0.5rem"}>
                                <Text size="md" fw={500}>ASN Number:</Text>
                                <Text size="md">{ipData.asnNumber}</Text>
                            </Group>
                            <Group gap={"0.5rem"}>
                                <Text size="md" fw={500}>ASN Organization:</Text>
                                <Text size="md">{ipData.asnOrganization}</Text>
                            </Group>
                            <Group gap={"0.5rem"}>
                                <Text size="md" fw={500}>ASN Network:</Text>
                                <Text size="md">{ipData.network}</Text>
                            </Group>
                        </Card>
                        <Card w={"full"} h={'50%'} padding={"md"} shadow="sm">
                            <Group gap={"xs"}>
                                <IconInfoCircle size={"2rem"} stroke={1} />
                                <Title order={2} fw={600}>IP Traits</Title>
                            </Group>
                            <Divider my="sm" />
                            <Group gap={"0.5rem"}>
                                <Text size="md" fw={500}>Anonymous:</Text>
                                {
                                    ipData.isAnonymous ? (
                                        <IconCheck size={16} color="green" />
                                    ) : (
                                        <IconX size={16} color="red" />
                                    )
                                }
                            </Group>
                            <Group gap={"0.5rem"}>
                                <Text size="md" fw={500}>Anonymous VPN:</Text>
                                {
                                    ipData.isAnonymousVpn ? (
                                        <IconCheck size={16} color="green" />
                                    ) : (
                                        <IconX size={16} color="red" />
                                    )
                                }
                            </Group>
                            <Group gap={"0.5rem"}>
                                <Text size="md" fw={500}>Anycast:</Text>
                                {
                                    ipData.isAnycast ? (
                                        <IconCheck size={16} color="green" />
                                    ) : (
                                        <IconX size={16} color="red" />
                                    )
                                }
                            </Group>
                            <Group gap={"0.5rem"}>
                                <Text size="md" fw={500}>Legitimate Proxy:</Text>
                                {
                                    ipData.isLegitimateProxy ? (
                                        <IconCheck size={16} color="green" />
                                    ) : (
                                        <IconX size={16} color="red" />
                                    )
                                }
                            </Group>
                            <Group gap={"0.5rem"}>
                                <Text size="md" fw={500}>Hosting Provider:</Text>
                                {
                                    ipData.isHostingProvider ? (
                                        <IconCheck size={16} color="green" />
                                    ) : (
                                        <IconX size={16} color="red" />
                                    )
                                }
                            </Group>
                            <Group gap={"0.5rem"}>
                                <Text size="md" fw={500}>Public Proxy:</Text>
                                {
                                    ipData.isPublicProxy ? (
                                        <IconCheck size={16} color="green" />
                                    ) : (
                                        <IconX size={16} color="red" />
                                    )
                                }
                            </Group>
                            <Group gap={"0.5rem"}>
                                <Text size="md" fw={500}>Residential Proxy:</Text>
                                {
                                    ipData.isResidentialProxy ? (
                                        <IconCheck size={16} color="green" />
                                    ) : (
                                        <IconX size={16} color="red" />
                                    )
                                }
                            </Group>
                            <Group gap={"0.5rem"}>
                                <Text size="md" fw={500}>Tor Exit Node:</Text>
                                {
                                    ipData.isTorExitNode ? (
                                        <IconCheck size={16} color="green" />
                                    ) : (
                                        <IconX size={16} color="red" />
                                    )
                                }
                            </Group>
                        </Card>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Box >
    )
}