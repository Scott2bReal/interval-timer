import { TimerProvider, useTimer } from '../context/TimerProvider'
import { PhaseDisplay } from './PhaseDisplay'
import { TimerConfig } from './TimerConfig'

const StartPauseButton = () => {
  const { timer } = useTimer()
  return (
    <button
      onClick={timer.startPause}
      class="rounded bg-blue-500 px-6 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {timer.state.isRunning ? 'Pause' : 'Start'}
    </button>
  )
}

const ResetButton = () => {
  const { timer } = useTimer()
  return (
    <button
      onClick={timer.reset}
      class="rounded bg-stone-700 px-6 py-2 font-medium text-white hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500"
    >
      Reset
    </button>
  )
}

const Timer = () => {
  return (
    <TimerProvider>
      <div class="mx-auto max-w-md rounded bg-stone-900 p-6 text-center text-stone-100 shadow-lg">
        <PhaseDisplay />
        <div class="mt-6 flex justify-center space-x-4">
          <StartPauseButton />
          <ResetButton />
        </div>
        <TimerConfig />
      </div>
    </TimerProvider>
  )
}

export default Timer
