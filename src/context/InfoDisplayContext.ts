import { Accessor, createContext } from 'solid-js'

interface ContextValue {
  isPhaseVisible: Accessor<boolean>
  isTimeVisible: Accessor<boolean>
}
export const InfoDisplayContext = createContext<ContextValue>()
