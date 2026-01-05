import BaseLayout from "@/components/layout/base-layout";
import SettingsForm from "./components/settings-form/settings-form";

export default function SettingsPage() {
    return (
        <BaseLayout title="Settings">
            <SettingsForm />
        </BaseLayout>
    )
}