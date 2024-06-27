import * as React from 'react'

import {
  IconSeparator,
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from '@/components/chat/sidebar-toggle'
import { ChatHistory } from './ChatHistory'
import BackButton from '@/app/(docs)/docs/_components/BackButton'

async function UserOrLogin() {
  return (
    <>
      <>
        <SidebarMobile>
          <ChatHistory />
        </SidebarMobile>
        <SidebarToggle />
      </>
      <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        <UserMenu />
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <BackButton />
      </div>
    </header>
  )
}
