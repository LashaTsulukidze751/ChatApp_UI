"use client"
import Chatheader from "@/app/components/Chathedder";
import Sidenav from "@/app/components/Sidenav";



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-darkBlack text-light-white">
      <Chatheader/>
      <div className="flex h-[90vh] w-full flex-col overflow-y-hidden border-t border-gray sm:flex-row md:h-[88vh]">
        <Sidenav />
        <div className="h-[73vh] w-full sm:h-full sm:w-5/6 md:w-2/3 lg:w-3/4 xl:w-5/6">{children}</div>
      </div>
    </div>
  );
}
