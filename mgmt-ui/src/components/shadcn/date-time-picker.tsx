import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type DateTimePickerProps = {
    id?: string
    value?: string // ISO string expected
    onChange?: (v: string) => void
}

export function DateTimePicker({ id, value, onChange }: DateTimePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [time, setTime] = React.useState<string>("00:00") // committed HH:MM
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    React.useEffect(() => {
        if (!value) {
            setDate(undefined)
            setTime("00:00")
            if (inputRef.current) inputRef.current.value = "00:00"
            return
        }
        const parsed = new Date(value)
        if (!isNaN(parsed.getTime())) {
            setDate(parsed)
            const hh = String(parsed.getHours()).padStart(2, "0")
            const mm = String(parsed.getMinutes()).padStart(2, "0")
            const timeStr = `${hh}:${mm}`
            setTime(timeStr)
            if (inputRef.current) inputRef.current.value = timeStr
            return
        }
        if (value.includes("T")) {
            const [d, t] = value.split("T")
            const timeParts = (t || "").split(":")
            const timeStr = timeParts.slice(0, 2).join(":")
            const parsedDate = new Date(d)
            if (!isNaN(parsedDate.getTime())) {
                setDate(parsedDate)
                setTime(timeStr)
                if (inputRef.current) inputRef.current.value = timeStr
                return
            }
        } else {
            const parsedDate = new Date(value)
            if (!isNaN(parsedDate.getTime())) {
                setDate(parsedDate)
                const hh = String(parsedDate.getHours()).padStart(2, "0")
                const mm = String(parsedDate.getMinutes()).padStart(2, "0")
                const timeStr = `${hh}:${mm}`
                setTime(timeStr)
                if (inputRef.current) inputRef.current.value = timeStr
                return
            }
        }
    }, [value])

    const TIME_RE = /^\d{2}:\d{2}$/

    const maybeEmit = (nextDate?: Date, nextTime?: string) => {
        const d = nextDate ?? date
        const t = nextTime ?? time
        if (!d || !t) return
        if (!TIME_RE.test(t)) return
        const [hh, mm] = t.split(":").map((p) => Number(p) || 0)
        const combinedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hh, mm, 0, 0)
        onChange?.(combinedDate.toISOString())
    }

    const normalizeTime = (raw: string) => {
        const cleaned = raw.replace(/[^\d:]/g, "").slice(0, 5)
        if (cleaned.includes(":")) {
            const [a, b] = cleaned.split(":")
            const hh = a.padStart(2, "0").slice(0, 2)
            const mm = (b || "").padStart(2, "0").slice(0, 2)
            return `${hh}:${mm}`
        }
        if (cleaned.length === 3) {
            return `${cleaned.slice(0, 1).padStart(2, "0")}:${cleaned.slice(1)}`
        }
        if (cleaned.length === 4) {
            return `${cleaned.slice(0, 2)}:${cleaned.slice(2)}`
        }
        if (cleaned.length === 2) {
            return `${cleaned}:00`
        }
        return cleaned
    }

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id={id ?? "date-picker"}
                            className="w-32 justify-between font-normal"
                        >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            startMonth={new Date()}
                            endMonth={new Date(new Date().getFullYear(), new Date().getMonth() + 120, 1)}
                            disabled={{ before: new Date() }}
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(d) => {
                                setDate(d)
                                if (TIME_RE.test(time)) {
                                    maybeEmit(d, time)
                                }
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex flex-col gap-3">
                <Input
                    ref={inputRef as any}
                    type="time"
                    id={id ? `${id}-time` : "time-picker"}
                    step={60}
                    // don't control value via React to avoid browser coercion while typing
                    onInput={(e) => {
                        const v = (e.target as HTMLInputElement).value
                        // only commit when it's a full HH:MM to avoid overwriting during typing
                        if (TIME_RE.test(v)) {
                            setTime(v)
                            maybeEmit(date, v)
                        }
                    }}
                    onBlur={() => {
                        const raw = inputRef.current?.value ?? ""
                        const norm = normalizeTime(raw)
                        if (norm !== raw && inputRef.current) inputRef.current.value = norm
                        if (TIME_RE.test(norm)) {
                            setTime(norm)
                            maybeEmit(date, norm)
                        }
                    }}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    )
}