import React from 'react'

const ChatMessage = ({name, message}) => {
  return (
    <div className='flex items-center shadow-sm p-2'>
        <img
          className="h-8"
          alt="user"
          src="data:image/png;base64,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"
        />
        <span className='font-bold px-2'>{name}</span>
        <span>{message}</span>
    </div>
  )
}

export default ChatMessage