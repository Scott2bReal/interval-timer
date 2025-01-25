import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'

export type TimerStore = ReturnType<typeof createTimerStore>

export type Phase = 'getReady' | 'on' | 'off' | 'rest' | 'complete'

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
) {
  const [state, setState] = createStore({
    phase: 'getReady',
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

  let timer: number | null = null

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const startTimer = () => {
    if (state.isRunning) {
      clearTimer()
      timer = setInterval(() => {
        setState('timeLeft', (prev) => prev - 1)
      }, 1000)
    } else {
      clearTimer()
    }
  }

  const handlePhaseTransition = () => {
    if (state.timeLeft > 0 || !state.isRunning) return

    switch (state.phase) {
      case 'getReady':
        setState({ phase: 'on', timeLeft: state.onDuration })
        break
      case 'on':
        if (state.currentCycle < state.cyclesPerSet) {
          setState({ phase: 'off', timeLeft: state.offDuration })
        } else if (state.currentSet < state.totalSets) {
          setState({ phase: 'rest', timeLeft: state.restDuration })
        } else {
          setState({ phase: 'complete', isRunning: false })
        }
        break
      case 'off':
        setState({
          phase: 'on',
          timeLeft: state.onDuration,
          currentCycle: state.currentCycle + 1,
        })
        break
      case 'rest':
        setState({
          phase: 'on',
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
      phase: 'getReady',
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
    setTotalSets: (value: number) => setState('totalSets', value),
    setCyclesPerSet: (value: number) => setState('cyclesPerSet', value),
    setOnDuration: (value: number) => setState('onDuration', value),
    setOffDuration: (value: number) => setState('offDuration', value),
    setRestDuration: (value: number) => setState('restDuration', value),
    startPause,
    reset,
  }
}
