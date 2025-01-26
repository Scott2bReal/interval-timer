import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'

export type Phase = 'getReady' | 'on' | 'off' | 'rest' | 'complete'

interface TimerControls {
  setTotalSets: (value: number) => void
  setCyclesPerSet: (value: number) => void
  setOnDuration: (value: number) => void
  setOffDuration: (value: number) => void
  setRestDuration: (value: number) => void
  startPause: () => void
  reset: () => void
}

interface TimerState {
  currentPhase: Phase
  timeLeft: number
  currentSet: number
  currentCycle: number
  isRunning: boolean
  totalSets: number
  cyclesPerSet: number
  onDuration: number
  offDuration: number
  restDuration: number
}

export interface Timer {
  state: TimerState
  controls: TimerControls
}

export interface InitialConfig {
  totalSets: number
  cyclesPerSet: number
  onDuration: number
  offDuration: number
  restDuration: number
  initialPhase: Phase
}

export function createTimerStore(
  initialConfig: InitialConfig = {
    totalSets: 4,
    cyclesPerSet: 4,
    onDuration: 6,
    offDuration: 6,
    restDuration: 120,
    initialPhase: 'getReady',
  }
): Timer {
  const [state, setState] = createStore<TimerState>({
    currentPhase: 'getReady',
    timeLeft: 5,
    currentSet: 1,
    currentCycle: 1,
    isRunning: false,
    totalSets: initialConfig.totalSets,
    cyclesPerSet: initialConfig.cyclesPerSet,
    onDuration: initialConfig.onDuration,
    offDuration: initialConfig.offDuration,
    restDuration: initialConfig.restDuration,
  })

  let currentTime: number | null = null

  const clearTimer = () => {
    if (currentTime) {
      clearInterval(currentTime)
      currentTime = null
    }
  }

  const startTimer = () => {
    if (state.isRunning) {
      clearTimer()
      currentTime = setInterval(() => {
        setState('timeLeft', (prev) => prev - 1)
      }, 1000)
    } else {
      clearTimer()
    }
  }

  const handlePhaseTransition = () => {
    if (state.timeLeft > 0 || !state.isRunning) return

    switch (state.currentPhase) {
      case 'getReady':
        setState({ currentPhase: 'on', timeLeft: state.onDuration })
        break
      case 'on':
        if (state.currentCycle < state.cyclesPerSet) {
          setState({ currentPhase: 'off', timeLeft: state.offDuration })
        } else if (state.currentSet < state.totalSets) {
          setState({ currentPhase: 'rest', timeLeft: state.restDuration })
        } else {
          setState({ currentPhase: 'complete', isRunning: false })
        }
        break
      case 'off':
        setState({
          currentPhase: 'on',
          timeLeft: state.onDuration,
          currentCycle: state.currentCycle + 1,
        })
        break
      case 'rest':
        setState({
          currentPhase: 'on',
          timeLeft: state.onDuration,
          currentSet: state.currentSet + 1,
          currentCycle: 1,
        })
        break
      case 'complete':
        setState({ isRunning: false })
        break
    }
  }

  const startPause = () => {
    setState('isRunning', !state.isRunning)
    startTimer()
  }

  const reset = () => {
    clearTimer()
    setState({
      currentPhase: 'getReady',
      timeLeft: 5,
      currentSet: 1,
      currentCycle: 1,
      isRunning: false,
    })
  }

  createEffect(() => {
    if (state.isRunning) startTimer()
    return () => clearTimer()
  })

  createEffect(() => {
    handlePhaseTransition()
  })

  return {
    state,
    controls: {
      setTotalSets: (value: number) => setState('totalSets', value),
      setCyclesPerSet: (value: number) => setState('cyclesPerSet', value),
      setOnDuration: (value: number) => setState('onDuration', value),
      setOffDuration: (value: number) => setState('offDuration', value),
      setRestDuration: (value: number) => setState('restDuration', value),
      startPause,
      reset,
    },
  }
}
