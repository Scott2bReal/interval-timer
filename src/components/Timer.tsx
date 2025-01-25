import { createEffect, createSignal } from 'solid-js'

type Phase = 'getReady' | 'on' | 'off' | 'rest' | 'complete'

const [phase, setPhase] = createSignal<Phase>('getReady')
const [timeLeft, setTimeLeft] = createSignal(5)
const [currentSet, setCurrentSet] = createSignal(1)
const [currentCycle, setCurrentCycle] = createSignal(1)
const [isRunning, setIsRunning] = createSignal(false)
const [totalSets, setTotalSets] = createSignal(4)
const [cyclesPerSet, setCyclesPerSet] = createSignal(4)
const [onDuration, setOnDuration] = createSignal(6)
const [offDuration, setOffDuration] = createSignal(6)
const [restDuration, setRestDuration] = createSignal(120)

const Timer = () => {
  const displayTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Effect to handle the timer ticking
  createEffect(() => {
    if (!isRunning()) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  })

  // Effect to handle phase transitions
  createEffect(() => {
    if (timeLeft() > 0 || !isRunning()) return

    switch (phase()) {
      case 'getReady':
        setPhase('on')
        setTimeLeft(onDuration())
        break
      case 'on':
        if (currentCycle() < cyclesPerSet()) {
          setPhase('off')
          setTimeLeft(offDuration())
        } else if (currentSet() < totalSets()) {
          setPhase('rest')
          setTimeLeft(restDuration())
        } else {
          setPhase('complete')
          setIsRunning(false) // Stop timer
        }
        break
      case 'off':
        setPhase('on')
        setTimeLeft(onDuration())
        setCurrentCycle((prev) => prev + 1)
        break
      case 'rest':
        setPhase('on')
        setTimeLeft(onDuration())
        setCurrentSet((prev) => prev + 1)
        setCurrentCycle(1)
        break
      case 'complete':
        setIsRunning(false)
        break
    }
  })

  const handleStartPause = () => {
    setIsRunning((prev) => !prev)
  }

  const handleReset = () => {
    setIsRunning(false)
    setPhase('getReady')
    setTimeLeft(5)
    setCurrentSet(1)
    setCurrentCycle(1)
  }

  return (
    <div class="mx-auto max-w-md rounded bg-stone-900 p-6 text-center text-stone-100 shadow-lg">
      {phase() !== 'complete' ? (
        <div class="my-6">
          <p class="text-xl">
            Phase:{' '}
            <span class="font-medium text-blue-400">
              {phase().toUpperCase()}
            </span>
          </p>
          <p class="text-lg">
            Set: <span class="font-medium">{currentSet()}</span> / {totalSets()}
          </p>
          <p class="text-lg">
            Cycle: <span class="font-medium">{currentCycle()}</span> /{' '}
            {cyclesPerSet()}
          </p>
          <p class="mt-6 text-5xl font-bold">{displayTime(timeLeft())}</p>
        </div>
      ) : (
        <div class="mt-6">
          <h2 class="text-2xl font-semibold text-green-400">
            Workout Complete! 🎉
          </h2>
        </div>
      )}
      <div class="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleStartPause}
          class="rounded bg-blue-500 px-6 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {isRunning() ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          class="rounded bg-stone-700 px-6 py-2 font-medium text-white hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500"
        >
          Reset
        </button>
      </div>
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
            value={totalSets()}
            onInput={(e) => setTotalSets(Number(e.currentTarget.value))}
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
            value={cyclesPerSet()}
            onInput={(e) => setCyclesPerSet(Number(e.currentTarget.value))}
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
            value={onDuration()}
            onInput={(e) => setOnDuration(Number(e.currentTarget.value))}
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
            value={offDuration()}
            onInput={(e) => setOffDuration(Number(e.currentTarget.value))}
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
            value={restDuration()}
            onInput={(e) => setRestDuration(Number(e.currentTarget.value))}
            class="mt-1 block w-full rounded bg-stone-800 px-2 py-1 text-stone-100"
          />
        </div>
      </div>
    </div>
  )
}

export default Timer
