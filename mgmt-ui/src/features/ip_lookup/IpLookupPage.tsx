import IpLookupForm, { type IpLookupFormRef } from "./components/IpLookupForm";
import BasePage from "../../components/layout/page/BasePage";
import { useRef, useState } from "react";
import { useIpLookup } from "./service/IpLookupService";
import IpLookupResultComponent from "./components/IpLookupResultCard";
import { Box, Center } from "@mantine/core";

export default function IpLookupPage() {

    const formRef = useRef<IpLookupFormRef>(null);
    const [submittedIp, setSubmittedIp] = useState<string>('');
    const [shouldFetch, setShouldFetch] = useState(false);
    const [showError, setShowError] = useState(true);

    // Use the custom hook to fetch ASN data
    const { data: ipData, isLoading, error, isError } = useIpLookup(submittedIp, shouldFetch);

    // Handle form submission
    const handleSubmit = (values: { ipAddress: string }) => {
        setSubmittedIp(values.ipAddress);
        setShouldFetch(true);
        setShowError(true);
    };

    // Handle form reset
    const handleReset = () => {
        setSubmittedIp('');
        setShouldFetch(false);
    };

    return (
        <BasePage>
            <Box h={"100%"}>
                {ipData && !isLoading ? (
                    <IpLookupResultComponent submittedIp={submittedIp} ipData={ipData} onReset={() => {
                        formRef.current?.reset();
                        handleReset();
                    }}
                    />
                ) : (
                    <Center h={"100%"}>
                        <IpLookupForm
                            ref={formRef}
                            isLoading={isLoading}
                            isError={isError}
                            error={error}
                            showError={showError}
                            setShowError={setShowError}
                            onSubmit={handleSubmit}
                        />
                    </Center>
                )}
            </Box>
        </BasePage>
    );
}