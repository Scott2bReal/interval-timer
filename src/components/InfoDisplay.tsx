import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { useTimer } from '../context/TimerProvider'
import { Phase } from '../stores/createTimerStore'

const displayTime = (seconds: number) => {
  if (seconds <= 0) return '0:00'
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
    <p class="mt-2 text-2xl">
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

const useIsVisible = createVisibilityObserver({
  threshold: 0.5,
  initialValue: true,
})

const PhaseDisplay = () => {
  const { timer } = useTimer()

  let el: HTMLDivElement | undefined
  const isVisible = useIsVisible(() => el)

  return (
    <>
      <div
        data-is-main-display-visible={isVisible()}
        class="fixed left-0 top-0 w-full bg-stone-900 py-2 text-3xl transition-transform duration-300 data-[is-main-display-visible=true]:-translate-y-full"
      >
        <span class={getTextColor(timer.state.currentPhase)}>
          {timer.state.currentPhase.toUpperCase()}
        </span>
      </div>
      <div data-is-visible={isVisible()} ref={el}>
        <h1 class="text-2xl italic">Phase</h1>
        <p class="text-6xl">
          <span class="font-medium">
            <span class={getTextColor(timer.state.currentPhase)}>
              {timer.state.currentPhase.toUpperCase()}
            </span>
          </span>
        </p>
      </div>
    </>
  )
}

export const InfoDisplay = () => {
  return (
    <div class="my-6">
      <PhaseDisplay />
      <SetDisplay />
      <CycleDisplay />
      <TimeDisplay />
    </div>
  )
}
