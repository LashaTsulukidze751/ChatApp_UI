"use client";
import React, { useEffect, useState } from "react";

interface Message {
  content: string;
  messageid: number;
  receiverid: number;
  senderid: number;
  timestamp: string;
}

interface User {
  userid: string;
}

const Page: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "", messageid: 0, receiverid: 0, senderid: 0, timestamp: "" },
  ]);
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");

  // Fetch messages on component mount
  useEffect(() => {
    let ignore = true;
    if (ignore) {
      fetchMessage();
    }
    return () => {
      ignore = false;
    };
  }, []);

  useEffect(() => {
    let ignore = true;
    const fetchData = async () => {
      if (ignore) {
        await fetchusers();
      }
    };
    fetchData();
    return () => {
      ignore = false;
    };
  }, [user1, user2]);

  const fetchusers = async () => {
    setUser1(await getUsersID(localStorage.getItem("sender")));
    setUser2(await getUsersID(localStorage.getItem("receiver")));
  };

  //get users
  const getUsersID = async (username: string | null) => {
    const response = await fetch("http://localhost:4000/main/chatroom/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: username }),
    });
    const result: User[] = await response.json();
    return result[0].userid;
  };

  // Fetch messages function
  const fetchMessage = async () => {
    const response = await fetch("http://localhost:4000/main/chatroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user1: localStorage.getItem("sender"),
        user2: localStorage.getItem("receiver"),
      }),
    });
    const fetchedMessages: Message[] = await response.json();
    setMessages(fetchedMessages);
  };

  // Send message function
  const sendMessage = async (e: any) => {
    e.preventDefault();
    await fetch("http://localhost:4000/main/chatroom/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderid: user1,
        receiverid: user2,
        content: e.target[0].value,
      }),
    });
    fetchMessage();
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex h-[600px] w-[300px] flex-col items-end justify-end bg-fuchsia-300">
        <button onClick={fetchMessage}>fetch</button>
        <div className="h-fit w-full overflow-y-scroll">
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
          onSubmit={sendMessage}
          className="flex w-full items-baseline border border-red-500"
        >
          <input type="text" name="content" className="w-5/6" />
          <button type="submit" className="w-1/6">
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
