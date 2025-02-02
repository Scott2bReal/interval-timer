import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from 'solid-icons/hi'
import { Show } from 'solid-js'
import { useTimer } from '../context/TimerProvider'

const ResetButton = () => {
  const { timer } = useTimer()
  return (
    <button
      title="Reset"
      onClick={timer.controls.reset}
      class="rounded bg-stone-700 px-6 py-2 font-medium text-white hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500"
    >
      Reset
    </button>
  )
}

const StartPauseButton = () => {
  const { timer } = useTimer()
  return (
    <button
      title={timer.state.isRunning ? 'Pause' : 'Start'}
      data-is-running={timer.state.isRunning}
      onClick={timer.controls.startPause}
      class="w-32 rounded bg-blue-600 py-4 font-medium text-white hover:bg-blue-600 focus:outline-none data-[is-running=true]:bg-red-400"
    >
      {timer.state.isRunning ? 'Pause' : 'Start'}
    </button>
  )
}

const ToggleMuteButton = () => {
  const { timer } = useTimer()
  return (
    <button
      title={timer.state.isMuted ? 'Unmute' : 'Mute'}
      onClick={timer.controls.toggleMuted}
      class="rounded bg-stone-700 px-6 py-2 font-medium text-white hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500"
    >
      <span class="sr-only">{timer.state.isMuted ? 'Unmute' : 'Mute'}</span>
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
    <div class="mt-6 flex items-center justify-between space-x-4">
      <ResetButton />
      <StartPauseButton />
      <ToggleMuteButton />
    </div>
  )
}
