import clsx from 'clsx'
import { useEffect, useState } from 'preact/hooks'

export function Avatar({ show }: { show: boolean }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (show) setLoaded(true)
  }, [show])

  return (
    <div
      className={clsx(
        `transition-opacity duration-500 `,
        !show && `hidden`,
        !loaded && `opacity-0`,
      )}
    >
      <img
        className="rounded-full"
        src="/avatar.png"
        alt="avatar"
        height={200}
        width={200}
      />
    </div>
  )
}
