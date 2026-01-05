import { Checkbox } from "@/components/ui/checkbox";

export default function ScopeFilter({ scopes, onScopesChange }: { scopes: ("global" | "service")[]; onScopesChange: (newScopes: ("global" | "service")[]) => void }) {
    return (
        <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground block">
                Scope
            </span>
            <div className="flex flex-wrap gap-3">
                {["global", "service"].map((scope) => (
                    <label
                        key={scope}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                        <Checkbox
                            checked={scopes.includes(scope as "global" | "service")}
                            onCheckedChange={() => {

                                if (scopes.includes(scope as "global" | "service")) {
                                    // Remove from selection
                                    onScopesChange(scopes.filter((s) => s !== scope));
                                } else {
                                    // Add to selection
                                    onScopesChange([...scopes, scope as "global" | "service"]);
                                }

                            }}
                            className="h-4 w-4"
                        />
                        <span className="capitalize">{scope}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}