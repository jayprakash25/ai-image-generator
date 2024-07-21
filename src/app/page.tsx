import { getUserSession } from "@/lib/session";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default async function Home () {

  return (
      <div>
        <h1>Home</h1>
        {/* <p>{user?.email}</p> */}
      </div>
  );
}
