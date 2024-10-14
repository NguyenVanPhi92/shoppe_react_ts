import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import ReactPortal from './portal'

export type ModalProps = {
  children?: ReactNode
  title?: string
  visible: boolean
  onClose?: () => void
  className?: string
  contentClassName?: string
  // allowOverlayclose?: boolean
}

export const Modal = ({
  children,
  onClose,
  title,
  visible,
  // allowOverlayclose = true,
  className = '',
  contentClassName = '',
}: ModalProps) => {
  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        duration: 0.3,
        delayChildren: 0.4,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        duration: 0.3,
        delay: 0.4,
      },
    },
  }

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className={`fixed inset-0 bg-black50 flex-center ${className}`}
          >
            <motion.div
              className={`max-w-[500px] max-h-[500px] p-[24px] overflow-y-auto rounded-[5px] w-[80%] bg-white ${contentClassName}`}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
              initial={{ y: '100vh' }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-[16px]">
                <p className="text-lg line-clamp-1">{title}</p>
                <button className="p-[4px]" onClick={onClose}>
                  <IoCloseOutline className="text-lg" />
                </button>
              </div>

              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReactPortal>
  )
}
