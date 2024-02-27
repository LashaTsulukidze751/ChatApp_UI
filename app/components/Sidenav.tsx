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
  const [users, setUsers] = useState<Users[]>([
    { username: "", usersurname: "", profileimage: "" },
  ]);
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
    <div className="w-1/6 border-r border-gray md:w-2/6 lg:w-1/4 xl:w-1/6">
      <p>search</p>
      <div className="h-full overflow-y-scroll">
        {users.map((user) => (
          <div
            key={user.username}
            className="m-2 flex flex-col items-center md:flex-row-reverse md:justify-end"
            onClick={() => {
              localStorage.setItem("receiver", user.username);
              router.push(`/main/chat/chatroom`);
              handleUsersGet();
            }}
          >
            <div className="flex md:ml-4">
              <p>{user.username}</p>
              <p className="ml-1 hidden md:inline">{user.usersurname}</p>
            </div>
            <img
              className="size-14 overflow-hidden rounded-full"
              src={user.profileimage}
              alt="Picture of the author"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
