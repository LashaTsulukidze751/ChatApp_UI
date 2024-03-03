"use client";
import { IoIosSend } from "react-icons/io";
import React, { useEffect, useState, useRef } from "react";

import { SendMSG, User, sendMessage } from "@/app/functions";
import { useForm, SubmitHandler } from "react-hook-form";

type Smile = {
  character: string;
  codePoint: string;
  unicodeName: string;
};

function SenderForm({
  fetchmessage,
  user1,
  user2,
}: {
  fetchmessage: any;
  user1: User;
  user2: User;
}) {
  const [smiles, setSmiles] = useState<Smile[]>();
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [smilename, setSmilename] = useState("");
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
    return () => {
      if (ignore) {
        emojifetch();
      }
      ignore = false;
    };
  }, []);

  const onSubmit: SubmitHandler<SendMSG> = async (data) => {
    if (data.content !== "") {
      await sendMessage(data.content, user1.userid, user2.userid).then(() => {
        fetchmessage();
      });
      setValue("content", "");
    }
  };

  return (
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
  );
}

export default SenderForm;
