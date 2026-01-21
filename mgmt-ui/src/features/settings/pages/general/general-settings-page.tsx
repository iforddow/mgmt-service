import BaseLayout from "@/components/layout/base-layout";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import TipCard from "@/components/custom/cards/tip-card";
import RelatedCard from "@/components/custom/cards/related-card";
import HelpCard from "@/components/custom/cards/help-card";
import GeneralSettingsForm from "./components/general-settings-form/general-settings-form";

export default function GeneralSettingsPage() {
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
                        <BreadcrumbPage className="cursor-pointer" onClick={() => window.location.reload()}>General</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        }>
            <div className="grid grid-cols-1  md:grid-cols-[7fr_3fr] gap-8 p-4">
                <div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold tracking-tight">General Settings</h2>
                        <p className="text-sm text-muted-foreground mt-1">Configure the general settings of your system, including system name, company details, logo, and favicon.</p>
                    </div>
                    <GeneralSettingsForm />
                </div>
                <div className="space-y-6">
                    {/* Tips Section */}
                    <TipCard tipList={[
                        "Use a clear, recognizable system name for easy identification.",
                        "Your favicon should be a square image for best results.",
                        "Logo files should have a transparent background."
                    ]} />

                    {/* Quick Links */}
                    <RelatedCard links={[
                        { href: "/settings/storage", label: "Storage Configuration" },
                        { href: "/settings/services", label: "Service Settings" }
                    ]} />
                    {/* Help Section */}
                    <HelpCard content={
                        "Check out the documentation for more information on configuring your system settings."
                    }
                    />
                </div>
            </div>
        </BaseLayout>
    );
}