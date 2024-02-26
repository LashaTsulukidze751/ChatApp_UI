//login
export type LoginInputs = {
  name:string
  password:string
} 
export const userLoginCheck = async (data:LoginInputs) => {
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
        username: localStorage.getItem("sender"),
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

//chatroom
interface User {
  userid: string;
}
export interface Message {
  content: string;
  messageid: number;
  receiverid: number;
  senderid: number;
  timestamp: string;
}
export type SendMSG={
  content:string
} 

export const getUsersID = async (username: string | null) => {
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

export const fetchedMessage = async () => {
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
  const result: Message[] = await response.json();
  return result;
};

export const sendMessage = async (content:string, user1: string, user2: string) => {

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
