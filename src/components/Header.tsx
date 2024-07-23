"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { BrushIcon, MountainIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";

const Header = () => {
  const { data: session } = useSession();

  const user: User = session?.user;

  return (
    <header className="bg-background sticky top-0 z-40 dark:bg-muted flex items-center justify-between h-16 px-4 md:px-6 border-b border-input dark:border-muted">
      <Link
        href={`${user ? "/" : "/login"}`}
        className="flex items-center gap-2 text-lg font-semibold"
        prefetch={false}
      >
        <BrushIcon className="w-6 h-6 text-primary" />
        <span className="text-lg font-semibold">Imagine</span>
      </Link>

      {session ? (
        <>
          <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
            <Link
              href="/"
              className="text-primary dark:text-primary-foreground"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/generate"
              className="text-primary dark:text-primary-foreground"
              prefetch={false}
            >
              Create
            </Link>
            <Link
              href="/profile"
              className="text-primary dark:text-primary-foreground"
              prefetch={false}
            >
              Profile
            </Link>
          </nav>
          <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
            {/* <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsDarkMode(!isDarkMode)}> */}
            {/* {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />} */}
            {/* <span className="sr-only">Toggle dark mode</span> */}
            {/* </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.image} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href='/profile'>
                <DropdownMenuItem>My Account</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <Link href="/login" prefetch={false}>
          <Button>Login</Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
