import { Box, Card, Title } from "@mantine/core";
import BasePage from "../../components/layout/page/BasePage";

export default function HomePage() {

    return (
        <BasePage>
            <Card w={"100%"} bg={"primary"}>
                <Title order={3} c={'white'}>Welcome back, Izaak!</Title>
            </Card>
            <Box h={20}></Box>
            <Card shadow="md" display={'flex'} w={'fit-content'}>
                Active Services
            </Card>
        </BasePage>
    );
}