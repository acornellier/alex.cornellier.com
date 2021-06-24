import { useEffect } from 'react'

export function Cursor() {
  useEffect(() => {
    const mouseCursor = document.querySelector(`.cursor`) as HTMLDivElement
    window.addEventListener(`mousemove`, (e) => {
      mouseCursor.style.top = e.pageY + `px`
      mouseCursor.style.left = e.pageX + `px`
    })
  }, [])

  return (
    <div className="absolute w-12 h-12 border-2 border-black rounded-full pointer-events-none cursor transform -translate-y-1/2 -translate-x-1/2" />
  )
}
