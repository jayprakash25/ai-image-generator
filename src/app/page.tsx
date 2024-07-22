import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { hero } from '@/assets'
import NeonButton from '@/components/NeonButton'
import { d1, d2, d3 } from '@/assets/imageExports'

const page = () => {
  return (
<div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1">
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gradient-to-b from-[#f0f0f0] to-white">
      <section className="container px-4 py-12 md:py-24 lg:py-32 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Delight Your Audience</h1>
          <p className="text-muted-foreground font-semibold text-lg md:text-xl">
            Create prompts that anyone can use to make awesome images
          </p>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-7">
            <Image src={d1} width={150} height={150} alt="Example Image" className="rounded-lg" />
            <Image src={d2} width={150} height={150} alt="Example Image" className="rounded-lg" />
            <Image src={d3} width={150} height={150} alt="Example Image" className="rounded-lg" />
            <Image src={d1} width={150} height={150} alt="Example Image" className="rounded-lg" />
            <Image src={d2} width={150} height={150} alt="Example Image" className="rounded-lg" />
            <Image src={d3} width={150} height={150} alt="Example Image" className="rounded-lg" />
            <Image src={d1} width={150} height={150} alt="Example Image" className="rounded-lg" />
          </div>
          <div>
          <Link   href="/generate"
            prefetch={false}>
          <NeonButton>
            Generate
          </NeonButton>
          </Link>
          </div>
        </div>
      </section>
    </div>
        <section className="container py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Explore Generated Images</h2>
            <Link
              href="/generate"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Generate
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg bg-muted/40 transition-all hover:scale-105"
              >
                <Image
                  src={i%2 == 0 ? d1 : d3}
                  width={300}
                  height={300}
                  alt={`Image ${i + 1}`}
                  className="aspect-square w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="ghost" size="icon">
                    <HeartIcon className="h-4 w-4" />
                    <span className="sr-only">Like</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Link
        href="/generate"
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        prefetch={false}
      >
        <PlusIcon className="h-6 w-6 text-primary-foreground" />
        <span className="sr-only">Generate</span>
      </Link>
    </div>  )
}

export default page



function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}