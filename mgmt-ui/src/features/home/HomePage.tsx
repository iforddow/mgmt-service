import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../../components/layout/navbar/Navbar";
import AsnLookupForm from "../asn_lookup/AsnLookupForm";

export default function HomePage() {

    const [opened, { toggle }] = useDisclosure();

    return <>
        <AppShell
            padding="md"
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
        >
            <AppShell.Header>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />

                <div>Logo</div>
            </AppShell.Header>

            <AppShell.Navbar><Navbar /></AppShell.Navbar>

            <AppShell.Main><AsnLookupForm /></AppShell.Main>
        </AppShell>
    </>
}