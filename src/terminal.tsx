import { ReactNode } from 'react'
import { useTyper } from 'src/typer'
import { SetStesCompleted, steps } from 'src/steps'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ReactComponent as Play } from '../public/play.svg'
import { ReactComponent as Pause } from '../public/pause.svg'
import { ReactComponent as Back } from '../public/back.svg'
import { ReactComponent as Forward } from '../public/forward.svg'

interface Props {
  setStepsCompleted: SetStesCompleted
}

function Button({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      className="flex items-center justify-center w-16 h-full p-2 text-white rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function Terminal({ setStepsCompleted }: Props) {
  const { typer, text, paused } = useTyper({
    steps,
    setStepsCompleted,
  })

  return (
    <>
      <div className="flex justify-center h-16 text-white">
        <Button onClick={() => typer.back()}>
          <Back height="100%" />
        </Button>
        <Button onClick={() => typer.pausePlay()}>
          {paused ? <Play height="100%" /> : <Pause height="100%" />}
        </Button>
        <Button onClick={() => typer.forward()}>
          <Forward height="100%" />
        </Button>
      </div>
      <SyntaxHighlighter
        language="javascript"
        style={a11yDark}
        customStyle={{ height: `100%` }}
      >
        {text}
      </SyntaxHighlighter>
    </>
  )
}
