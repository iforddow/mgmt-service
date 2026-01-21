import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface ConfirmActionModalProps {
    showButtonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    actionButtonLabel?: string;
    cancelButtonLabel?: string;
    actionButtonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    title?: string;
    description?: string;
    onConfirm?: () => void;
    triggerElement?: React.ReactNode;
}

export function ConfirmActionModal({ showButtonVariant, actionButtonVariant, actionButtonLabel, cancelButtonLabel, title, description, onConfirm, triggerElement }: ConfirmActionModalProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {triggerElement || <Button variant={showButtonVariant}>{actionButtonLabel || "Show Dialog"}</Button>}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title || "Are you absolutely sure?"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description || "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelButtonLabel || "Cancel"}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} asChild>
                        <Button variant={actionButtonVariant || "destructive"}>{actionButtonLabel || "Confirm"}</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
