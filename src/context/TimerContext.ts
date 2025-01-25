import { createContext } from 'solid-js'
import { Timer } from '../stores/createTimerStore'

interface TimerContextType {
  timer: Timer
}

export const TimerContext = createContext<TimerContextType>()
