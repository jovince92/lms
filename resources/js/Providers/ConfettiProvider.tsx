import { useConfettiStore } from '@/Hooks/useConfettiStore'

import Confetti from 'react-confetti'

const ConfettiProvider = () => {
    const {isOpen,onClose} = useConfettiStore();
    if(!isOpen) return;
    return (
        <Confetti className='pointer-events-none z-[100]' numberOfPieces={500} recycle={false} onConfettiComplete={onClose} />
    )
}

export default ConfettiProvider