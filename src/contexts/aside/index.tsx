'use client'

import { createContext, useContext, useState } from 'react'
import type { AsideContextData, AsideContextProviderProps } from './types'

const AsideContext = createContext({} as AsideContextData)

export const AsideContextProvider = ({
  children,
}: AsideContextProviderProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <AsideContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </AsideContext.Provider>
  )
}

export const useAsideContext = () => {
  const context = useContext(AsideContext)

  if (!context) {
    throw new Error(
      'useAsideContext must be used within a AsideContextProvider',
    )
  }

  return context
}
