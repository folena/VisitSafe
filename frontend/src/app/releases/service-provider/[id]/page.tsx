'use client'

import { useParams } from 'next/navigation'
import { ServiceProviderAccessControl } from '@/components/service-provider/ServiceProviderAccessControl'
import { useQuery } from '@tanstack/react-query'
import { useGetServiceProviderRelease } from '@/api/hooks/useGetServiceProviderRelease'
import { Skeleton } from '@/components/ui/skeleton'

export default function ServiceProviderReleasePage() {
  const { id } = useParams()
  const { data: release, isLoading } = useGetServiceProviderRelease(id as string)

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (!release) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Release not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <ServiceProviderAccessControl
        id={id as string}
        onSuccess={() => {
          // Refresh the data
          window.location.reload()
        }}
      />
    </div>
  )
} 