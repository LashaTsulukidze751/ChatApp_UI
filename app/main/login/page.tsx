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
       <main className={`flex min-h-screen w-full flex-col items-center bg-gray-500 bg-cover bg-no-repeat`} >
                <h1 className="mb-2 mt-5 text-[54px] font-bold text-blue-600">LOG IN</h1>
            <div className="flex w-[396px] flex-col rounded-md bg-gray-300 bg-transparent bg-opacity-60 p-3 text-center shadow-sm">
                <form action="" onSubmit={handlesubmit} onChange={()=>{setNotFoundMSG(false)}} className="flex flex-col">
                    <label className="text-left text-sm font-bold text-white">USERNAME</label>
                    <input type="text" className="mb-3 w-full rounded-md border bg-transparent px-[16px] py-[10px] text-[17px] text-white outline-4 outline-blue-500 placeholder:text-white" placeholder="Enter Username" required/>
                    <label className="text-left text-sm font-bold text-white">PASSWORD</label>
                    <div className="mb-7 flex rounded-md border">
                        <input type={visible ? "password": "text"} className="w-5/6 bg-transparent px-[16px] py-[10px] text-[17px] text-white outline-4 outline-blue-500 placeholder:text-white" placeholder="Enter Password" required/>
                        <div className="flex w-1/6 items-center justify-center" onClick={()=>{setVisible(!visible)}}>
                            {visible ? <IoEyeOffSharp className="h-6 w-6 fill-white"/>:<IoEyeSharp className="h-6 w-6 fill-white"/>}
                        </div>
                    </div>
                    <button  type="submit" className="lead-[48px] flex h-12 w-full items-center justify-center rounded-[6px] bg-[#1877f2] text-xl font-bold text-white">Log In</button>
                </form>
                <h3>{notFoundMSG ? <p>user not found</p>:<p className="invisible"></p>}</h3>
                <hr className="my-4"/>
                <Link href={'/registration'} className="mx-[90px] mb-3 flex h-12 items-center justify-center rounded-md bg-[#42b72a] px-4 text-[17px] font-bold text-white">Create account</Link>
            </div>
       </main>
    )
}