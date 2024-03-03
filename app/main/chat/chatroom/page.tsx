"use client";
import { IoIosSend } from "react-icons/io";
import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getUsersInfo,
  Message,
  fetchedMessage,
  sendMessage,
  SendMSG,
  User,
  deleteMessage,
} from "@/app/functions";
import { useSearchParams } from "next/navigation";

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
  const [smiles, setSmiles] = useState<Smile[]>();
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [smilename, setSmilename] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [messageNumber, setMessageNumber] = useState(0);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const { register, handleSubmit, setValue, getValues } = useForm<SendMSG>();

  const emojifetch = async () => {
    const fetched = await fetch(
      "https://emoji-api.com/emojis?access_key=433ceb66ef94adfed0f6bac6a41215207cb27fa0"
    );
    const result = await fetched.json();
    setSmiles(result);
  };
  useEffect(() => {
    let ignore = true;
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
    return () => {
      if (ignore) {
        emojifetch();
      }
      ignore = false;
    };
  }, []);

  useEffect(() => {
    fetchusers();
  }, [searchParams.get("userid")]);

  const onSubmit: SubmitHandler<SendMSG> = async (data) => {
    if (data.content !== "") {
      await sendMessage(data.content, user1.userid, user2.userid).then(() => {
        handleMessageFetch();
      });
      setValue("content", "");
    }
  };
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex h-10 w-full items-center border border-gray text-black"
      >
        {toggleEmoji && (
          <div className="absolute -top-[330px] h-80 w-[300px] bg-neutral-600 p-2">
            <input
              className="z-10 h-[10%] w-full"
              onChange={(e) => {
                setSmilename(e.target.value);
              }}
            />
            <div className="z-0 mt-2 flex h-[87%] w-full flex-wrap overflow-x-hidden overflow-y-scroll">
              {smiles &&
                smiles.map((smile) => {
                  return (
                    smile.unicodeName.includes(smilename) && (
                      <p
                        key={smile.codePoint}
                        className="size-11 text-center text-[35px] hover:cursor-pointer"
                        onClick={() => {
                          const value = getValues("content");
                          setValue("content", value + smile.character);
                        }}
                      >
                        {smile.character}
                      </p>
                    )
                  );
                })}
              s
            </div>
          </div>
        )}
        <div
          className="flex items-center justify-center pb-1 text-3xl hover:cursor-pointer hover:bg-gold"
          onClick={() => {
            setToggleEmoji(!toggleEmoji);
          }}
        >
          <div className="hover:animate-bounce">&#x1F642;</div>
        </div>
        <input
          type="text"
          className="h-9 w-full bg-inherit pl-2 text-light-white outline-none"
          {...register("content")}
          autoComplete="off"
          onClick={() => {
            setToggleEmoji(false);
          }}
        />
        <button
          type="submit"
          className="hover:fill-gold flex items-center bg-gold px-2 text-white hover:cursor-pointer"
          onClick={() => {
            setToggleEmoji(false);
          }}
        >
          SEND
          <IoIosSend className="size-9 fill-white" />
        </button>
      </form>
    </div>
  );
}
