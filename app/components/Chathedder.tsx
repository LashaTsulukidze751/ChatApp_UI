import logo from "@/public/logo.png";
import Link from "next/link";
import Image from "next/image";
import { IoLogInOutline } from "react-icons/io5";

export default function Chatheader() {
  return (
    <header className="flex h-[15vh] justify-between p-3">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="Picture of the author"
          className="size-16 md:size-20"
        />
        <h1 className="text-2xl font-bold hover:text-gold md:text-3xl">
          CHATLASH
        </h1>
      </div>
      <Link href={"/main/login"} className="flex items-center">
        <h3 className="hidden sm:block md:text-xl">SIGN OUT</h3>{" "}
        <IoLogInOutline className="size-8 hover:text-gold md:size-10" />
      </Link>
    </header>
  );
}
