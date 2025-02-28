import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import { beep } from '../utils/beep'

export type Phase = 'getReady' | 'on' | 'off' | 'rest' | 'complete'

interface TimerControls {
  setTotalSets: (value: number) => void
  setCyclesPerSet: (value: number) => void
  setOnDuration: (value: number) => void
  setOffDuration: (value: number) => void
  setRestDuration: (value: number) => void
  startPause: () => void
  reset: () => void
  toggleMuted: () => void
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
  isMuted: boolean
}

export interface Timer {
  state: TimerState
  controls: TimerControls
}

export interface TimerConfig {
  totalSets: number
  cyclesPerSet: number
  onDuration: number
  offDuration: number
  restDuration: number
  initialPhase: Phase
}

const LOCAL_STORAGE_KEY = 'timerConfig'
const DEFAULT_BEEP_CONFIG: Parameters<typeof beep> = [200, 880, 100]

export function createTimerStore(
  initialConfig: TimerConfig = {
    totalSets: 4,
    cyclesPerSet: 4,
    onDuration: 6,
    offDuration: 6,
    restDuration: 120,
    initialPhase: 'getReady',
  }
): Timer {
  const savedConfig = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) ?? 'null'
  ) as TimerConfig | null

  const config = savedConfig ?? initialConfig

  const [state, setState] = createStore<TimerState>({
    currentPhase: 'getReady',
    timeLeft: 5,
    currentSet: 1,
    currentCycle: 1,
    isRunning: false,
    totalSets: config.totalSets,
    cyclesPerSet: config.cyclesPerSet,
    onDuration: config.onDuration,
    offDuration: config.offDuration,
    restDuration: config.restDuration,
    isMuted: true,
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

  const saveConfigToLocalStorage = () => {
    const configToSave: TimerConfig = {
      totalSets: state.totalSets,
      cyclesPerSet: state.cyclesPerSet,
      onDuration: state.onDuration,
      offDuration: state.offDuration,
      restDuration: state.restDuration,
      initialPhase: 'getReady',
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(configToSave))
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

  // Save configuration whenever relevant state changes
  createEffect(() => {
    saveConfigToLocalStorage()
  })

  // Start timer when isRunning is true
  createEffect(() => {
    if (state.isRunning) startTimer()
    return () => clearTimer()
  })

  // Handle phase transitions when timeLeft reaches 0
  createEffect(() => {
    handlePhaseTransition()
  })

  // Beep when approaching the end of a phase
  createEffect(() => {
    if (state.isMuted) return

    if (state.timeLeft <= 3 && state.timeLeft > 0) {
      void beep(...DEFAULT_BEEP_CONFIG)
    } else if (
      state.currentPhase === 'rest' &&
      state.timeLeft === state.restDuration
    ) {
      void beep(500, 440, 100)
    }
  })

  return {
    state,
    controls: {
      setTotalSets: (value: number) => setState('totalSets', value),
      setCyclesPerSet: (value: number) => setState('cyclesPerSet', value),
      setOnDuration: (value: number) => setState('onDuration', value),
      setOffDuration: (value: number) => setState('offDuration', value),
      setRestDuration: (value: number) => setState('restDuration', value),
      toggleMuted: () => setState('isMuted', !state.isMuted),
      startPause,
      reset,
    },
  }
}
