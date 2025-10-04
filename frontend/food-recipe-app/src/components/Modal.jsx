import React from 'react'
import InputForm from './InputForm'


function Modal({children,onClose}) {
  return (
    <>
    <div className='backdrop' onClick={onClose}></div>
        <dialog className='modal' open>
            {children}
        </dialog>
    
    </>
  )
}

export default Modal