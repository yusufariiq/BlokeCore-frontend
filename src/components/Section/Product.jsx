import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const products = [
    {
      id: 1,
      name: 'Finland 2000 - 2001 Match Issue U-18 Home Shirt #14 (Very good) XL',
      href: 'login',
      imageSrc: 'https://www.classicfootballshirts.co.uk/cdn-cgi/image/fit=pad,q=70,f=webp//pub/media/catalog/product//g/l/glw1002-1_3wjcgah73yqn5ufs.jpg',
      imageAlt: "Finland 2000 - 2001 Match Issue",
      price: 'Rp 1.400.000',
    },
    {
      id: 2,
      name: 'Chelsea 1997 - 1998 Player Issue Home Shirt (Very good) L',
      href: '#',
      imageSrc: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/11/5/34f990f4-f68d-4160-94f5-24c11cdbf6ec.jpg',
      imageAlt: "Chelsea 1997 - 1998 Player Issue",
      price: 'Rp 3.000.000',
    },
    {
      id: 3,
      name: 'Napoli 2024 - 2025 Match Issue Home Shirt #77 (New) L',
      href: '#',
      imageSrc: 'https://footdealer.co/wp-content/uploads/2024/08/Maillot-Naples-Domicile-2024-2025-Kvaratskhelia-2.jpg',
      imageAlt: "Napoli 2024 - 2025 Match Issue",
      price: 'Rp 2.800.000',
    },
    {
      id: 4,
      name: 'Finland 2000 - 2001 Match Issue U-18 Home Shirt #14 (Very good) XL',
      href: '#',
      imageSrc: 'https://www.classicfootballshirts.co.uk/cdn-cgi/image/fit=pad,q=70,f=webp//pub/media/catalog/product//g/l/glw1002-1_3wjcgah73yqn5ufs.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: 'Rp 1.400.000',
    },
    // More products...
]

const Product = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center text-black">Products</h2>

        <NavLink to={'/'} className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="h-72 w-full overflow-hidden rounded-md bg-gray-800 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-base text-black">
                    <Link to={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <p className="mt-2 text-lg font-bold text-primary">{product.price}</p>
              </div>
            </div>
          ))}
        </NavLink>
      </div>
    </div>
  )
}

export default Product