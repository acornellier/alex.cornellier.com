import { Cursor } from 'src/cursor'
import { Terminal } from 'src/terminal'
import { useState } from 'preact/hooks'
import { StepName } from 'src/steps'
import clsx from 'clsx'
import { Avatar } from 'src/avatar'

export function App() {
  const [s, setStepsCompleted] = useState<Set<StepName>>(new Set())

  const completeStep = (step: StepName) => {
    setStepsCompleted((prev) => new Set<StepName>([...prev, step]))
  }

  return (
    <>
      <div className="flex h-full xs:flex-col lg:flex-row-reverse">
        <div className="flex flex-col items-center justify-center w-full h-2/3 lg:w-2/3">
          {s.has(`helloWorld`) && (
            <span
              className={clsx(
                `transition-font-size`,
                s.has(`bigName`) && `text-4xl`,
              )}
            >
              Hello World{s.has(`name`) && `, I am Alex Cornellier.`}
            </span>
          )}

          <Avatar show={s.has(`avatar`)} />
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-black lg:w-1/3 h-1/3 lg:h-full">
          <Terminal {...{ completeStep }} />
        </div>
      </div>
      <Cursor />
    </>
  )
}
