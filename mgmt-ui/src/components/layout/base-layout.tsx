import { AppSidebar } from "../shadcn/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function BaseLayout({ children, title }: { children: React.ReactNode, title?: string }) {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1 className="text-lg font-medium">{title ?? "Management Service"}</h1>
                </header>
                <main className="flex-1 p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}