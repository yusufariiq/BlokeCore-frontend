import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBars,
    faBasketball,
    faBaseball,
    faCartShopping,
    faChevronDown,
    faEarthAfrica,
    faEarthAmericas,
    faEarthAsia,
    faEarthEurope,
    faEllipsisH,
    faEarthOceania,
    faFireFlameCurved,
    faMagnifyingGlass,
    faShirt,
    faShoePrints,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'

const navigations = [
    {
        name: 'Clubs',
        product: [
            { name: 'English', description: 'Jerseys from top English clubs', href: '#', icon: faShirt },
            { name: 'Spanish', description: 'Authentic jerseys from renowned Spanish clubs', href: '#', icon:  faShirt},
            { name: 'French', description: 'Support French clubs with jerseys from teams', href: '#', icon: faShirt },
            { name: 'German', description: 'Get jerseys from popular German clubs', href: '#', icon: faShirt },
            { name: 'Italian', description: 'Find jerseys from iconic Italian clubs', href: '#', icon: faShirt },
            { name: 'Others', description: 'Explore jerseys from other World leagues and clubs', href: '#', icon: faEllipsisH },
        ]
    },
    {
        name: 'Nation',
        product: [
            { name: 'Europe', description: 'Jerseys from European national teams like France, Germany, and Italy', href: '#', icon: faEarthEurope },
            { name: 'Asia', description: 'National team jerseys from Asia, including Japan, South Korea, and more', href: '#', icon: faEarthAsia },
            { name: 'America', description: 'Represent North and South America with jerseys from Brazil, Argentina, and the USA', href: '#', icon: faEarthAmericas },
            { name: 'Africa', description: 'Authentic jerseys from African national teams like Nigeria, Egypt, and Ghana', href: '#', icon: faEarthAfrica },
            { name: 'Oceania', description: 'Support teams from Oceania with jerseys from Australia and New Zealand', href: '#', icon: faEarthOceania },
        ]
    },
    {
        name: 'Other Sports',
        product: [
            { name: 'Basketball', description: 'Shop jerseys from popular basketball leagues and teams', href: '#', icon: faBasketball },
            { name: 'Baseball', description: 'Discover baseball jerseys from top teams and leagues', href: '#', icon: faBaseball },
            { name: 'Boots', description: 'High-quality sports boots for football, rugby, and more', href: '#', icon: faShoePrints },
        ]
    },
    {
        name: 'New Arrival',
        product: [
            { name: 'Latest', description: 'Discover the latest arrivals in jerseys and sportswear', href: '#', icon: faShirt },
            { name: 'Trending', description: 'Explore the most popular jerseys and gear trending now', href: '#', icon: faFireFlameCurved },
        ]
    }    
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [menuHovered, setMenuHovered] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState(0)

  const handleMouseEnter = (index) => {
    setActiveMenu(index)
    setMenuHovered(true)
  }

  const handleMouseLeave = (index) => {
    setTimeout(() => {
        if (!menuHovered) {
          setActiveMenu(null)
        }
      }, 50)
  }

  const handleProductMenuEnter = () => {
    setMenuHovered(true)
  }

  const handleProductMenuLeave = () => {
    setMenuHovered(false)
    setActiveMenu(null)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const handleCartClick = () => {
    console.log('Navigating to cart')
  }
  
  return (
    <header className="bg-white">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div className="flex">
                <a href="#" className="-m-1.5 p-1.5">
                <img
                    alt=""
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                />
                </a>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex gap-5 lg:hidden">
                <form onSubmit={handleSearch} className="relative">
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </form>
                <button 
                    onClick={handleCartClick} 
                    className="relative"
                >
                    <FontAwesomeIcon icon={faCartShopping} className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
                    {cartItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItems}
                        </span>
                    )}
                </button>
                <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                >
                    <FontAwesomeIcon icon={faBars} aria-hidden="true" className="h-6 w-6" />
                </button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:gap-x-20">
                {navigations.map((navigation, index) => (
                <div 
                    key={navigation.name}
                    className="relative"
                    id={`menu-group-${index}`}
                >
                    <button 
                        className="flex items-center text-sm font-semibold uppercase hover:underline"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                    {navigation.name}
                    </button>

                    {activeMenu === index && (
                    <div 
                        className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
                        onMouseEnter={handleProductMenuEnter}
                        onMouseLeave={handleProductMenuLeave}
                    >
                        <div className="p-4">
                        {navigation.product.map((item) => (
                            <div
                            key={item.name}
                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                            >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <FontAwesomeIcon icon={item.icon} aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                            </div>
                            <div className="flex-auto">
                                <a href={item.href} className="block font-semibold text-gray-900">
                                {item.name}
                                <span className="absolute inset-0" />
                                </a>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}
                </div>
                ))}
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-x-6">
                
                 {/* Search Bar */}
                 <form onSubmit={handleSearch} className="relative">
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-80 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </form>

                <button 
                    onClick={handleCartClick} 
                    className="relative"
                >
                    <FontAwesomeIcon icon={faCartShopping} className="h-6 w-6 text-gray-700 hover:text-indigo-600" />   
                    {cartItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItems}
                        </span>
                    )}
                </button>
                
                <button className='border py-2 px-4 rounded-full  bg-indigo-500 text-white hover:bg-white hover:text-black ease-in duration-200'>
                    <a href="#" className="text-sm font-semibold leading-6">
                    Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </button>
            </div>
        </nav>

        {/* Mobile menu dialog */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                    <a href="#" className="-m-1.5 p-1.5">
                    <img
                        alt=""
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="h-8 w-auto"
                    />
                    </a>
                    <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    >
                    <span className="sr-only">Close menu</span>
                    <FontAwesomeIcon icon={faXmark} aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>

                <div className="mt-2 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                        {navigations.map((navigation) => (
                            <Disclosure as="div" className="-mx-3">
                                {({ open }) => (
                                    <>
                                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                            {navigation.name}
                                            <FontAwesomeIcon icon={faChevronDown} aria-hidden="true" className={`h-5 w-5 flex-none transform transition duration-200 ${open ? 'rotate-180' : ''}`} />
                                        </DisclosureButton>
                                        <DisclosurePanel className="mt-2 space-y-2">
                                        {navigation.product.map((item) => (
                                            <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                            {item.name}
                                            </DisclosureButton>
                                        ))}
                                        </DisclosurePanel>
                                    </>
                                )}
                                
                            </Disclosure>
                        ))}
                            <button className="bg-indigo-500 rounded-full w-full mt-10 border  hover:border-black hover:bg-transparent ease-in duration-150">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:text-black"
                                    >
                                    Log in
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>
  )
}
