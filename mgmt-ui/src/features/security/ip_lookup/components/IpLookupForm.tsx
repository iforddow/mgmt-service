import { TextInput, Loader, Alert, Box, ActionIcon, Flex, Tooltip, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch, IconInfoCircle } from '@tabler/icons-react';
import { forwardRef, useImperativeHandle } from 'react';

/* 
A form component for IP lookup by IP address.

Allows users to input an IP address, submit the form, 
and view the corresponding IP information.

@authors IFD
@date 2025-12-17
*/
interface IpLookupFormProps {
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    showError: boolean;
    setShowError: (show: boolean) => void;
    onSubmit: (values: { ipAddress: string }) => void;
}

export interface IpLookupFormRef {
    reset: () => void;
}

const IpLookupForm = forwardRef<IpLookupFormRef, IpLookupFormProps>(({
    isLoading,
    isError,
    error,
    showError,
    setShowError,
    onSubmit,
}, ref) => {

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

    // Expose reset method to parent via ref
    useImperativeHandle(ref, () => ({
        reset: () => form.reset(),
    }));

    // Handle form submission
    const handleSubmit = (values: { ipAddress: string }) => {
        onSubmit(values);
    };

    // Render the form and results
    return (
        <Box w="100%">
            <Flex w="100%" justify="space-between" align="center" mb="xs">
                <Title fw={600} size="lg">IP Lookup</Title>
                <Tooltip
                    label="This tool displays ASN and location details for an IP address when available."
                    multiline
                    w={280}
                    withArrow
                    position="left"
                >
                    <ActionIcon variant="subtle" color="gray" size="sm">
                        <IconInfoCircle size={16} />
                    </ActionIcon>
                </Tooltip>
            </Flex>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    size='md'
                    placeholder="e.g. 8.8.8.8"
                    key={form.key('ipAddress')}
                    {...form.getInputProps('ipAddress')}
                    styles={{
                        input: {
                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                        }
                    }}
                    rightSection={
                        isLoading ? (
                            <Loader size={16} />
                        ) :
                            (
                                <ActionIcon
                                    type='submit'
                                    variant='light'
                                    color={form.errors.ipAddress ? 'error' : 'primary'}
                                    style={{ transition: 'transform 0.15s ease' }}
                                >
                                    <IconSearch size={16} />
                                </ActionIcon>
                            )
                    }
                />
            </form>

            {isError && showError && (
                <Alert
                    variant="light"
                    color="error"
                    title="Error"
                    mt={"md"}
                    icon={<IconInfoCircle size={16} />}
                    withCloseButton
                    onClose={() => {
                        setShowError(false);
                    }}
                    styles={{
                        icon: {
                            width: "auto",
                            marginInlineEnd: "var(--mantine-spacing-xs)"
                        }
                    }}
                >
                    {error?.message || 'Failed to fetch ASN information'}
                </Alert>
            )}
        </Box>
    );
});

export default IpLookupForm;