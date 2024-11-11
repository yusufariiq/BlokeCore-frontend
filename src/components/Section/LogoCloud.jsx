import React from 'react'
import Title from '../Common/Title'
import { Assets } from '../../assets/Assets'

const LogoCloud = () => {
  return (
    <div className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Title text={"Popular Brands"} />
        <div className="mx-auto mt-24 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            alt="Adidas"
            src={Assets.logoadidas}
            className="col-span-2 max-h-20 w-full object-contain lg:col-span-1 hover:scale-110 duration-200"
          />
          <img
            alt="Kappa"
            src={Assets.logokappa}
            className="col-span-2 max-h-20 w-full object-contain lg:col-span-1 hover:scale-110 duration-200"
          />
          <img
            alt="Nike"
            src={Assets.logonike}
            className="col-span-2 max-h-20 w-full object-contain lg:col-span-1 hover:scale-110 duration-200"
          />
          <img
            alt="Puma"
            src={Assets.logopuma}
            className="col-span-2 max-h-20 w-full object-contain sm:col-start-2 lg:col-span-1 hover:scale-110 duration-200"
          />
          <img
            alt="Umbro"
            src={Assets.logoumbro}
            className="col-span-2 col-start-2 max-h-20 w-full object-contain sm:col-start-auto lg:col-span-1 hover:scale-110 duration-200"
          />
        </div>
      </div>
    </div>
  )
}

export default LogoCloud