declare module 'mina-scheduler' {
  import { ReactNode } from 'react'

  export interface Event {
    id: string
    title: string
    description?: string
    startDate: Date
    endDate: Date
    variant?: 'primary' | 'danger' | 'success' | 'warning' | 'default'
  }

  export interface SchedulerProviderProps {
    children: ReactNode
    initialEvents?: Event[]
  }

  export function SchedulerProvider(props: SchedulerProviderProps): JSX.Element
  export function SchedularView(): JSX.Element
} 