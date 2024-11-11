import googleLogo from './icons/Google.svg'
import heroImage from './image/bg-hero2.webp' 
import mu1998 from './image/eng-mu-1998-1999-home.jpg' 
import logonike from './image/logo-nike.webp' 
import logoadidas from './image/logo-adidas.webp' 
import logopuma from './image/logo-puma.webp' 
import logokappa from './image/logo-kappa.webp' 
import logoumbro from './image/logo-umbro.webp' 


export const Assets = {
    googleLogo,
    heroImage,
    logoadidas,
    logokappa,
    logonike,
    logopuma,
    logoumbro,
}

export const products = [
    {
        id: 1,
        name: 'Finland',
        description: 'lorem ipsum',
        price: 10.99,
        image: [mu1998],
        imageAlt: "Finland 2000 - 2001 Match Issue",
        category: "Latest",
        subCategory: "Nation",
        sizes: "L",
        latest: false,
    },
    {
        id: 2,
        name: 'Finland 2000 - 2001 Match Issue U-18 Home Shirt #14 (Very good) XL',
        description: 'lorem ipsum',
        price: 1400000,
        image: [mu1998],
        imageAlt: "Finland 2000 - 2001 Match Issue",
        category: "Vintage",
        subCategory: "Nation",
        sizes: "L",
        latest: false,
      },
      {
        id: 3,
        name: 'Chelsea 1997 - 1998 Player Issue Home Shirt (Very good) L',
        description: 'lorem ipsum',
        price: 3000000,
        image: [mu1998],
        imageAlt: "Chelsea 1997 - 1998 Player Issue",
        category: "Vintage",
        subCategory: "Clubs",
        sizes: "L",
        latest: false,
      },
      {
        id: 4,
        name: 'Napoli 2024 - 2025 Match Issue Home Shirt #77 (New) L',
        description: 'lorem ipsum',
        price: 2800000,
        image: [mu1998],
        imageAlt: "Napoli 2024 - 2025 Match Issue",
        category: "Latest",
        subCategory: "Clubs",
        sizes: "L",
        latest: true,
      },
]

