"use client";
// Importing React and relevant types
import React, { useEffect, useState } from "react";

// Defining the message type
interface Message {
  content: string;
  messageid: number;
  receiverid: number;
  senderid: number;
  timestamp: string;
}

const Page: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "", messageid: 0, receiverid: 0, senderid: 0, timestamp: "" },
  ]);

  // Fetch messages on component mount
  useEffect(() => {
    let ignore=true;
    
    return ()=>{
      if(ignore){
        fetchMessage();
        ignore=false
      }
      
    }
  }, []);

  // Fetch messages function
  const fetchMessage = async () => {
    const data = {
      user1: "1",
      user2: "2",
    };
    const response = await fetch("http://localhost:4000/main/chatroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const fetchedMessages: Message[] = await response.json();
    setMessages(fetchedMessages);
    console.log(fetchedMessages);
  };

  // Send message function
  const sendMessage = async (e: any) => {
    e.preventDefault();
    const data = {
      senderid: "2",
      receiverid: "1",
      content: e.target[0].value,
    };
    const response = await fetch("http://localhost:4000/main/chatroom/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const fetchedMessages: Message[] = await response.json();
    console.log(fetchedMessages);
    fetchMessage();
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex h-[600px] w-[300px] flex-col items-end justify-end bg-fuchsia-300">
        <button onClick={fetchMessage}>fetch</button>
        <div className="h-fit w-full overflow-y-scroll">
          {messages.map((message, index) => {
            const textAlignClass =
              message.senderid % 2 ? "justify-end" : "justify-start";

            return (
              <p key={index} className={`w-full flex ${textAlignClass}`}>
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
