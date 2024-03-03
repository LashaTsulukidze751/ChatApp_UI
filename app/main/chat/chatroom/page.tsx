"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  getUsersInfo,
  Message,
  fetchedMessage,
  User,
  deleteMessage,
} from "@/app/functions";
import { useSearchParams } from "next/navigation";
import SenderForm from "@/app/components/SenderForm";

type Smile = {
  character: string;
  codePoint: string;
  unicodeName: string;
};

export default function Page() {
  const [user1, setUser1] = useState<User>({
    userid: "",
    username: "",
    usersurname: "",
    profileimage: "",
  });
  const [user2, setUser2] = useState<User>({
    userid: "",
    username: "",
    usersurname: "",
    profileimage: "",
  });
  const [messages, setMessages] = useState<Message[]>([
    { content: "", messageid: 0, receiverid: 0, senderid: 0, timestamp: "" },
  ]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [messageNumber, setMessageNumber] = useState(0);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    fetchusers();
  }, [searchParams.get("userid")]);

  //get users
  const fetchusers = async () => {
    setUser1(await getUsersInfo(localStorage.getItem("sender")));
    setUser2(await getUsersInfo(searchParams.get("userid")));
    await handleMessageFetch();
  };

  const handleMessageFetch = async () => {
    await fetchedMessage(
      localStorage.getItem("sender"),
      searchParams.get("userid")
    ).then((data) => setMessages(data));
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-2 pb-4">
      <div className="flex h-16 w-full items-center">
        <img
          src={user2.profileimage}
          alt="user image"
          className="ml-4 size-12 rounded-full"
        />
        <p className="ml-4">
          {user2.username} {user2.usersurname}
        </p>
      </div>
      <div
        className="mb-2 h-full w-full overflow-x-hidden overflow-y-scroll border border-gray"
        ref={messagesContainerRef}
      >
        {messages.map((message, index) => {
          const toggle = message.senderid == Number(user1.userid);

          return (
            <h1
              key={index}
              onClick={() => {
                setMessageNumber(message.messageid);
              }}
              className={` flex p-px font-light justify-end   ${
                !toggle && " flex-row-reverse"
              } `}
            >
              <div>
                <div
                  onClick={() => {
                    setToggleEdit(!toggleEdit);
                  }}
                  className="cursor-pointer text-xl font-extrabold"
                >
                  ...
                </div>
                <div className="relative">
                  {message.messageid == messageNumber && toggleEdit && (
                    <div
                      className={`absolute bottom-0 flex flex-col right-5 h-28 w-20 bg-gray-600 ${
                        !toggle && "right-0 left-5"
                      }`}
                    >
                      <button
                        onClick={async () => {
                          setToggleEdit(false);
                          await deleteMessage(message.messageid);
                          await handleMessageFetch();
                        }}
                      >
                        delete
                      </button>
                      <button>edit</button>
                    </div>
                  )}
                </div>
              </div>
              <p
                className={`rounded-md border-gray-400 text-xl max-w-[65%] border p-1 mx-1  ${
                  toggle ? "bg-gold" : "bg-dimond"
                }`}
              >
                {message.content}
              </p>
            </h1>
          );
        })}
      </div>
      <SenderForm fetchmessage={handleMessageFetch} user1={user1} user2={user2}/>
    </div>
  );
}
