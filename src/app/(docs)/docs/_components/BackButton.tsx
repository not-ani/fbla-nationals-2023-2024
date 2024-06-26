"use client"
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function BackButton() {
  return (
    <Link
      href={`/`}
      className={cn(
        buttonVariants({
          variant: 'ghost'
        }), "items-center text-sm font-medium")}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Go Home
    </Link>
  )
}

