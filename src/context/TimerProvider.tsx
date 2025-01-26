import { JSXElement, useContext } from 'solid-js'
import { createTimerStore, TimerConfig } from '../stores/createTimerStore'
import { TimerContext } from './TimerContext'

export const useTimer = () => {
  const context = useContext(TimerContext)
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider')
  }
  return context
}

interface TimerProviderProps {
  initialConfig?: TimerConfig
  children: JSXElement
}

export const TimerProvider = (props: TimerProviderProps) => {
  const timer = createTimerStore(props.initialConfig)
  return (
    <TimerContext.Provider value={{ timer }}>
      {props.children}
    </TimerContext.Provider>
  )
}
