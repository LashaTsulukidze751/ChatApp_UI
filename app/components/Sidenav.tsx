"use client";
import { useEffect, useState } from "react";

import { getAlluser } from "@/app/functions";
import Link from "next/link";

interface Users {
  userid: string
  username: string;
  profileimage: string;
  usersurname: string;
}

export default function Sizenav() {
  const [users, setUsers] = useState<Users[]>([
    {userid:"", username: "", usersurname: "", profileimage: "" },
  ]);
  const [searchUser, setSearchUser] = useState("");

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
    <div className="flex h-[17vh] w-full flex-col border-r border-gray p-2 sm:h-full sm:w-1/6 md:w-1/3 lg:w-1/4 xl:w-1/6">
      <input
        className="w-full pl-1 text-black outline-amber-400 placeholder:text-black"
        placeholder="Search users"
        onChange={(e) => {
          setSearchUser(e.target.value);
        }}
      />
      <ul className="flex overflow-y-hidden overflow-x-scroll sm:h-full sm:flex-col sm:overflow-x-hidden sm:overflow-y-scroll">
        {users.map((user) => {
          let fullname = user.username + user.usersurname;
          return (
            fullname.includes(searchUser) && (
              <Link
                key={user.username}
                href={{
                  pathname: "/main/chat/chatroom",
                  query: { userid: user.userid },
                }}
              >
                <li
                  className="m-2 flex flex-col items-center hover:text-dark-gold md:flex-row-reverse md:justify-end"
                  onClick={() => handleUsersGet()}
                >
                  <div className="flex md:ml-4">
                    <p>{user.username}</p>
                    <p className="ml-1 hidden md:inline">{user.usersurname}</p>
                  </div>
                  <img
                    className="max-h-14 min-h-14 min-w-14 max-w-14 overflow-hidden rounded-full"
                    src={user.profileimage}
                    alt="Picture of the author"
                  />
                </li>
              </Link>
            )
          );
        })}
      </ul>
    </div>
  );
}
