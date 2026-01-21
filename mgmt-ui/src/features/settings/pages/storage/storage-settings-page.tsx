import HelpCard from "@/components/custom/cards/help-card";
import RelatedCard from "@/components/custom/cards/related-card";
import TipCard from "@/components/custom/cards/tip-card";
import BaseLayout from "@/components/layout/base-layout";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import StorageSettingsForm from "./components/storage-settings-form/storage-settings-form";

export default function StorageSettingsPage() {
    return (
        <BaseLayout breadcrumbs={
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <a href="/">Dashboard</a>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <a href="/settings">Settings</a>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="cursor-pointer" onClick={() => window.location.reload()}>Storage</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        }>
            <div className="grid grid-cols-1  md:grid-cols-[7fr_3fr] gap-8 p-4">
                <div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold tracking-tight">Storage Settings</h2>
                        <p className="text-sm text-muted-foreground mt-1">Connect an external storage service to manage your data efficiently.</p>
                    </div>
                    <StorageSettingsForm />
                </div>
                <div className="space-y-6">
                    {/* Tips Section */}
                    <TipCard tipList={[
                        "Connect to reliable storage services for data safety and performance.",
                        "Your storage endpoint should be secure and accessible.",
                        "Compatible storage types include S3 and Cloudflare R2."
                    ]} />

                    {/* Quick Links */}
                    <RelatedCard links={[
                        { href: "/settings/storage", label: "Storage Configuration" },
                        { href: "/settings/services", label: "Service Settings" }
                    ]} />
                    {/* Help Section */}
                    <HelpCard content={
                        "Check out the documentation for more information on configuring your storage settings."
                    }
                    />
                </div>
            </div>
        </BaseLayout>
    )
}