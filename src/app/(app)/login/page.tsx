"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/LoginButton";
import { signOut, useSession } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex min-h-screen  items-center justify-center bg-gray-100">
      <div className="relative w-full  z-10  overflow-hidden max-w-md rounded-lg p-1 shadow-lg">
        <div className="animate-rotate absolute inset-0 z-0 h-full w-full rounded-lg bg-[conic-gradient(#C0C0C0_20deg,transparent_120deg)]"></div>
        <div className="relative z-20 space-y-4 flex flex-col items-center justify-center py-6 p-[1.5px] bg-gray-100 rounded-lg ">
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-gray-500 p-4 px-8 text-4xl font-bold text-white">
              I
            </div>
          </div>
          <h1 className="text-center text-2xl font-bold">Imagine</h1>
          <p className="text-center text-muted-foreground font-semibold">
            Build art with Imagine
          </p>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
