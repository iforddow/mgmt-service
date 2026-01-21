import { useGeneralSettings } from "@/features/settings/pages/general/service/general-setting-service";
import { BACKEND_URL } from "@/lib/config";
import { Helmet } from "react-helmet";

export default function BaseSetup() {

    const { data: generalSettings, isLoading: isGeneralSettingsLoading, dataUpdatedAt } = useGeneralSettings();


    const faviconUrl = generalSettings?.faviconUrl
        ? `${/^https?:\/\//.test(generalSettings.faviconUrl) ? generalSettings.faviconUrl : BACKEND_URL + generalSettings.faviconUrl}?v=${dataUpdatedAt}`
        : null;

    const faviconPng = faviconUrl || "/favicon/favicon-96x96.png";
    const faviconSvg = faviconUrl || "/favicon/favicon.svg";
    const faviconIco = faviconUrl || "/favicon/favicon.ico";
    const appleTouchIcon = faviconUrl || "/favicon/apple-touch-icon.png";

    if (isGeneralSettingsLoading) {
        return null;
    }

    return (
        <Helmet>
            <title>{generalSettings?.systemName || "Atlvon Admin"}</title>
            <link rel="icon" type="image/png" href={faviconPng} sizes="96x96" />
            <link rel="icon" type="image/svg+xml" href={faviconSvg} />
            <link rel="shortcut icon" href={faviconIco} />
            <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
        </Helmet>
    );

}