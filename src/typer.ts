import { Step, StepName, steps } from 'src/steps'

interface Options {
  steps: Step[]
  setText: (text: string) => void
  completeStep: (step: StepName) => void
}

export class Typer {
  text: string[] = []
  insertOffset = 0
  timeout: NodeJS.Timeout | null = null

  steps: Step[]
  setText: (text: string) => void
  completeStep: (step: StepName) => void

  constructor(options: Options) {
    this.steps = options.steps
    this.setText = options.setText
    this.completeStep = options.completeStep

    // this.start(3)
    this.start(0)
  }

  start(stepIndex: number) {
    if (stepIndex !== 0) {
      this.text = steps[stepIndex - 1].cumulativeCode.split(``)
      this.setText(this.text.join(``))
      for (let i = 0; i < stepIndex; ++i) this.completeStep(steps[i].name)
    }

    this.animate(stepIndex)
  }

  animate(stepIndex: number) {
    const step = steps[stepIndex]
    if (!step) return

    this.insertOffset = 0
    const chars = step.code.split(``)

    const animation = () => {
      this.timeout = setTimeout(tick, 20)
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
        this.timeout = setTimeout(() => this.animate(stepIndex + 1), 1000)
      }
    }

    animation()
  }

  terminate() {
    if (this.timeout) clearTimeout(this.timeout)
  }
}
