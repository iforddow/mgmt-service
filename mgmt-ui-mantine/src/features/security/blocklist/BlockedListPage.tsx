import { Tabs } from "@mantine/core";
import BasePage from "../../../components/layout/page/BasePage";
import { IconGlobe, IconTopologyStar } from "@tabler/icons-react";
import BlockedIpTab from "./components/BlockedIpTab";

export default function BlockedListPage() {
    return (
        <BasePage>
            <Tabs defaultValue="ipList" styles={{
                tabLabel: {
                    fontSize: '16px',
                }
            }}>
                <Tabs.List>
                    <Tabs.Tab value="ipList" leftSection={<IconGlobe size={16} />}>
                        Blocked IP List
                    </Tabs.Tab>
                    <Tabs.Tab value="asnList" leftSection={<IconTopologyStar size={16} />}>
                        Blocked ASN List
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="ipList">
                    <BlockedIpTab />
                </Tabs.Panel>

                <Tabs.Panel value="asnList">
                    ASN List tab content
                </Tabs.Panel>
            </Tabs>
        </BasePage>
    )
}