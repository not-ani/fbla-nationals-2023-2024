import React from 'react'
import { UsersNav } from './_components/UserNav'

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col">
      <UsersNav />
      {children}
    </div>
  )
}
