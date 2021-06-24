import { Dispatch, SetStateAction } from 'react'

export type StepName = `helloWorld` | `name` | `bigName` | `avatar`
export type SetStesCompleted = Dispatch<SetStateAction<Set<StepName>>>

interface StepOptions {
  name: StepName
  code: string
  insertAfter?: string
}

export interface Step {
  name: StepName
  code: string
  insertAt: number
  cumulativeCode: string
}

export let steps: Step[] = []

const getFinalCode = (
  prevCode: string,
  newCode: string,
  insertAfter: string,
) => {
  const index = prevCode.indexOf(insertAfter)
  if (index === -1) throw `Could not find ${insertAfter} in ${prevCode}`
  const insertAt = index + insertAfter.length
  return {
    insertAt,
    cumulativeCode:
      prevCode.slice(0, insertAt) + newCode + prevCode.slice(insertAt),
  }
}

const addStep = ({ name, insertAfter, code }: StepOptions) => {
  const { insertAt, cumulativeCode } =
    insertAfter === undefined
      ? { insertAt: 0, cumulativeCode: code }
      : getFinalCode(steps[steps.length - 1].cumulativeCode, code, insertAfter)

  steps.push({
    name,
    code,
    insertAt,
    cumulativeCode,
  })
}

addStep({
  name: `helloWorld`,
  code: `export function Website() {
  return (
    <>
      <span>
        Hello World
      </span>
    </>
  )
}`,
})

addStep({
  name: `name`,
  insertAfter: `World`,
  code: `, I am Alex Cornellier.`,
})

addStep({
  name: `bigName`,
  insertAfter: `<span`,
  code: ` className="text-3xl"`,
})

addStep({
  name: `avatar`,
  insertAfter: `</span>`,
  code: `
      <Avatar />`,
})
