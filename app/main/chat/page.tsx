"use client";

import { getUsersID, User, fetchedMessageamount } from "@/app/functions";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState<User>({
    username: "",
    usersurname: "",
    profileimage: "",
    userid: "",
  });
  const [messagesAmount, setMessagesAmount] = useState(0);

  const fetchuserInfo = async () => {
    const result = await getUsersID("lasha");
    setUser(result);
    const amount = await fetchedMessageamount(result.userid);
    setMessagesAmount(amount[0].count);
  };
  useEffect(() => {
    fetchuserInfo();
  }, []);
  return (
    <div className="p-5">
      <h1 className="text-center text-2xl">{`${user.username} ${user.usersurname}`}</h1>
      <div className="my-5 flex flex-col items-center justify-center">
        <img
          src={user.profileimage}
          alt="sdl"
          className="mb-5 size-48 rounded-full"
        />
        <button>Choose picture</button>
      </div>
      <p className="">Message sent:{messagesAmount}</p>
    </div>
  );
}
