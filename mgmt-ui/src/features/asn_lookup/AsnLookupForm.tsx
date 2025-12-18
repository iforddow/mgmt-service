import { Group, TextInput, Card, Text, Loader, Alert, Title, Box, ActionIcon, Flex, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useAsnLookup } from './AsnLookupService';
import classes from './AsnLookupForm.module.css';
import { IconSearch, IconInfoCircle } from '@tabler/icons-react';

/* 
A form component for ASN lookup by IP address.

Allows users to input an IP address, submit the form, 
and view the corresponding ASN information.

@authors IFD
@date 2025-12-17
*/
export default function AsnLookupForm() {
    const [submittedIp, setSubmittedIp] = useState<string>('');
    const [shouldFetch, setShouldFetch] = useState(false);

    // Initialize the form with validation
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            ipAddress: '',
        },

        validate: {
            ipAddress: (value) =>
                (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value) ? null : 'Invalid IP address'),
        },
    });

    // Use the custom hook to fetch ASN data
    const { data: asnData, isLoading, error, isError } = useAsnLookup(submittedIp, shouldFetch);

    // Handle form submission
    const handleSubmit = (values: { ipAddress: string }) => {
        setSubmittedIp(values.ipAddress);
        setShouldFetch(true);
    };

    // Render the form and results
    return (
        <div className={classes.container}>
            <Flex w="100%" justify="space-between" align="flex-start" mb="xs">
                <Box flex={1}>
                    <Text fw={500} size="lg">ASN Lookup</Text>
                    <Text size="sm" c="dimmed">Enter an IP address to fetch its ASN information.</Text>
                </Box>
                <Box>
                    <Tooltip
                        label="ASN (Autonomous System Number) identifies the network routing infrastructure responsible for an IP address. This lookup will show you which organization owns and operates the network."
                        multiline
                        w={300}
                        withArrow
                        position="left"
                    >
                        <ActionIcon variant="subtle" color="gray" size="sm">
                            <IconInfoCircle size={16} />
                        </ActionIcon>
                    </Tooltip>
                </Box>
            </Flex>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    size='md'
                    placeholder="Enter IP address"
                    key={form.key('ipAddress')}
                    {...form.getInputProps('ipAddress')}
                    rightSection={
                        <ActionIcon type='submit' variant='light' color={form.errors.ipAddress ? 'error' : 'primary'}>
                            <IconSearch size={16} />
                        </ActionIcon>
                    }
                />
            </form>

            {isLoading && (
                <Card mt="md">
                    <Group>
                        <Loader size="sm" />
                        <Text>Fetching ASN information...</Text>
                    </Group>
                </Card>
            )}

            {isError && (
                <Alert color="red" mt="md" title="Error">
                    {error?.message || 'Failed to fetch ASN information'}
                </Alert>
            )}

            {asnData && !isLoading && (
                <Card mt="md" bg={"gray.0"}>
                    <Title order={2}>ASN Information</Title>
                    <Text><strong>ASN Number:</strong> {asnData.asnNumber}</Text>
                    <Text><strong>Organization:</strong> {asnData.asnOrg}</Text>
                </Card>
            )}
        </div>
    );
}