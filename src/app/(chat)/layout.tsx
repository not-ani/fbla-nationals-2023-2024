import React from 'react'
import { Header } from './_components/Header'

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col'>
      <Header />
      <div className="relative flex overflow-hidden">
        {children}
      </div>
    </div>
  )
}

