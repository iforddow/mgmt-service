import { Card, Box, Button } from "@mantine/core";
import BlockedIpTable from "./BlockedIpTable";
import { IconBan } from "@tabler/icons-react";

export default function BlockedIpTab() {
    return (
        <Box pt="md">
            <Box w={"100%"} display={'flex'} mb={"md"}>
                <Button
                    variant="white"
                    c={"red"}
                    leftSection={<IconBan size={16} />}
                    ml={"auto"}
                >
                    Add Blocked IP
                </Button>
            </Box>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <BlockedIpTable />
            </Card>
        </Box>
    );
}