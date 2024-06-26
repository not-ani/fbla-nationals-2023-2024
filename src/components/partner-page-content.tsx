import { type RouterOutputs } from '@/trpc/react'
import React from 'react'

export default async function PartnerPageContent({
  partners
}: {
  partners: RouterOutputs["partnersRouter"]['byId']
}) {
  return (
    <div className='flex flex-col'>

    </div>
  )
}

