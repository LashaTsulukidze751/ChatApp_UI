"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAlluser } from "@/app/functions";

interface Users {
  username: string;
  profileimage: string;
  usersurname: string;
}

export default function Sizenav() {
  const [users, setUsers] = useState<Users[]>([{ username: "", usersurname: "", profileimage: "" }]);
  const router = useRouter();

  useEffect(() => {
    let ignore = false;
    handleUsersGet();
    return () => {
      ignore = true;
    };
  }, []);

  //get all users username and exept that who loged in
  const handleUsersGet = async () => {
    const result = await getAlluser();
    setUsers(result);
  };

  return (
    <>
      <div>
        {users.map((user) => (
          <div key={user.username}
            onClick={() => {
                handleUsersGet();
              router.push(`/main/chat/chatroom`);
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
