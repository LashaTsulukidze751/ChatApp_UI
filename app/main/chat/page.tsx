"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Users{
  username:string,
  profileimage:string,
  usersurname:string
}

export default function Page() {
  const [users, setUsers] = useState<Users[]>([{username:'',usersurname:'',profileimage:''}]);
  const router = useRouter();

  useEffect(() => {
    let ignore = false;

    const getAllUser = async () => {
      try {
        const response = await fetch("http://localhost:4000/main/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: localStorage.getItem("sender"),
          }),
        });
        const result = await response.json();
        if (result.length) {
          setUsers(result);
        } else {
          console.log("not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getAllUser();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div>
        {users.map((user) => (
          <div
            onClick={() => {
              router.push(`/main/chatroom`);
              localStorage.setItem("receiver", user.username);
            }}
          >
            <p>{user.username}</p>
            <img
              src={user.profileimage}
              width={100}
              height={100}
              alt="Picture of the author"
            />
          </div>
        ))}
      </div>
    </>
  );
}
