"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RentRequestStatus } from "@/types";
import { Check } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { requestStatusAction } from "../_actions/rental-request-actions";
import { toast } from "@/components/ui/toast";

export default function ApproveButton({ status, rentalRequestId }: { status: RentRequestStatus, rentalRequestId: string }) {

    const [newStatus, setNewStatus] = useState(status)
    const [openAlert, setOpenAlert] = useState(false)
    const [state, action, pending] = useActionState(requestStatusAction.bind(null, rentalRequestId), {
        success: false,
        message: "",
        data: null
    })

    useEffect(() => {
        if (state.success) {
            toast.add({
                type: "success",
                title: "Request approval",
                description: state.message || "Request by the renter for renting is approved to pay."
            })
            setOpenAlert(false)
        }
        if (!state.success) {
            toast.add({
                type: "error",
                title: "Request approval",
                description: state.message || "Request by the renter for renting is not approved to pay yet."
            })
        }
    }, [state.success])

    return (
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
            <AlertDialogTrigger
                render={
                    <Button
                        size="icon"
                        variant="outline"
                        disabled={status !== "PENDING"}
                        onClick={() => setNewStatus("APPROVED")}
                        className="h-7 w-7 text-green-600 hover:text-green-400 hover:bg-green-100" aria-label="Approve"
                    >
                        <Check className="h-3.5 w-3.5" />
                    </Button>
                }
            />
            <AlertDialogContent>
                <form action={action}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure to approve?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently update the
                            status of the renter.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">Continue</AlertDialogAction>
                        <input type="hidden" name="status" value={newStatus} />
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}