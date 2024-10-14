import { useState } from 'react'

export const useModal = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const closeModal = () => setVisible(false)
  const openModal = () => setVisible(true)

  return {
    visible,
    closeModal,
    openModal,
  }
}
