import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function EditButton() {
    return (
        <form>
            <Button variant="outline" size="icon" aria-label="Edit listing">
                <Pencil className="h-4 w-4" />
            </Button>
        </form>
    )
}