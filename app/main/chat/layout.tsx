import Sidenav from "@/app/components/Sidenav";



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-slate-500 text-light-white">
      
      <div className="flex">
        <div>
          <p>SEARCH</p>
          <Sidenav />
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
