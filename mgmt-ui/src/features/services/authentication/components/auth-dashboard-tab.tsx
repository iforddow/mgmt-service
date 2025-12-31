import ServiceDescriptionCard from "@/components/custom/service-description-card";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTrendingUp } from "@tabler/icons-react";

export default function AuthDashboardTab() {
    return (
        <>
            <ServiceDescriptionCard serviceName="Authentication Service" state="active" />
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardDescription>Total Users</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            2030
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Trending up this month <IconTrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardDescription>Total Users</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            2030
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Trending up this month <IconTrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardDescription>Total Users</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            2030
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Trending up this month <IconTrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardDescription>Total Users</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            2030
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Trending up this month <IconTrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}