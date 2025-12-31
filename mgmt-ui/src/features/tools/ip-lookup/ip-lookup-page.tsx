import BaseLayout from "@/components/layout/base-layout";

export default function IpLookupPage() {
    return (
        <BaseLayout title="IP Lookup">
            <div className="py-4">
                <h1 className="text-2xl font-semibold">IP Lookup Tool</h1>
                <p className="mt-2 text-gray-600">
                    Use this tool to look up information about IP addresses.
                </p>
                {/* IP Lookup Tool Components Go Here */}
            </div>
        </BaseLayout>
    )
}