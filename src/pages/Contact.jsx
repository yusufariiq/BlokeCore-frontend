import { useState } from 'react'

export default function Contact() {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="isolate bg-white px-6 py-12 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-black sm:text-3xl">Contact us</h2>
        <p className="mt-2 text-lg/8 text-gray-600">Give us your questions and and we will get back to you as quickly as possible.</p>
      </div>
      <form action="#" method="POST" className="mx-auto max-w-xl sm:mt-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className='sm:col-span-2'>
            <label htmlFor="name" className="text-sm/6 font-semibold text-black">
              Name
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="given-name"
                placeholder='John Doe'
                className="w-full input border-gray-400"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="text-sm/6 font-semibold text-black">
              Email
            </label>
            <div className="mt-2.5">
                <input
                type="email"
                placeholder='example@email.com'
                required
                className="input border-gray-400 w-full"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="text-sm/6 font-semibold text-black">
              Phone number
            </label>
            <div className="mt-2.5">
              <input
                id="phone-number"
                name="phone-number"
                type="tel"
                autoComplete="tel"
                placeholder='08xxxxxxxxxx'
                className="input border-gray-400 w-full"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="text-sm/6 font-semibold text-black">
              What's on your mind?
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="textarea border-gray-400 w-full"
                defaultValue={''}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="w-full min-h-[3rem] border rounded-md bg-primary text-white font-semibold hover:bg-hover-primary ease-in-out duration-200">
            Let's talk
          </button>
        </div>
      </form>
    </div>
  )
}
