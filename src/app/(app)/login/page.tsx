'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import LoginButton from '@/components/LoginButton'
import { signOut, useSession } from 'next-auth/react'


const Login = () => {

  // const {data: session} = useSession();

  // if(session){
  //   return (
  //     <>
  //     Signed in as {session.user.email} <br/>
  //     <Button onClick={() => signOut()}>Sign out</Button>
  //     </>
  //   )
  // }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-md text-center">
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-2">
          {/* <ImageIcon className="h-12 w-12 text-primary" /> */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Image Generation</h1>
        </div>
        <div className="space-y-2">
          <p className="text-muted-foreground">Create stunning images with our powerful AI-powered tool.</p>
          <LoginButton/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login




