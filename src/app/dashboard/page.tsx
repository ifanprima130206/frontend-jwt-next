"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useSignout } from "@/hooks/feature/auth/useSignout"
import { useUser } from "@/hooks/feature/auth/useUser"

export default function Page() {
  const { signout, loading: signoutLoading } = useSignout();
  const { user, loading: userLoading, error } = useUser();


  if (userLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 border-b px-4">
          <div className="flex shrink-0 items-center gap-2 ">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center">
            <Button
              className="rounded-full bg-amber-500 px-4 pt-2 pb-3 text-white"
              onClick={signout}
              disabled={signoutLoading}
            >
              {signoutLoading ? "Signing out..." : "Signout"}
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <h1 className="text-2xl">Hello {user?.name}</h1>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
