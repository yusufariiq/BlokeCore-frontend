import React from 'react'
import { NavLink } from 'react-router-dom'

const Promo = () => {
  return (
    <div className="relative overflow-hidden py-12 sm:py-24">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Represent Your Team, Bloke Core Style
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This isn’t just fan gear, it’s an identity. Discover jerseys that combine loyalty with street style
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          alt=""
                          src="https://pfcvintage.com/cdn/shop/files/pfc-vintage-football-shirts-classic-vintage-retro-soccer-australia-australian-1.jpg?v=1704945915&width=1000"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROmvIt-LufOUR747GNaHrfaVtHDNU7MJEMew&s"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://i.pinimg.com/736x/40/82/6e/40826ebca3d4aa0294823d3509ee84eb.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://i.pinimg.com/564x/fe/3b/8e/fe3b8e076c6cf31498a7d16bba7943d9.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://i.pinimg.com/474x/70/2c/c9/702cc9c1c4f7df6e1a7939b5f93ea1da.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://i.pinimg.com/564x/8f/f3/67/8ff367da06939d7c5894e48dff5d69a5.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://i.pinimg.com/236x/93/78/b4/9378b49739d792b9c81679f382a8f0b3.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <NavLink
                to="/"
                className="inline-block rounded-md border border-transparent bg-primary px-8 py-3 text-center font-medium text-white hover:bg-hover-primary"
              >
                Shop Collection
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Promo