import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Globe, Plus, X } from "lucide-react";
import { useState } from "react";

interface IpAddressFilterProps {
    ipList: string[];
    onIpAddressAdd: (ip: string) => void;
    onIpAddressRemove: (ip: string) => void;
}

const ipv4Regex = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
const ipv6Regex = /^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$|^::(?:[a-fA-F0-9]{1,4}:){0,6}[a-fA-F0-9]{1,4}$|^(?:[a-fA-F0-9]{1,4}:){1,7}:$|^(?:[a-fA-F0-9]{1,4}:){0,6}::(?:[a-fA-F0-9]{1,4}:){0,5}[a-fA-F0-9]{1,4}$/;

const isValidIp = (ip: string): boolean => {
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

export default function IpAddressFilter({ ipList, onIpAddressAdd, onIpAddressRemove }: IpAddressFilterProps) {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleAddIp = () => {
        const trimmedIp = inputValue.trim();
        if (!trimmedIp) return;

        if (!isValidIp(trimmedIp)) {
            setError("Invalid IP address format");
            return;
        }

        if (ipList.includes(trimmedIp)) {
            setError("IP address already added");
            return;
        }

        onIpAddressAdd(trimmedIp);
        setInputValue("");
        setError(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddIp();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (error) setError(null);
    };

    return (
        <div>
            <Label htmlFor="ipInput" className="text-xs font-medium text-muted-foreground mb-2">IP Address</Label>
            <InputGroup>
                <InputGroupInput
                    id="ipInput"
                    placeholder="Enter IP Address"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className={error ? "border-destructive" : ""}
                />
                <InputGroupAddon>
                    <Globe />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton onClick={handleAddIp} disabled={!inputValue.trim()}>
                        <Plus />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            {error && (
                <p className="text-xs text-destructive mt-1">{error}</p>
            )}
            {ipList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {ipList.map((ip) => (
                        <Badge key={ip} variant="secondary" className="gap-1 pr-1">
                            {ip}
                            <button
                                type="button"
                                onClick={() => onIpAddressRemove(ip)}
                                className="ml-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
                                aria-label={`Remove ${ip}`}
                            >
                                <X className="size-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}