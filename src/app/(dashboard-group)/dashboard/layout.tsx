import React, { Suspense } from "react";
import DashboardSidebar from "../_components/shared/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DashboardLoader from "../_components/shared/dashboard-loading";
import DashboardHeader from "../_components/shared/dashboard-header";
// import DashboardSidebar from "../_components/shared/Sidebar";

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <DashboardHeader headerText="My Rents" headerButtonText="Register a Property"/>
                <section className="px-2 my-4">
                    <Suspense fallback={<DashboardLoader />}>
                        {children}
                    </Suspense>
                </section>
            </SidebarInset>
            {/* {children} */}
        </SidebarProvider>
    )
}