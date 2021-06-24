import { SetStesCompleted, Step, StepName } from 'src/steps'
import { useEffect, useRef, useState } from 'react'

class Timer {
  callback: (...args: any[]) => any = () => {}
  delay: number = 0
  remaining: number = 0
  timerId: number | null = null
  startTime: number = Date.now()

  start(callback: (...args: any[]) => any, delay: number) {
    this.callback = () => {
      this.timerId = null
      callback()
    }
    this.delay = delay
    this.remaining = delay
    this.play()
  }

  hasTimer() {
    return this.timerId !== null
  }

  pause() {
    if (this.timerId) clearTimeout(this.timerId)
    this.remaining -= Date.now() - this.startTime
  }

  play() {
    this.startTime = Date.now()
    if (this.timerId) clearTimeout(this.timerId)
    this.timerId = setTimeout(this.callback, this.remaining)
  }
}

interface Options {
  steps: Step[]
  setText: (text: string) => void
  setPaused: (paused: boolean) => void
  setStepsCompleted: SetStesCompleted
}

export class Typer {
  text: string[] = []
  insertOffset = 0
  timer = new Timer()
  stepIndex = 0
  paused: boolean = false

  steps: Step[]
  setText: (text: string) => void
  setPaused: (paused: boolean) => void
  setStepsCompleted: SetStesCompleted

  constructor(options: Options) {
    this.steps = options.steps
    this.setText = options.setText
    this.setPaused = options.setPaused
    this.setStepsCompleted = options.setStepsCompleted

    this.animate()
  }

  completeStep(step: StepName) {
    this.setStepsCompleted((prev) => new Set<StepName>([...prev, step]))
  }

  updatePaused(paused: boolean) {
    this.paused = paused
    this.setPaused(this.paused)
  }

  animate() {
    if (this.paused) return

    const step = this.steps[this.stepIndex]
    if (!step) {
      this.updatePaused(true)
      return
    }

    this.insertOffset = 0
    const chars = step.code.split(``)

    const animation = () => {
      this.timer.start(tick, 20)
    }

    const tick = () => {
      let newChars: string[] = []
      do {
        newChars.push(chars.shift()!)
      } while (chars[0] === ` ` || chars[0] === `\n`)

      this.text.splice(step.insertAt + this.insertOffset, 0, ...newChars)
      this.setText(this.text.join(``))
      this.insertOffset += newChars.length

      if (chars.length) {
        animation()
      } else {
        this.completeStep(step.name)
        this.timer.start(() => {
          this.stepIndex += 1
          this.animate()
        }, 1000)
      }
    }

    animation()
    this.updatePaused(false)
  }

  goTo(stepIndex: number) {
    this.stepIndex = stepIndex

    if (this.stepIndex < 0) this.stepIndex = 0
    if (this.stepIndex > this.steps.length) {
      this.stepIndex = this.steps.length
    }

    this.text = (this.steps[this.stepIndex - 1]?.cumulativeCode ?? ``).split(``)
    this.setText(this.text.join(``))
    this.setStepsCompleted(
      new Set(this.steps.slice(0, this.stepIndex).map((step) => step.name)),
    )

    this.animate()
  }

  pausePlay() {
    this.updatePaused(!this.paused)
    if (this.paused) {
      this.timer.pause()
    } else {
      if (this.timer.hasTimer()) {
        this.timer.play()
      } else {
        this.animate()
      }
    }
  }

  back() {
    this.goTo(this.stepIndex - 1)
  }

  forward() {
    this.goTo(this.stepIndex + 1)
  }

  terminate() {
    this.timer.pause()
  }
}

interface UseTyperProps {
  steps: Step[]
  setStepsCompleted: SetStesCompleted
}

export const useTyper = ({ steps, setStepsCompleted }: UseTyperProps) => {
  const [text, setText] = useState(``)
  const [paused, setPaused] = useState(false)
  const typer = useRef<Typer | null>(null)

  useEffect(() => {
    typer.current = new Typer({ steps, setText, setPaused, setStepsCompleted })
    return () => typer.current?.terminate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { typer: typer.current, text, paused }
}
