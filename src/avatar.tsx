import { AnimatePresence, motion } from 'framer-motion'

export function Avatar({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            className="rounded-full"
            src="/avatar.png"
            alt="avatar"
            height={200}
            width={200}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
