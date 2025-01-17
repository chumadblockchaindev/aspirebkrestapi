import React from 'react'

const FormWrapper = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <>
        <h2 className='drop-shadow-md text-xl md:text-2xl'>{title}</h2>
        <div className='space-y-2 mt-2'>{children}</div>
    </>
  )
}

export default FormWrapper