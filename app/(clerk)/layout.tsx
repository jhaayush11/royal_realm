import React from 'react'

const ClerkLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-screen flex items-center justify-center bg-blue-900'>
      {children}
    </div>
  )
}

export default ClerkLayout
