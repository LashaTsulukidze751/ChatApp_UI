import Link from "next/link";

export default function page() {
  return (
    <>
      <header>
        <Link href={"/main/login"}>
          {" "}
          <button>login</button>{" "}
        </Link>{" "}
      </header>
      <p>hello world</p>
    </>
  );
}
