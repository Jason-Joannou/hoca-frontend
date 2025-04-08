"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import MainWorkshopPage from "@/components/dashboard/workshops/main-workshop";
import MainEventsPage from "@/components/dashboard/events/main-events";

export default function Page() {
  const [selectedPage, setSelectedPage] = useState("Home");
  return (
    <SidebarProvider>
      <AppSidebar setSelectedPage={setSelectedPage} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedPage}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {selectedPage === "Events" && <MainEventsPage />}
              {selectedPage === "Workshops" && <MainWorkshopPage />}
              {selectedPage === "Talks" && <p>Talks Content</p>}
              {selectedPage === "Home" && <p>Dashboard Home</p>}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
