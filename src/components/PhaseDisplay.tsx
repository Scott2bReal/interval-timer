import { useTimer } from '../context/TimerProvider'
import { Phase } from '../stores/createTimerStore'

const displayTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}

const TimeDisplay = () => {
  const { timer } = useTimer()
  return (
    <p class="mt-6 text-7xl font-bold">{displayTime(timer.state.timeLeft)}</p>
  )
}

const SetDisplay = () => {
  const { timer } = useTimer()
  return (
    <p class="mt-6 text-2xl">
      Set: {timer.state.currentSet} / {timer.state.totalSets}
    </p>
  )
}

const CycleDisplay = () => {
  const { timer } = useTimer()
  return (
    <p class="mt-6 text-2xl">
      Cycle: {timer.state.currentCycle} / {timer.state.cyclesPerSet}
    </p>
  )
}

function getTextColor(phase: Phase) {
  switch (phase) {
    case 'on':
      return 'text-green-400'
    case 'off':
      return 'text-red-400'
    case 'getReady':
      return 'text-yellow-400'
    case 'complete':
      return 'text-green-400'
    case 'rest':
      return 'text-blue-400'
  }
}

export const PhaseDisplay = () => {
  const { timer } = useTimer()
  return timer.state.phase !== 'complete' ? (
    <div class="my-6">
      <div class="">
        <h1 class="text-sm italic">Phase</h1>
        <p class="text-6xl">
          <span class="font-medium">
            <span class={getTextColor(timer.state.phase)}>
              {timer.state.phase.toUpperCase()}
            </span>
          </span>
        </p>
      </div>
      <SetDisplay />
      <CycleDisplay />
      <TimeDisplay />
    </div>
  ) : (
    <div class="mt-6">
      <h2 class="text-2xl font-semibold text-green-400">
        Workout Complete! 🎉
      </h2>
    </div>
  )
}
