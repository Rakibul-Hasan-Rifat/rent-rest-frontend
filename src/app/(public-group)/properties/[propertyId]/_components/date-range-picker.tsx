"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { DateRange } from "react-day-picker";
import rentRequestAction from "../_actions/rent-request-action";

export default function DateRangePicker({ propertyId }: { propertyId: string }) {

    const [state, action, pending] = useActionState(rentRequestAction, { startDate: '', endDate: '', propertyId: '' })
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
    })

    console.log(date?.from?.toISOString(), date?.to?.toISOString(), propertyId, state, action)

    return (
        <form action={action} className="w-full flex flex-col items-center gap-2">
            <Field className="mx-auto w-full">
                {/* <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel> */}
                <Popover>
                    <PopoverTrigger render={<Button variant="outline" id="date-picker-range" className="justify-start px-2.5 font-normal"><CalendarIcon data-icon="inline-start" />{date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                    ) : (
                        <span>Pick a date</span>
                    )}</Button>} />
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </Field>
            <input type="hidden" name="startDate" value={date?.from ? date.from.toISOString() : ""} />
            <input type="hidden" name="endDate" value={date?.to ? date.to.toISOString() : ""} />
            <input type="hidden" name="propertyId" value={propertyId} />
            <Button type="submit" className="w-full">Confirm Rent Request</Button>
        </form>
    )
}