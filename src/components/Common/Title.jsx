import React from 'react'

const Title = ({text}) => {
  return (
    <div className='my-10'>
        <p className='mx-auto mt-2 text-center text-balance text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl'>
            {text}
        </p>
    </div>
  )
}

export default Title