import { Badge } from "../ui/badge";
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "../ui/card";
import StatusIndicator from "../ui/status-indicator";
import { KeyRound } from "lucide-react";

interface ServiceDescriptionCardProps {
    serviceName: string;
    state: "active" | "down" | "fixing" | "idle";
}

export default function ServiceDescriptionCard({ serviceName, state }: ServiceDescriptionCardProps) {
    return (
        <Card className="w-full mb-4 border-0 bg-linear-to-r from-primary via-primary/80 to-primary/60">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    <div className="flex items-center">
                        <KeyRound className="inline mr-2 size-5 text-primary-foreground" />
                        <span className="text-primary-foreground">{serviceName}</span>
                    </div>
                </CardTitle>
                <CardAction className="flex flex-col items-end gap-y-2">
                    <Badge variant={"secondary"} className="px-3 py-1">
                        <StatusIndicator state={state} label={state.charAt(0).toUpperCase() + state.slice(1)} />
                    </Badge>
                    <p>Active since: 2025-12-30</p>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    Server is listening at
                </div>
                <div className="text-muted-foreground">
                    Visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}