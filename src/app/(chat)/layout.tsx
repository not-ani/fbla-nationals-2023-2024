import React from 'react'
import { Header } from './_components/Header'

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 bg-muted/50">{children}</main>
    </div>
  )
}

