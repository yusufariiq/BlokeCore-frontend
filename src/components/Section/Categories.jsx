import React from 'react'
import { NavLink } from 'react-router-dom'
import Title from '../Common/Title'

const categories = [
  {
    id: 1,
    name: "Training equipment",
    position: "relative lg:row-span-2",
    background: "bg-training-equipment bg-cover bg-center",
    height: "min-h-[30rem]",
    roundedClass: "lg:rounded-l-[2rem]"
  },
  {
    id: 2,
    name: "Brand new",
    position: "relative max-lg:row-start-1",
    background: "bg-brandnew bg-cover bg-center",
    height: "min-h-[15rem]",
    roundedClass: "max-lg:rounded-t-[2rem]"
  },
  {
    id: 3,
    name: "Kids",
    position: "relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2",
    background: "bg-kids bg-cover bg-top",
    height: "min-h-[15rem]",
    roundedClass: "rounded-lg"
  },
  {
    id: 4,
    name: "Vintage",
    position: "relative lg:row-span-2",
    background: "bg-vintage bg-cover bg-center",
    height: "min-h-[30rem]",
    roundedClass: "max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"
  }
]

const Categories = () => {
  return (
    <div className="py-12 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <Title text={"Categories"} />
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {categories.map((category) => (
            <NavLink
              to={'#'} 
              key={category.id} 
              className={`${category.position} group overflow-hidden rounded-lg ${category.roundedClass}`}
            >
              <div 
                className={`absolute inset-px ${category.background} transition-transform duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110`}
              />
              <div 
                className={`relative flex h-full ${category.height} flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] bg-black bg-opacity-80`}
              >
                <div className="p-8 m-auto text-center z-10">
                  <p className="text-3xl font-semibold tracking-wide text-white uppercase">
                    {category.name}
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories