import React from 'react'
import { Assets } from '../../assets/Assets'

const Hero = () => {
  return (
    <div className="h-[100vh] bg-hero bg-cover bg-center">

      {/* Content */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 z-10">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        </div>
        <div className="text-center">
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            More Than Jerseys. It's a Lifestyle.
          </h1>
          <p className="mt-8 text-pretty text-lg font-base text-gray-200 sm:text-xl/8">
            Authentic jerseys and streetwear inspired by the culture of football. <br /> Find your perfect fit today!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-hover-primary"
            >
              Shop now →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;