import { TimerProvider } from '../context/TimerProvider'
import { PhaseDisplay } from './PhaseDisplay'
import { TimerConfig } from './TimerConfig'
import { TimerControls } from './TimerControls'

const Timer = () => {
  return (
    <TimerProvider>
      <div class="mx-auto max-w-md rounded bg-stone-900 p-6 text-center text-stone-100 shadow-lg">
        <PhaseDisplay />
        <TimerControls />
        <TimerConfig />
      </div>
    </TimerProvider>
  )
}

export default Timer
