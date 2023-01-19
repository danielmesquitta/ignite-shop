import { ReactNode } from 'react'

export interface AsideContextProviderProps {
  children: ReactNode
}

export interface AsideContextData {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}
