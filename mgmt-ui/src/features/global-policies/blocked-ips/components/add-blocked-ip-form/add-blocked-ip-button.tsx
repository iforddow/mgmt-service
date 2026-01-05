import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddBlockedIpForm from "./add-blocked-ip-form";
import { useState } from "react";

export default function AddBlockedIpButton() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus className="size-4" />
                    Add Blocked IP
                </Button>
            </DialogTrigger>
            <DialogTitle>Add Blocked IP</DialogTitle>
            <DialogDescription>
                Use the form below to add a new blocked IP address or range to the system.
            </DialogDescription>
            <DialogContent className="sm:max-w-200" onInteractOutside={(e) => { e.preventDefault() }}>
                <AddBlockedIpForm setDialogState={setIsOpen} />
            </DialogContent>
        </Dialog>
    )
}