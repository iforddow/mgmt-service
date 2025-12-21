import { Box, Flex } from "@mantine/core";
import { Navbar } from "../navbar/Navbar";
import classes from './BasePage.module.css';

export default function BasePage({ children }: { children: React.ReactNode }) {
    return (
        <Flex h="100vh">
            <Navbar />

            <Box className={classes.main}>
                {children}
            </Box>
        </Flex>
    );
}