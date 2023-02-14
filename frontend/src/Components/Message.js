import React, { useEffect } from 'react'
import { Alert } from 'react-bootstrap'
const Message = ({ variant, children, closeModal }) => {
  return (
    <Alert variant={variant} className='text-center'>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
