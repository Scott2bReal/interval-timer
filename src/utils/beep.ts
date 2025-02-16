// const audioContext = new AudioContext()
let audioContext: AudioContext | null = null

export function beep(
  /** The duration of the beep sound in milliseconds. */
  duration: number,
  /**The frequency of the beep sound.*/
  frequency: number,
  /** The volume of the beep sound. */
  volume: number
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      // Create a new audio context if it doesn't exist
      if (!audioContext) {
        audioContext = new AudioContext()
      }
      const oscillatorNode = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      oscillatorNode.connect(gainNode)

      // Set the oscillator frequency in hertz
      oscillatorNode.frequency.value = frequency

      // Set the type of oscillator
      oscillatorNode.type = 'sine'
      gainNode.connect(audioContext.destination)

      // Set the gain to the volume
      gainNode.gain.value = volume * 0.01

      // Start audio with the desired duration
      oscillatorNode.start(audioContext.currentTime)
      oscillatorNode.stop(audioContext.currentTime + duration * 0.001)

      // Resolve the promise when the sound is finished
      oscillatorNode.onended = () => {
        resolve()
      }
    } catch (error) {
      reject(error)
    }
  })
}
