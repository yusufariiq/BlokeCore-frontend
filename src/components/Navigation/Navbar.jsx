import { useContext, useState } from 'react'
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
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import CartSlider from '../Common/CartSlider';

const navigations = [
    {
        name: 'Clubs',
        product: [
            { name: 'English', description: 'Jerseys from top English clubs', href: '/clubs', icon: faShirt },
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
            { name: 'Europe', description: 'Jerseys from European national teams like France, Germany, and Italy', href: '/nations', icon: faEarthEurope },
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
            { name: 'Latest', description: 'Discover the latest arrivals in jerseys and sportswear', href: '/latest', icon: faFireFlameCurved },
        ]
    }    
]

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeMenu, setActiveMenu] = useState(null)
    const [menuHovered, setMenuHovered] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isCartOpen, setIsCartOpen] = useState(false);

    const {getCartCount} = useContext(ShopContext);

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

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };
  
    return (
        <>
            <header 
                className="bg-black text-white z-40 sticky top-0 left-0 right-0 shadow-md"
            >
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="flex">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img
                                alt=""
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=red&shade=600"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="flex gap-5 lg:hidden">
                        <form onSubmit={handleSearch} className="relative">
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </form>
                    
                        <button className="my-auto" onClick={toggleCart}>
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className="h-6 w-6 text-white flex-shrink-0"
                            />
                            <span className="px-1 text-xs font-medium text-white bg-primary aspect-square rounded-full ">
                                {getCartCount()}
                            </span>
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
                                className="flex items-center text-sm font-medium uppercase"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                            {navigation.name}
                            </button>
                            <hr className='items-center border-none h-[1.5px] bg-primary hidden' />

                            {activeMenu === index && (
                            <div 
                                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
                                onMouseEnter={handleProductMenuEnter}
                                onMouseLeave={handleProductMenuLeave}
                            >
                                <div className="p-4">
                                {navigation.product.map((item) => (
                                    <NavLink
                                    to='/'
                                    key={item.name}
                                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                    >
                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <FontAwesomeIcon icon={item.icon} aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-primary" />
                                        </div>
                                        <div className="flex-auto">
                                            <NavLink to={item.href} className="block text-base font-semibold text-black tracking-wider">
                                            {item.name}
                                            <span className="absolute inset-0" />
                                            </NavLink>
                                            <p className="mt-1 text-gray-600">{item.description}</p>
                                        </div>
                                    </NavLink>
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
                                className="pl-10 pr-4 py-2 w-80 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </form>

                        <button className="my-auto" onClick={toggleCart}>
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className="h-6 w-6 text-white flex-shrink-0"
                            />
                            <span className="px-1 text-xs font-medium text-white bg-primary aspect-square rounded-full ">
                                {getCartCount()}
                            </span>
                        </button>
                        
                        <button className='border-primary py-2 px-4 rounded-full bg-primary text-white hover:bg-hover-primary ease-in duration-200'>
                            <Link to="/login" className="text-sm font-semibold leading-6">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </button>
                    </div>
                </nav>

                {/* Mobile menu dialog */}
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-10" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
                        <div className="flex items-center justify-between">
                            <NavLink href="#" className="-m-1.5 p-1.5">
                                <img
                                    alt=""
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </NavLink>
                            <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                            <span className="sr-only">Close menu</span>
                            <FontAwesomeIcon icon={faXmark} aria-hidden="true" className="h-6 w-6 text-white" />
                            </button>
                        </div>

                        <div className="mt-2 flow-root">
                            <div className="divide-y divide-gray-500/10">
                                <div className="space-y-5 py-6">
                                {navigations.map((navigation) => (
                                    <Disclosure as="div" className="-mx-3">
                                        {({ open }) => (
                                            <>
                                                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-white hover:text-primary">
                                                    {navigation.name}
                                                    <FontAwesomeIcon icon={faChevronDown} aria-hidden="true" className={`h-5 w-5 flex-none transform transition duration-200 ${open ? 'rotate-180' : ''}`} />
                                                </DisclosureButton>
                                                <DisclosurePanel className="mt-2 space-y-2">
                                                {navigation.product.map((item) => (
                                                    <DisclosureButton
                                                    key={item.name}
                                                    as="a"
                                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-medium text-white group-hover:text-primary hover:bg-primary"
                                                    >
                                                        <Link to={item.href}>
                                                            {item.name}
                                                        </Link>
                                                    </DisclosureButton>
                                                ))}
                                                </DisclosurePanel>
                                            </>
                                        )}
                                        
                                    </Disclosure>
                                ))}
                                </div>
                                <button className="bg-primary rounded-full w-full border mt-5 hover:bg-hover-primary ease-in duration-150">
                                    <Link
                                        to="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Log in
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
            <CartSlider open={isCartOpen} setOpen={setIsCartOpen} />
        </>
  )
}
