import { useState, useMemo } from "react";
import {
    Table,
    UnstyledButton,
    Group,
    Text,
    Center,
    Menu,
    Button,
    Checkbox,
    Badge,
    Loader,
    Stack,
} from "@mantine/core";
import {
    IconSelector,
    IconChevronDown,
    IconChevronUp,
    IconColumns,
    IconRefresh,
} from "@tabler/icons-react";
import { useBlockedIpListLookup } from "../service/BlockListService";
import type { BlockedIpType } from "../../../../types/BlockedIpType";

// Column definition type
type ColumnDef = {
    key: keyof BlockedIpType;
    label: string;
    defaultVisible: boolean;
    sortable: boolean;
};

// All available columns
const ALL_COLUMNS: ColumnDef[] = [
    { key: "id", label: "ID", defaultVisible: false, sortable: true },
    { key: "ipAddress", label: "IP Address", defaultVisible: true, sortable: true },
    { key: "cidrRange", label: "CIDR Range", defaultVisible: true, sortable: true },
    { key: "scope", label: "Scope", defaultVisible: true, sortable: true },
    { key: "serviceName", label: "Service Name", defaultVisible: true, sortable: true },
    { key: "accountId", label: "Account ID", defaultVisible: false, sortable: true },
    { key: "reason", label: "Block Reason", defaultVisible: true, sortable: true },
    { key: "blockType", label: "Block Type", defaultVisible: true, sortable: true },
    { key: "severity", label: "Severity", defaultVisible: true, sortable: true },
    { key: "blockedAt", label: "Blocked At", defaultVisible: true, sortable: true },
    { key: "expiresAt", label: "Expires At", defaultVisible: false, sortable: true },
    { key: "createdBy", label: "Created By", defaultVisible: false, sortable: true },
    { key: "lastHitAt", label: "Last Hit At", defaultVisible: false, sortable: true },
    { key: "hitCount", label: "Hit Count", defaultVisible: true, sortable: true },
    { key: "isActive", label: "Is Active", defaultVisible: true, sortable: true },
];

type SortDirection = "asc" | "desc" | null;

interface ThProps {
    children: React.ReactNode;
    sorted: boolean;
    sortDirection: SortDirection;
    onSort: () => void;
    sortable: boolean;
}

function Th({ children, sorted, sortDirection, onSort, sortable }: ThProps) {
    const Icon = sorted
        ? sortDirection === "asc"
            ? IconChevronUp
            : IconChevronDown
        : IconSelector;

    return (
        <Table.Th style={{ padding: 0 }}>
            {sortable ? (
                <UnstyledButton
                    onClick={onSort}
                    style={{
                        width: "100%",
                        padding: "var(--mantine-spacing-xs) var(--mantine-spacing-md)",
                    }}
                >
                    <Group justify="space-between" wrap="nowrap">
                        <Text fw={500} size="sm">
                            {children}
                        </Text>
                        <Center>
                            <Icon size={16} stroke={1.5} />
                        </Center>
                    </Group>
                </UnstyledButton>
            ) : (
                <Text fw={500} size="sm" p="xs" px="md">
                    {children}
                </Text>
            )}
        </Table.Th>
    );
}

export default function BlockedIpTable() {
    // Fetch data using the hook
    const { data, isLoading, isError, error, refetch } = useBlockedIpListLookup(
        0,
        20,
        true
    );

    // Column visibility state - initialize with default visible columns
    const [visibleColumns, setVisibleColumns] = useState<Set<keyof BlockedIpType>>(
        () => new Set(ALL_COLUMNS.filter((col) => col.defaultVisible).map((col) => col.key))
    );

    // Sorting state
    const [sortBy, setSortBy] = useState<keyof BlockedIpType | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    // Handle column toggle
    const toggleColumn = (key: keyof BlockedIpType) => {
        setVisibleColumns((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(key)) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return newSet;
        });
    };

    // Reset to default columns
    const resetToDefaults = () => {
        setVisibleColumns(
            new Set(ALL_COLUMNS.filter((col) => col.defaultVisible).map((col) => col.key))
        );
    };

    // Handle sorting
    const handleSort = (key: keyof BlockedIpType) => {
        if (sortBy === key) {
            // Cycle through: asc -> desc -> null
            if (sortDirection === "asc") {
                setSortDirection("desc");
            } else if (sortDirection === "desc") {
                setSortBy(null);
                setSortDirection(null);
            }
        } else {
            setSortBy(key);
            setSortDirection("asc");
        }
    };

    // Get visible columns in order
    const activeColumns = useMemo(
        () => ALL_COLUMNS.filter((col) => visibleColumns.has(col.key)),
        [visibleColumns]
    );

    // Sort data
    const sortedData = useMemo(() => {
        if (!data) return [];
        if (!sortBy || !sortDirection) return data;

        return [...data].sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];

            if (aVal === null || aVal === undefined) return 1;
            if (bVal === null || bVal === undefined) return -1;

            let comparison = 0;
            if (typeof aVal === "number" && typeof bVal === "number") {
                comparison = aVal - bVal;
            } else if (typeof aVal === "boolean" && typeof bVal === "boolean") {
                comparison = aVal === bVal ? 0 : aVal ? -1 : 1;
            } else {
                comparison = String(aVal).localeCompare(String(bVal));
            }

            return sortDirection === "asc" ? comparison : -comparison;
        });
    }, [data, sortBy, sortDirection]);

    // Format cell value for display
    const formatCellValue = (value: unknown, key: keyof BlockedIpType): React.ReactNode => {
        if (value === null || value === undefined) return "-";

        if (key === "isActive") {
            return (
                <Badge color={value ? "green" : "red"} variant="light">
                    {value ? "Active" : "Inactive"}
                </Badge>
            );
        }

        if (key === "severity") {
            const severityColors: Record<number, string> = {
                1: "blue",
                2: "yellow",
                3: "orange",
                4: "red",
                5: "grape",
            };
            return (
                <Badge color={severityColors[value as number] || "gray"} variant="light">
                    {String(value)}
                </Badge>
            );
        }

        if (key === "blockedAt" || key === "expiresAt" || key === "lastHitAt") {
            try {
                return new Date(value as string).toLocaleString();
            } catch {
                return String(value);
            }
        }

        return String(value);
    };

    if (isLoading) {
        return (
            <Center py="xl">
                <Loader size="lg" />
            </Center>
        );
    }

    if (isError) {
        return (
            <Center py="xl">
                <Stack align="center">
                    <Text c="red">Error loading data: {error?.message}</Text>
                    <Button onClick={() => refetch()} leftSection={<IconRefresh size={16} />}>
                        Retry
                    </Button>
                </Stack>
            </Center>
        );
    }

    return (
        <Stack gap="md">
            {/* Controls */}
            <Group justify="space-between">
                <Group>
                    <Menu shadow="md" width={250} closeOnItemClick={false}>
                        <Menu.Target>
                            <Button
                                variant="light"
                                leftSection={<IconColumns size={16} />}
                                rightSection={<IconChevronDown size={14} />}
                            >
                                Columns ({visibleColumns.size}/{ALL_COLUMNS.length})
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Toggle Columns</Menu.Label>
                            {ALL_COLUMNS.map((col) => (
                                <Menu.Item
                                    key={col.key}
                                    onClick={() => toggleColumn(col.key)}
                                    closeMenuOnClick={false}
                                >
                                    <Checkbox
                                        checked={visibleColumns.has(col.key)}
                                        onChange={() => toggleColumn(col.key)}
                                        label={col.label}
                                        styles={{ input: { cursor: "pointer" } }}
                                    />
                                </Menu.Item>
                            ))}
                            <Menu.Divider />
                            <Menu.Item onClick={resetToDefaults}>
                                <Text size="sm" c="blue">
                                    Reset to defaults
                                </Text>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>

                <Group>
                    <Button
                        variant="subtle"
                        leftSection={<IconRefresh size={16} />}
                        onClick={() => refetch()}
                    >
                        Refresh
                    </Button>
                    <Text size="sm" c="dimmed">
                        {sortedData.length} records
                    </Text>
                </Group>
            </Group>

            {/* Table */}
            <Table.ScrollContainer minWidth={800}>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            {activeColumns.map((col) => (
                                <Th
                                    key={col.key}
                                    sorted={sortBy === col.key}
                                    sortDirection={sortBy === col.key ? sortDirection : null}
                                    onSort={() => handleSort(col.key)}
                                    sortable={col.sortable}
                                >
                                    {col.label}
                                </Th>
                            ))}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {sortedData.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={activeColumns.length}>
                                    <Center py="xl">
                                        <Text c="dimmed">No blocked IPs found</Text>
                                    </Center>
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            sortedData.map((row) => (
                                <Table.Tr key={row.id}>
                                    {activeColumns.map((col) => (
                                        <Table.Td key={col.key}>
                                            {formatCellValue(row[col.key] as BlockedIpType[keyof BlockedIpType], col.key)}
                                        </Table.Td>
                                    ))}
                                </Table.Tr>
                            ))
                        )}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Stack>
    );
}