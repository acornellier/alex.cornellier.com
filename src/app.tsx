import { Cursor } from 'src/cursor'
import { Terminal } from 'src/terminal'
import { useState } from 'react'
import { StepName } from 'src/steps'
import clsx from 'clsx'
import { Avatar } from 'src/avatar'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

export function App() {
  const [s, setStepsCompleted] = useState<Set<StepName>>(new Set())

  return (
    <AnimateSharedLayout>
      <div className="flex h-full xs:flex-col lg:flex-row-reverse">
        <div className="flex flex-col items-center justify-center w-full h-2/3 lg:w-2/3">
          <AnimatePresence>
            {s.has(`helloWorld`) && (
              <motion.div layout>
                <span
                  className={clsx(`transition-font-size mb-4 text-center`, {
                    'text-4xl': s.has(`bigName`),
                  })}
                >
                  Hello World{s.has(`name`) && `, I am Alex Cornellier.`}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <Avatar show={s.has(`avatar`)} />
        </div>

        <Terminal {...{ setStepsCompleted }} />
      </div>
      <Cursor />
    </AnimateSharedLayout>
  )
}
