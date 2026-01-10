import BaseLayout from "@/components/layout/base-layout";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <BaseLayout breadcrumbs={
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="cursor-pointer" onClick={() => window.location.reload()}>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        }>
            <div>Dashboard Page</div>
            <Button variant={'default'} className="" onClick={() => { console.log('RJ') }}>Test Button</Button>
        </BaseLayout>
    )
}