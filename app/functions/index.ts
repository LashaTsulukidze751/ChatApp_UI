//login
export type LoginInputs = {
  name: string;
  password: string;
};
export const userLoginCheck = async (data: LoginInputs) => {
  try {
    const response = await fetch("http://localhost:4000/main/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.name,
        password_hash: data.password,
      }),
    });
    const result = await response.json();
    if (result.length) {
      localStorage.setItem("sender", result[0].username);
    }
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

//registration
export type RegInputs = {
  name: string;
  surname: string;
  gender: string;
  email: string;
  password: string;
};
export const userRegistration = async (data: RegInputs) => {
  try {
    const response = await fetch("http://localhost:4000/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.name,
        usersurname: data.surname,
        gender: data.gender,
        email: data.email,
        password_hash: data.password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

//chat
//get all users username and exept that who loged in
export const getAlluser = async () => {
  try {
    const response = await fetch("http://localhost:4000/main/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: localStorage.getItem("sender"),
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

//chatroom
export interface User {
  userid: string;
  username: string;
  usersurname: string;
  profileimage: string;
}
export interface Message {
  content: string;
  messageid: number;
  receiverid: number;
  senderid: number;
  timestamp: string;
}
export type SendMSG = {
  content: string;
};

export const getUsersInfo = async (data: string | null) => {
  const response = await fetch("http://localhost:4000/main/chatroom/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid: data }),
  });
  const result: User[] = await response.json();
  return result[0];
};

export const fetchedMessage = async (
  userid1: string | null,
  userid2: string | null
) => {
  const response = await fetch("http://localhost:4000/main/chatroom", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user1: userid1,
      user2: userid2,
    }),
  });
  const result: Message[] = await response.json();

  return result;
};

export const sendMessage = async (
  content: string,
  user1: string | null,
  user2: string
) => {
  await fetch("http://localhost:4000/main/chatroom/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      senderid: user1,
      receiverid: user2,
      content: content,
    }),
  });
};

export const fetchedMessageamount = async (data: string) => {
  const response = await fetch("http://localhost:4000/main/userinfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: data,
    }),
  });
  const result: { count: string } = await response.json();
  return result;
};

export const deleteMessage = async (data: number) => {
  const response = await fetch("http://localhost:4000/main/chat/messages", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messageid: data,
    }),
  });
};





export type ProfileImageType = {
  imageid:string
  imageurl:string
}

//fetch profile images
export const profileImagess = async () => {
  const response = await fetch("http://localhost:4000/main/chat");
  const result:ProfileImageType = await response.json();
  return result;
};
//change profile picture
export const handleProfileImageChange = async (url:string)=>{
  const response = await fetch("http://localhost:4000/main/chat", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url,
      userid:localStorage.getItem("sender")
    }),
  });
  const result = await response.text();
}
//fetch emojis
export const emojifetch = async () => {
  const fetched = await fetch(
    "https://emoji-api.com/emojis?access_key=433ceb66ef94adfed0f6bac6a41215207cb27fa0"
  );
  const result = await fetched.json();
  return result;
};
