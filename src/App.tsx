import Timer from './components/Timer'
import './index.css'

function App() {
  return (
    <main class="flex flex-col items-center justify-center gap-8 bg-stone-900 pt-4 text-stone-100">
      <h1 class="text-4xl">Pull!</h1>
      <Timer />
    </main>
  )
}

export default App
