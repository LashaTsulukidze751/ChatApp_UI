"use client";

export default function page() {
  

  const getAllUser = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/main/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
        }),
      });
      const result = await response.json();
      if (result.length) {
        console.log(result)
      } else {
        console.log("not found")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button onClick={getAllUser}>get users</button>
    </>
  );
}
