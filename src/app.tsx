import { Cursor } from 'src/cursor'
import { Terminal } from 'src/terminal'
import { useState } from 'preact/hooks'
import { StepName } from 'src/steps'
import clsx from 'clsx'

export function App() {
  const [s, setStepsCompleted] = useState<Set<StepName>>(new Set())

  const completeStep = (step: StepName) => {
    setStepsCompleted((prev) => new Set<StepName>([...prev, step]))
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-2/3">
        {s.has(`helloWorld`) && (
          <span
            className={clsx(
              `transition-font-size`,
              s.has(`bigName`) && `text-3xl`,
            )}
          >
            Hello World{s.has(`name`) && `, I am Alex Cornellier`}
          </span>
        )}
        {s.has(`subtitle`) && (
          <span className="text-2xl">Let's write my website!</span>
        )}
      </div>
      <Terminal {...{ completeStep }} />
      <Cursor />
    </>
  )
}
