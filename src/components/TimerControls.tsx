import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from 'solid-icons/hi'
import { Show } from 'solid-js'
import { useTimer } from '../context/TimerProvider'

const StartPauseButton = () => {
  const { timer } = useTimer()
  return (
    <button
      onClick={timer.controls.startPause}
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
      onClick={timer.controls.reset}
      class="rounded bg-stone-700 px-6 py-2 font-medium text-white hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500"
    >
      Reset
    </button>
  )
}

const ToggleMuteButton = () => {
  const { timer } = useTimer()
  return (
    <button
      onClick={timer.controls.toggleMuted}
      class="rounded bg-stone-700 px-6 py-2 font-medium text-white hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500"
    >
      <Show
        when={timer.state.isMuted}
        fallback={<HiOutlineSpeakerWave class="size-6" />}
      >
        <HiOutlineSpeakerXMark class="size-6" />
      </Show>
    </button>
  )
}

export const TimerControls = () => {
  return (
    <div class="mt-6 flex justify-center space-x-4">
      <StartPauseButton />
      <ResetButton />
      <ToggleMuteButton />
    </div>
  )
}
