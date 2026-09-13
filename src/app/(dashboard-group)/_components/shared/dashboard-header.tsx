import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

export default function DashboardHeader({headerText, headerButtonText} : {headerText: string, headerButtonText: string}) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border border-red-600">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                />
            </div>
            <div className="w-full flex items-center justify-between">
                <h3>{headerText}</h3>
                <Button size={"lg"}><Plus /> {headerButtonText}</Button>
            </div>
        </header>
    )
}