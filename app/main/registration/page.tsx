"use client";
import { userRegistration } from "@/app/functions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [userAddedMSG, setUserAddedMSG]=useState({message:'',added:false})
  const router = useRouter();

  const handleSubmit = async (e:any)=>{
    e.preventDefault();
    const result:any = await userRegistration(e)
      setUserAddedMSG(result)
    if(result.added){
      setTimeout(() => {
         router.push('/main/login')
      }, 1500);
     
    }
  }
  

  return (
    <main
      className={`flex min-h-screen w-full flex-col items-center bg-gradient-to-tl from-sky-500 to-gray-500`}
    >
      <h1 className="mb-2 mt-5 text-4xl font-bold text-light-white md:text-6xl">
        CREATE ACCOUNT
      </h1>
      <div className="flex w-5/6 flex-col rounded-md bg-gray-300 bg-transparent bg-opacity-60 p-3 text-center shadow-sm md:w-1/2 lg:w-1/3">
        <form action="" onSubmit={handleSubmit} className="flex w-full flex-col">
          <label className="ml-1 text-left text-sm font-bold text-white">NAME</label>
          <input
            type="text"
            className="mb-3 w-full rounded-md border bg-transparent px-[16px] py-[10px] text-[17px] text-white outline-4 outline-blue-500 placeholder:text-white"
            placeholder="Enter Name"
          />
          <label className="ml-1 text-left text-sm font-bold text-white">
            SURNAME
          </label>
          <input
            type="text"
            className="mb-3 w-full rounded-md border bg-transparent px-[16px] py-[10px] text-[17px] text-white outline-4 outline-blue-500 placeholder:text-white"
            placeholder="Enter Surname"
          />
          <label  className="ml-1 text-left text-sm font-bold text-white">GENDER</label>
          <div>
            <input type="radio" name="gender" id="" />
            <label className="ml-1 text-left text-sm font-bold text-white">Male</label>
            <input type="radio" className="ml-4"  name="gender" id="" />
            <label className="ml-1 text-left text-sm font-bold text-white">Female</label>
          </div>
          <label className="ml-1 text-left text-sm font-bold text-white">
            EMAIL
          </label>
          <input
            type="text"
            className="mb-3 w-full rounded-md border bg-transparent px-[16px] py-[10px] text-[17px] text-white outline-4 outline-blue-500 placeholder:text-white"
            placeholder="Enter Email"
          />
          <label className="ml-1 text-left text-sm font-bold text-white">
            PASSWORD
          </label>
          <input
            type="text"
            className="mb-3 w-full rounded-md border bg-transparent px-[16px] py-[10px] text-[17px] text-white outline-4 outline-blue-500 placeholder:text-white"
            placeholder="Enter Password"
          />
          <button
            type="submit"
            className="lead-[48px] h-12 w-full rounded-[6px] bg-[#1877f2] text-xl font-bold text-white hover:bg-sky-400"
          >
            CREATE
          </button>
          <p className="text-light-white">{userAddedMSG.message}</p>

        </form>
      </div>
    </main>
  );
}
