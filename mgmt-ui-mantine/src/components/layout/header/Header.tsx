import { Paper } from "@mantine/core";

export default function Header() {

    return (
        <header style={{ position: 'relative', zIndex: 100 }}>
            <Paper shadow="sm" radius={0} p="md">
                Service Manager
            </Paper>
        </header>
    );

}