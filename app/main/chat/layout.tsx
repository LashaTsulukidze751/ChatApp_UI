"use client"
import Chatheader from "@/app/components/Chathedder";
import Sidenav from "@/app/components/Sidenav";



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-slate-500 text-light-white">
      <Chatheader/>
      <div className="flex h-[85vh] w-full overflow-y-hidden border-t border-gray">
        <Sidenav />
        <div className="w-5/6 md:w-2/3 lg:w-3/4 xl:w-5/6">{children}</div>
      </div>
    </div>
  );
}
