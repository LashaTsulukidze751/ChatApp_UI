import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-bl from-orange-700 to-red-700 text-center text-light-white shadow">
      <div className="flex items-center justify-center">
        <img src="/logo.png" className="size-60" alt="Picture of the author" />
        <h1 className="-ml-16 text-5xl font-bold drop-shadow-lg">CHATLASH</h1>
      </div>
      <h3 className="-mt-6 text-2xl">
      "Empowering Conversations, Amplifying Connections."
      </h3>
      <Link href={"/main/login"}>
        <button className="mt-20 h-10 w-32 bg-gold text-2xl hover:bg-dark-gold hover:text-black">
          LOG IN
        </button>
      </Link>
      <footer className="absolute bottom-0 flex w-full justify-between p-1 text-sm">
        <p className=" ">2024</p>
        <p>POWERED BY LASHANET</p>
      </footer>
    </div>
  );
}
