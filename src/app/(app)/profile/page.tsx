"use client";
import { d1, d2, d3 } from "@/assets/imageExports";
import NeonButton from "@/components/NeonButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback } from "@radix-ui/react-avatar";
import axios from "axios";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const [history, setHistory] = useState<{ imageUrl: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const imageMap = {
    d1: d1,
    d2: d2,
    d3: d3,
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/api/history");
        console.log(response);

        if (!response) {
          throw new Error("Failed to fetch history");
        }
        setHistory(response.data.history);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const user: User = session?.user;
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-muted text-foreground">
      <div className="container max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="rounded-full bg-background p-1">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={user?.image}
                width={128}
              />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          <Button onClick={() => {signOut()}} className="ml-auto text-sm font-medium text-primary-foreground">
            Logout
          </Button>
        </div>
        <div className="mt-12 bg-background rounded-lg p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {history.length === 0 && ( 
            <div className="col-span-full space-y-2">
                <p className="text-center col-span-full font-semibold">uh Ohh! You haven't generated any images yet.</p>
                <div className="col-span-full flex items-centers justify-center">
                <Link href='/generate'>
                <NeonButton>
                    Generate
                </NeonButton>
                </Link>
                </div>
                </div> 

                
             )}  
             {history.map((item, index) => (
              <Image
                key={index}
                src={imageMap[item.imageUrl as keyof typeof imageMap]}
                alt="AI Image"
                width={200}
                height={200}
                className="rounded-md object-cover"
              />
            ))} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
