"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { IoEyeSharp,IoEyeOffSharp } from "react-icons/io5";


export default function page(){
    const [visible, setVisible] = useState(false);
    const [notFoundMSG, setNotFoundMSG] = useState(false)
    const router = useRouter()
    
    const handlesubmit = async (e:any)=>{
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:4000/main/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username":e.target[0].value,
            "password_hash":e.target[1].value
          }),
        });
        const result = await response.json();
        if(result.length){
          localStorage.setItem("sender",result[0].username)
          router.push('/main/chat')
        }else{
          setNotFoundMSG(true)
        }
        } catch (error) {
          console.error("Error:", error);
      }
    }
    
    return( 
       <main className={`flex min-h-screen w-full flex-col items-center bg-gradient-to-bl from-yellow-500 to-red-600 text-center text-light-white`} >
        <h1 className="mb-2 mt-5 text-[54px] font-bold">LOG IN</h1>
          <div className="flex w-[396px] flex-col bg-gray-300 bg-transparent bg-opacity-60 p-3 text-center">
            <form action="" onSubmit={handlesubmit} onChange={()=>{setNotFoundMSG(false)}} className="flex flex-col">
              <label className="ml-1 text-left text-sm font-bold">NAME</label>
              <input type="text" className="mb-3 w-full border bg-red-600 bg-transparent bg-opacity-30 px-[16px] py-[10px] text-[17px] shadow-lg outline-none placeholder:text-light-white focus:bg-red-600" placeholder="Enter Name" required/>
              <label className="ml-1 text-left text-sm font-bold">PASSWORD</label>
              <div className="mb-7 flex border focus-within:bg-red-700">
                <input type={visible ? "text":"password" } className="w-5/6 bg-red-600 bg-transparent bg-opacity-30 px-[16px] py-[10px] text-[17px] shadow-lg outline-none placeholder:text-light-white" placeholder="Enter Password" required/>
                <div className="flex w-1/6 items-center justify-center bg-red-600 bg-transparent bg-opacity-30" onClick={()=>{setVisible(!visible)}}>
                  {visible ?  <IoEyeSharp className="h-6 w-6 fill-white"/>:<IoEyeOffSharp className="h-6 w-6 fill-white"/>}
                </div>
              </div>
              <button  type="submit" className="lead-[48px] flex h-12 w-full items-center justify-center bg-gold text-xl font-bold shadow-lg hover:bg-dark-gold">Log In</button>
            </form>
            <h3>{notFoundMSG ? <p>user not found</p>:<p className="hidden"></p>}</h3>
            <hr className="my-4"/>
            <Link href={'/main/registration'} className="mx-[90px] mb-3 flex h-12 items-center justify-center bg-[#42b72a] px-4 text-[17px] font-bold shadow-lg">Create account</Link>
          </div>
       </main>
    )
}