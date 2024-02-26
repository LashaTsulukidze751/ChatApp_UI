"use client";
import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getUsersID,
  Message,
  fetchedMessage,
  sendMessage,
  SendMSG,
  User,
} from "@/app/functions";


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
  const { register, handleSubmit } = useForm<SendMSG>();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ignore = true;
    const fetchData = async () => {
      if (ignore) {
        await fetchusers();
        console.log("lasha");
      }
    };
    handleMessageFetch();

    return () => {
      fetchData();
      ignore = false;
    };
  }, [localStorage.getItem('receiver'),localStorage.getItem('sender')]);

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit: SubmitHandler<SendMSG> = async (data) => {
    sendMessage(data.content, user1.userid, user2.userid);
    handleMessageFetch();
  };

  //get users
  const fetchusers = async () => {
    setUser1(await getUsersID(localStorage.getItem("sender")));
    setUser2(await getUsersID(localStorage.getItem("receiver")));
  };

  const handleMessageFetch = async () => {
    const result = await fetchedMessage();
    setMessages(result);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-2 pb-4">
      <div className="flex h-16 w-full items-center">
        <img src={user2.profileimage} alt="user image" className="ml-4 size-12 rounded-full"/>
        <p className="ml-4">
          {user2.username} {user2.usersurname}
        </p>
      </div>
      <div
        className="h-full w-full overflow-y-scroll border-y border-gray border-b-white"
        ref={messagesContainerRef}
      >
        {messages.map((message, index) => {
          const toggle = message.senderid == Number(user1.userid);

          return (
            <p
              key={index}
              className={`w-full flex p-px font-light    ${
                toggle ? "justify-end " : "justify-start"
              } `}
            >
              <p
                className={`rounded-md border-gray-400 border p-1 ${
                  toggle ? "bg-gold" : "bg-gray-700"
                }`}
              >
                {message.content}
              </p>
            </p>
          );
        })}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-6 w-full items-baseline text-black"
      >
        <input type="text" className="h-6 w-5/6 outline-none" {...register("content")} autoComplete="off" />
        <button type="submit" className="w-1/6">
          send
        </button>
      </form>
    </div>
  );
}
