import { createContext } from 'solid-js'
import { TimerStore } from '../stores/createTimerStore'

interface TimerContextType {
  timer: TimerStore
}

export const TimerContext = createContext<TimerContextType>()
