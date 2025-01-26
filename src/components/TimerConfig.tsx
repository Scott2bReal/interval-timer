import { HiOutlineEye, HiOutlineEyeSlash } from 'solid-icons/hi'
import { createSignal, Show } from 'solid-js'
import { useTimer } from '../context/TimerProvider'

export const TimerConfig = () => {
  const [showControls, setShowControls] = createSignal(false)
  const { timer } = useTimer()
  return (
    <>
      <div class="mx-auto mt-8 flex w-full items-center justify-center gap-2 text-center">
        <h2 class="text-2xl">Controls</h2>
        <button onClick={() => setShowControls(!showControls())}>
          <Show
            when={showControls()}
            fallback={<HiOutlineEye class="size-6" />}
          >
            <HiOutlineEyeSlash class="size-6" />
          </Show>
        </button>
      </div>
      <div class="mb-8 mt-12 grid grid-cols-2 gap-4">
        <Show when={showControls()}>
          <div>
            <label for="sets" class="block text-sm font-medium text-stone-100">
              Total Sets
            </label>
            <input
              id="sets"
              type="number"
              min="1"
              value={timer.state.totalSets}
              onInput={(e) =>
                timer.controls.setTotalSets(Number(e.currentTarget.value))
              }
              class="mt-1 block w-full rounded bg-stone-800 px-2 py-1 text-stone-100"
            />
          </div>
          <div>
            <label
              for="cycles"
              class="block text-sm font-medium text-stone-100"
            >
              Cycles per Set
            </label>
            <input
              id="cycles"
              type="number"
              min="1"
              value={timer.state.cyclesPerSet}
              onInput={(e) =>
                timer.controls.setCyclesPerSet(Number(e.currentTarget.value))
              }
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
              onInput={(e) =>
                timer.controls.setOnDuration(Number(e.currentTarget.value))
              }
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
              onInput={(e) =>
                timer.controls.setOffDuration(Number(e.currentTarget.value))
              }
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
              onInput={(e) =>
                timer.controls.setRestDuration(Number(e.currentTarget.value))
              }
              class="mt-1 block w-full rounded bg-stone-800 px-2 py-1 text-stone-100"
            />
          </div>
        </Show>
      </div>
    </>
  )
}
