import { useEffect, useRef, useState } from 'preact/hooks'
import { Typer } from 'src/typer'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { StepName, steps } from 'src/steps'

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
      <SyntaxHighlighter
        language="javascript"
        style={a11yDark}
        customStyle={{ height: `100%` }}
      >
        {text}
      </SyntaxHighlighter>
    </div>
  )
}
