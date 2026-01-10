import { AppSidebar } from "../shadcn/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbList } from "../ui/breadcrumb";

export default function BaseLayout({ children, breadcrumbs }: { children: React.ReactNode, breadcrumbs?: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    {breadcrumbs ? (
                        <Breadcrumb>
                            <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
                        </Breadcrumb>
                    ) : null}
                </header>
                <main className="flex-1 p-4 flex flex-col">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}