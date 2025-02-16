import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { Component, Show, useContext } from 'solid-js'
import { InfoDisplayContext } from '../context/InfoDisplayContext'
import { useTimer } from '../context/TimerProvider'
import { Phase } from '../stores/createTimerStore'

const useInfoDisplayContext = () => {
  const ctx = useContext(InfoDisplayContext)
  if (!ctx)
    throw new Error(
      'InfoDisplayContext must be used within InfoDisplayProvider'
    )
  return ctx
}

const displayTime = (seconds: number) => {
  if (seconds <= 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}

interface TimeDisplayProps {
  isSmall?: boolean
  ref?: HTMLDivElement
}
const TimeDisplay: Component<TimeDisplayProps> = (props) => {
  const { timer } = useTimer()
  return (
    <p
      ref={props.ref}
      class={`${props.isSmall ? '' : 'mt-6 text-7xl'} font-bold`}
    >
      {displayTime(timer.state.timeLeft)}
    </p>
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

const SmallScreenInfoDisplay = () => {
  const { timer } = useTimer()
  const { isPhaseVisible, isTimeVisible } = useInfoDisplayContext()
  return (
    <div
      data-show={isPhaseVisible()}
      class="fixed left-0 top-0 flex w-full items-center justify-center gap-4 bg-stone-900 py-2 text-3xl transition-transform duration-300 data-[show=true]:-translate-y-full"
    >
      <span class={getTextColor(timer.state.currentPhase)}>
        {timer.state.currentPhase.toUpperCase()}
      </span>
      <Show when={!isTimeVisible()}>
        <TimeDisplay isSmall={true} />
      </Show>
    </div>
  )
}

interface PhaseDisplayProps {
  ref?: HTMLDivElement
}
const PhaseDisplay: Component<PhaseDisplayProps> = (props) => {
  const { timer } = useTimer()

  return (
    <div ref={props.ref}>
      <h1 class="text-2xl italic">Phase</h1>
      <p class="text-6xl">
        <span class="font-medium">
          <span class={getTextColor(timer.state.currentPhase)}>
            {timer.state.currentPhase.toUpperCase()}
          </span>
        </span>
      </p>
    </div>
  )
}

export const InfoDisplay = () => {
  const useIsPhaseVisible = createVisibilityObserver({
    threshold: 0.5,
    initialValue: true,
  })
  const useIsTimeVisible = createVisibilityObserver({
    threshold: 0.5,
    rootMargin: '-0.7%',
    initialValue: true,
  })

  let phaseRef: HTMLDivElement | undefined
  const isPhaseVisible = useIsPhaseVisible(() => phaseRef)

  let timeRef: HTMLDivElement | undefined
  const isTimeVisible = useIsTimeVisible(() => timeRef)

  return (
    <InfoDisplayContext.Provider value={{ isPhaseVisible, isTimeVisible }}>
      <div class="my-6">
        <SmallScreenInfoDisplay />
        <PhaseDisplay ref={phaseRef} />
        <SetDisplay />
        <CycleDisplay />
        <TimeDisplay ref={timeRef} />
      </div>
    </InfoDisplayContext.Provider>
  )
}
