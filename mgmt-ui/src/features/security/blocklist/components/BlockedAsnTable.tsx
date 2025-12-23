import { Table } from "@mantine/core";

export default function BlockedAsnTable() {
    return (
        <Table striped>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Element position</Table.Th>
                    <Table.Th>Element name</Table.Th>
                    <Table.Th>Symbol</Table.Th>
                    <Table.Th>Atomic mass</Table.Th>
                </Table.Tr>
            </Table.Thead>
        </Table>
    );
}