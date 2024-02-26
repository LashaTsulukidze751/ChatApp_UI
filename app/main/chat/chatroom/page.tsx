"use client";
import React, { useEffect, useState,useRef } from "react";
import {
  getUsersID,
  Message,
  fetchedMessage,
  sendMessage,
  SendMSG,
} from "@/app/functions";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Page() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
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
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit: SubmitHandler<SendMSG> = async (data) => {
    sendMessage(data.content, user1, user2);
    handleMessageFetch()
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
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex h-[600px] w-[300px] flex-col items-end justify-end bg-fuchsia-300">
        <button onClick={handleMessageFetch}>fetch</button>
        <div className="h-fit w-full overflow-y-scroll" ref={messagesContainerRef}>
          {messages.map((message, index) => {
            return (
              <p
                key={index}
                className={`w-full flex ${
                  message.senderid == Number(user1)
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.content}
              </p>
            );
          })}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full items-baseline border border-red-500"
        >
          <input type="text" className="w-5/6" {...register("content")} />
          <button type="submit" className="w-1/6">
            send
          </button>
        </form>
      </div>
    </div>
  );
}
