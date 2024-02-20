"use client";

export default function page() {
  const handlesubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target[0].value,
          usersurname: e.target[1].value,
          gender: e.target[2].checked ? "male" : "female",
          email: e.target[4].value,
          password_hash: e.target[5].value,
        }),
      });
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main
      className={`flex min-h-screen w-full flex-col items-center bg-gray-800 bg-cover bg-no-repeat`}
    >
      <h1 className="mb-2 mt-5 text-[54px] font-bold text-blue-600">
        CREATE ACCOUNT
      </h1>
      <div className="flex w-[396px] flex-col rounded-md bg-gray-300 bg-transparent bg-opacity-60 p-3 text-center shadow-sm">
        <form action="" onSubmit={handlesubmit} className="flex flex-col">
          <label className="text-left text-sm font-bold text-white">NAME</label>
          <input
            type="text"
            className="mb-3 w-full rounded-md border bg-transparent px-[16px] py-[10px] text-[17px] text-white outline-4 outline-blue-500 placeholder:text-white"
            placeholder="Enter Name"
          />
          <label className="text-left text-sm font-bold text-white">
            SURNAME
          </label>
          <input
            type="text"
            className="mb-3 w-full rounded-md border bg-transparent px-[16px] py-[10px] text-[17px] text-white outline-4 outline-blue-500 placeholder:text-white"
            placeholder="Enter Surname"
          />
          <div>
            <input type="radio" name="gender" id="" />
            <label htmlFor="">male</label>
            <input type="radio" name="gender" id="" />
            <label htmlFor="">male</label>
          </div>
          <label className="text-left text-sm font-bold text-white">
            EMAIL
          </label>
          <input
            type="text"
            className="mb-3 w-full rounded-md border bg-transparent px-[16px] py-[10px] text-[17px] text-white outline-4 outline-blue-500 placeholder:text-white"
            placeholder="Enter Email"
          />
          <label className="text-left text-sm font-bold text-white">
            PASSWORD
          </label>
          <input
            type="text"
            className="mb-3 w-full rounded-md border bg-transparent px-[16px] py-[10px] text-[17px] text-white outline-4 outline-blue-500 placeholder:text-white"
            placeholder="Enter Password"
          />
          <button
            type="submit"
            className="lead-[48px] h-12 w-full rounded-[6px] bg-[#1877f2] text-xl font-bold text-white"
          >
            CREATE
          </button>
        </form>
      </div>
    </main>
  );
}
