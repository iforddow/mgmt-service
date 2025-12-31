import BaseLayout from "@/components/layout/base-layout";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <BaseLayout title="Dashboard">
            <div>Dashboard Page</div>
            <Button variant={'default'} className="" onClick={() => { console.log('RJ') }}>Test Button</Button>
        </BaseLayout>
    )
}