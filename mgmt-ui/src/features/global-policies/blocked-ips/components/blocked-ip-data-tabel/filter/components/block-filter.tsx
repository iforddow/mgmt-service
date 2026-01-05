import { Checkbox } from "@/components/ui/checkbox";

export default function BlockTypeFilter({ blockTypes, onBlockTypesChange }: { blockTypes: ("permanent" | "temporary")[], onBlockTypesChange: (newBlockTypes: ("permanent" | "temporary")[]) => void }) {
    return (
        <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground block">
                Block Type
            </span>
            <div className="flex flex-wrap gap-3">
                {["temporary", "permanent"].map((bt) => (
                    < label
                        key={bt}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                        <Checkbox
                            checked={blockTypes.includes(bt as "permanent" | "temporary")}
                            onCheckedChange={() => {

                                if (blockTypes.includes(bt as "permanent" | "temporary")) {
                                    // Remove from selection
                                    onBlockTypesChange(blockTypes.filter((type) => type !== bt));
                                } else {
                                    // Add to selection
                                    onBlockTypesChange([...blockTypes, bt as "permanent" | "temporary"]);
                                }

                            }}
                            className="h-4 w-4"
                        />
                        <span className="capitalize">{bt}</span>
                    </label>
                ))}
            </div>
        </div >
    );
}