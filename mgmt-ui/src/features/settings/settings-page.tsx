import BaseLayout from "@/components/layout/base-layout";
import { Settings, Server, Database, Logs } from "lucide-react";
import SettingsCard from "./components/settings-card/settings-card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

export default function SettingsPage() {
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
                        <BreadcrumbPage className="cursor-pointer" onClick={() => window.location.reload()}>Settings</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        }>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                <SettingsCard
                    href="/settings/general"
                    title="General"
                    description="System name, logo, favicon, and company details."
                    icon={<Settings />}
                />
                <SettingsCard
                    href="/settings/general"
                    title="Services"
                    description="Manage connected services and integrations."
                    icon={<Server />}
                />
                <SettingsCard
                    href="/settings/general"
                    title="Storage"
                    description="Manage storage options and configurations."
                    icon={<Database />}
                />
                <SettingsCard
                    href="/settings/general"
                    title="Logging"
                    description="Manage logging settings and preferences."
                    icon={<Logs />}
                />
            </div>
        </BaseLayout>
    )
}