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
import { useSearchParams } from "next/navigation";

type Smile = {
  character:string
}

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
  const [smiles, setSmiles] = useState<Smile>()
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const { register, handleSubmit, setValue, getValues } = useForm<SendMSG>();


  
  const emojifetch = async () => {
    const fetched = await fetch(
      "https://emoji-api.com/emojis?access_key=433ceb66ef94adfed0f6bac6a41215207cb27fa0"
    );
    const result = await fetched.json();
    console.log(result);
    setSmiles(result)
  };
  useEffect(() => {
    let ignore = true;
    return () => {
      if (ignore) {
        emojifetch();
      }
      ignore = false;
    };
  }, []);

  useEffect(() => {
    fetchusers();
  }, [searchParams.get("name")]);

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit: SubmitHandler<SendMSG> = async (data) => {
    await sendMessage(data.content, user1.userid, user2.userid).then(() => {
      handleMessageFetch();
    });
  };
  //get users
  const fetchusers = async () => {
    setUser1(await getUsersID(localStorage.getItem("sender")));
    setUser2(await getUsersID(searchParams.get("name")));
    await handleMessageFetch();
  };

  const handleMessageFetch = async () => {
    await fetchedMessage(
      localStorage.getItem("sender"),
      searchParams.get("name")
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
        className="h-full w-full overflow-y-scroll border-y border-gray border-b-white"
        ref={messagesContainerRef}
      >
        {messages.map((message, index) => {
          const toggle = message.senderid == Number(user1.userid);
          return (
            <h1
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
            </h1>
          );
        })}
      </div>
      <button
        onClick={() => {
          const value = getValues("content");
          setValue("content", value + "lasha");
        }}
      >
        add something
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex h-6 w-full items-baseline text-black"
      >
        <div className="absolute -top-80 flex w-full flex-wrap overflow-y-scroll">
            {smiles && smiles.map((smile)=>{
              return (<p className="size-12 text-center text-lg">{smile.character}</p>)
            })}
        </div>
        <input
          type="text"
          className="h-6 w-5/6 outline-none"
          {...register("content")}
          autoComplete="off"
        
        />
        <button type="submit" className="w-1/6">
          send
        </button>
      </form>
    </div>
  );
}
