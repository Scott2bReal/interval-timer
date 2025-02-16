import { ComponentProps } from 'solid-js'
import { TimerProvider } from '../context/TimerProvider'
import { InfoDisplay } from './InfoDisplay'
import { TimerConfig } from './TimerConfig'
import { TimerControls } from './TimerControls'

const Timer = (props: {
  initialConfig?: ComponentProps<typeof TimerProvider>['initialConfig']
}) => {
  return (
    <TimerProvider initialConfig={props.initialConfig}>
      <div class="mx-auto max-w-md text-center">
        <InfoDisplay />
        <TimerControls />
        <TimerConfig />
      </div>
    </TimerProvider>
  )
}

export default Timer
