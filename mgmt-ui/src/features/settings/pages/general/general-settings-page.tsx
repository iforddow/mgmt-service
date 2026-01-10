import BaseLayout from "@/components/layout/base-layout";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import SettingsForm from "../../components/settings-form/settings-form";

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
                        <BreadcrumbPage className="cursor-pointer" onClick={() => window.location.reload()}>General Settings</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        }>
            <div className="grid grid-cols-[1fr_400px] gap-8 p-4">
                <div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold tracking-tight">General Settings</h2>
                        <p className="text-sm text-muted-foreground mt-1">Configure the general settings of your system, including system name, company details, logo, and favicon.</p>
                    </div>
                    <SettingsForm />
                </div>
                <div className="space-y-6">
                    {/* Tips Section */}
                    <div className="rounded-lg border border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20 p-4">
                        <h4 className="text-sm font-medium mb-2 text-amber-700 dark:text-amber-400">💡 Tips</h4>
                        <ul className="text-xs text-amber-700/80 dark:text-amber-300/80 space-y-2">
                            <li>• Use a clear, recognizable system name for easy identification.</li>
                            <li>• Your favicon should be a square image for best results.</li>
                            <li>• Logo files should have a transparent background.</li>
                        </ul>
                    </div>
                    {/* Quick Links */}
                    <div className="rounded-lg border border-blue-200 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/20 p-4">
                        <h4 className="text-sm font-medium mb-2 text-blue-700 dark:text-blue-400">🔗 Related Settings</h4>
                        <ul className="text-xs space-y-2">
                            <li><a href="/settings/storage" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">Storage Configuration</a></li>
                            <li><a href="/settings/services" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">Service Settings</a></li>
                        </ul>
                    </div>
                    {/* Help Section */}
                    <div className="rounded-lg border border-purple-200 bg-purple-50/50 dark:border-purple-900/50 dark:bg-purple-950/20 p-4">
                        <h4 className="text-sm font-medium mb-2 text-purple-700 dark:text-purple-400">❓ Need Help?</h4>
                        <p className="text-xs text-purple-700/80 dark:text-purple-300/80">
                            Check out the documentation for more information on configuring your system settings.
                        </p>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}