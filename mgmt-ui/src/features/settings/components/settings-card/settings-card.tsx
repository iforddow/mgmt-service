import { Card, CardHeader } from "@/components/ui/card";

interface SettingsCardProps {
    href: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

export default function SettingsCard({ href, title, description, icon }: SettingsCardProps) {

    return (
        <Card onClick={() => window.location.href = href} className="bg-card/40 max-h-80 flex flex-col hover:bg-accent/60 border-0 cursor-pointer">
            <CardHeader>
                <span className="flex items-center gap-3">
                    <span className="bg-primary p-2 rounded-md [&>svg]:size-5">{icon}</span>
                    <div>
                        <h1 className="text-lg font-medium">{title}</h1>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                </span>
            </CardHeader>
        </Card>
    )
}