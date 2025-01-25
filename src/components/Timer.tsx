import { TimerProvider, useTimer } from '../context/TimerProvider'

const TimerControls = () => {
  const { timer } = useTimer()
  return (
    <div class="mb-8 mt-12 grid grid-cols-2 gap-4">
      <h2 class="col-span-2 text-2xl">Controls</h2>
      <div>
        <label for="sets" class="block text-sm font-medium text-stone-100">
          Total Sets
        </label>
        <input
          id="sets"
          type="number"
          min="1"
          value={timer.state.totalSets}
          onInput={(e) => timer.setTotalSets(Number(e.currentTarget.value))}
          class="mt-1 block w-full rounded bg-stone-800 px-2 py-1 text-stone-100"
        />
      </div>
      <div>
        <label for="cycles" class="block text-sm font-medium text-stone-100">
          Cycles per Set
        </label>
        <input
          id="cycles"
          type="number"
          min="1"
          value={timer.state.cyclesPerSet}
          onInput={(e) => timer.setCyclesPerSet(Number(e.currentTarget.value))}
          class="mt-1 block w-full rounded bg-stone-800 px-2 py-1 text-stone-100"
        />
      </div>
      <div>
        <label
          for="onDuration"
          class="block text-sm font-medium text-stone-100"
        >
          On Duration (s)
        </label>
        <input
          id="onDuration"
          type="number"
          min="1"
          value={timer.state.onDuration}
          onInput={(e) => timer.setOnDuration(Number(e.currentTarget.value))}
          class="mt-1 block w-full rounded bg-stone-800 px-2 py-1 text-stone-100"
        />
      </div>
      <div>
        <label
          for="offDuration"
          class="block text-sm font-medium text-stone-100"
        >
          Off Duration (s)
        </label>
        <input
          id="offDuration"
          type="number"
          min="1"
          value={timer.state.offDuration}
          onInput={(e) => timer.setOffDuration(Number(e.currentTarget.value))}
          class="mt-1 block w-full rounded bg-stone-800 px-2 py-1 text-stone-100"
        />
      </div>
      <div>
        <label
          for="restDuration"
          class="block text-sm font-medium text-stone-100"
        >
          Rest Duration (s)
        </label>
        <input
          id="restDuration"
          type="number"
          min="1"
          value={timer.state.restDuration}
          onInput={(e) => timer.setRestDuration(Number(e.currentTarget.value))}
          class="mt-1 block w-full rounded bg-stone-800 px-2 py-1 text-stone-100"
        />
      </div>
    </div>
  )
}

const displayTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}

const TimeDisplay = () => {
  const { timer } = useTimer()
  return (
    <p class="mt-6 text-5xl font-bold">{displayTime(timer.state.timeLeft)}</p>
  )
}

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

const PhaseDisplay = () => {
  const { timer } = useTimer()
  return timer.state.phase !== 'complete' ? (
    <div class="my-6">
      <div class="">
        <h1 class="text-sm italic">Phase</h1>
        <p class="text-6xl">
          <span class="font-medium text-blue-400">
            {timer.state.phase.toUpperCase()}
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

const Timer = () => {
  return (
    <TimerProvider>
      <div class="mx-auto max-w-md rounded bg-stone-900 p-6 text-center text-stone-100 shadow-lg">
        <PhaseDisplay />
        <div class="mt-6 flex justify-center space-x-4">
          <StartPauseButton />
          <ResetButton />
        </div>
        <TimerControls />
      </div>
    </TimerProvider>
  )
}

export default Timer
