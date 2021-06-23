import { useEffect, useRef, useState } from 'preact/hooks'
import { Typer } from 'src/typer'
import { StepName, steps } from 'src/steps'
import { HighLight, THEME } from 'preact-highlight'

interface Props {
  completeStep: (step: StepName) => void
}

export function Terminal({ completeStep }: Props) {
  const typer = useRef<Typer>(null)
  const [text, setText] = useState(``)

  useEffect(() => {
    typer.current = new Typer({ steps, setText, completeStep })

    return () => typer.current.terminate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed bottom-0 w-full bg-black h-1/3">
      <HighLight
        className="h-full"
        language="javascript"
        theme={THEME.monokaiSublime}
        code={text}
      />
    </div>
  )
}
