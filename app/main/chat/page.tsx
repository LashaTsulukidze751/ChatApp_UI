"use client";

import ProfileImage from "@/app/components/ProfileImage";
import { getUsersInfo, User, fetchedMessageamount } from "@/app/functions";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState<User>({
    username: "",
    usersurname: "",
    profileimage: "",
    userid: "",
  });
  const [messagesAmount, setMessagesAmount] = useState(0);
  const [toggleProfileImageSelector, setToggleProfileImageSelector] =
    useState(false);

  const fetchuserInfo = async () => {
    const result = await getUsersInfo(localStorage.getItem("sender"));
    setUser(result);
    const amount: any = await fetchedMessageamount(result.userid);
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
        <button
          onClick={() => {
            setToggleProfileImageSelector(!toggleProfileImageSelector);
          }}
        >
          Choose picture
        </button>
        <ProfileImage visibility={toggleProfileImageSelector} />
      </div>
      <p className="">Message sent:{messagesAmount}</p>
    </div>
  );
}
