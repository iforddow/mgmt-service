import BaseLayout from "@/components/layout/base-layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { ChartLine, LayoutDashboard, Settings, User } from "lucide-react";
import AuthDashboardTab from "./components/auth-dashboard-tab";
import { useSearchParams } from "react-router-dom";

export default function AuthenticationServicePage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const tab = searchParams.get("tab") ?? "dashboard";

    const setTab = (tab: string) => {
        setSearchParams({ tab });
    }

    return (
        <BaseLayout title="Authentication Service">

            <Tabs defaultValue={tab} className="gap-4" onValueChange={(value) => {
                setTab(value);
            }}>
                <div className="w-full flex justify-between">
                    <div className="lg:w-[33%] max-w-137.5">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="dashboard">
                                <LayoutDashboard /> Dashboard
                            </TabsTrigger>
                            <TabsTrigger value="users">
                                <User /> Users
                            </TabsTrigger>
                            <TabsTrigger value="analytics">
                                <ChartLine /> Analytics
                            </TabsTrigger>
                            <TabsTrigger value="settings">
                                <Settings /> Settings
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Button>New User</Button>
                </div>

                <div className="flex-1">
                    <TabsContent value="dashboard">
                        <AuthDashboardTab />
                    </TabsContent>
                    <TabsContent value="users">Users content</TabsContent>
                    <TabsContent value="analytics">Analytics content</TabsContent>
                    <TabsContent value="settings">Settings content</TabsContent>
                </div>
            </Tabs>
        </BaseLayout >
    )
}