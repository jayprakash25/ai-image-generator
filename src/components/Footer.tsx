import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-muted/40 py-8">
    <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <p className="text-sm text-muted-foreground">&copy; 2024 Imagine. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
          Terms of Service
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
          Privacy Policy
        </Link>
      </div>
    </div>
  </footer>
  )
}

export default Footer