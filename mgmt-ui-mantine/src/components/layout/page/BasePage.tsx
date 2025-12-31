import { Box, Flex } from "@mantine/core";
import classes from './BasePage.module.css';
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";

export default function BasePage({ children }: { children: React.ReactNode }) {
    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex flex={1} style={{ minHeight: 0 }}>
                <Navbar />

                <Box className={classes.main}>
                    {children}
                </Box>
            </Flex>
        </Flex>
    );
}