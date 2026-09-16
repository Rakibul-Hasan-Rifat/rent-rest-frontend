"use client"

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash2, Trash2Icon } from "lucide-react";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { deletePropertyByLandlordAction } from "../_actions/property-actions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function DeleteButton({ propertyId }: { propertyId: string }) {

    const router = useRouter()
    const [input, setInput] = useState(propertyId);
    const [isDeleted, setIsDeleted] = useState(false)
    useEffect(() => {
        if (isDeleted) {
            toast.add({
                type: "success",
                title: "Property Deletion ",
                description: "Property deleted successfully!😎",
            })
            router.refresh()

        }
    }, [isDeleted])


    console.log(input)

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<Button type="submit" variant="outline" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50" aria-label="Delete listing">
                    {
                        <Trash2 className="h-4 w-4" />
                    }
                </Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete property?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this property. So, select option carefully
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className=" border-red-">

                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={async () => {
                        setIsDeleted((await deletePropertyByLandlordAction(propertyId)).success)
                    }}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}