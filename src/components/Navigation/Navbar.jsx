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
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import CartSlider from '../Common/CartSlider';
import Banner from '../Common/Banner';
import AvatarDropdown from './AvatarDropdown';
import { Assets } from '../../assets/Assets';

const navigations = [
    {
        name: 'Clubs',
        link: '/clubs', 
        product: [
            { name: 'English', description: 'Jerseys from top English clubs', href: '/clubs/english', icon: faShirt },
            { name: 'Spain', description: 'Authentic jerseys from renowned Spanish clubs', href: '/clubs/spanish', icon:  faShirt},
            { name: 'France', description: 'Support French clubs with jerseys from teams', href: '/clubs/french', icon: faShirt },
            { name: 'German', description: 'Get jerseys from popular German clubs', href: '/clubs/german', icon: faShirt },
            { name: 'Italy', description: 'Find jerseys from iconic Italian clubs', href: '/clubs/italian', icon: faShirt },
            { name: 'Others', description: 'Explore jerseys from other World leagues and clubs', href: '/clubs/others', icon: faEllipsisH },
        ]
    },
    {
        name: 'Nation',
        link: '/nations', 
        product: [
            { name: 'Europe', description: 'Jerseys from European national teams like France, Germany, and Italy', href: '/nations/europe', icon: faEarthEurope },
            { name: 'Asia', description: 'National team jerseys from Asia, including Japan, South Korea, and more', href: '/nations/asia', icon: faEarthAsia },
            { name: 'America', description: 'Represent North and South America with jerseys from Brazil, Argentina, and the USA', href: '/nations/america', icon: faEarthAmericas },
            { name: 'Africa', description: 'Authentic jerseys from African national teams like Nigeria, Egypt, and Ghana', href: '/nations/africa', icon: faEarthAfrica },
            { name: 'Oceania', description: 'Support teams from Oceania with jerseys from Australia and New Zealand', href: '/nations/oceania', icon: faEarthOceania },
        ]
    },
    {
        name: 'Other Sports',
        link: '/others', 
        product: [
            { name: 'Basketball', description: 'Shop jerseys from popular basketball leagues and teams', href: '/others/basketball', icon: faBasketball },
            { name: 'Baseball', description: 'Discover baseball jerseys from top teams and leagues', href: '/others/baseball', icon: faBaseball },
        ]
    },
    {
        name: 'New Arrival',
        link: '/latest', 
        product: [
            { name: 'Latest', description: 'Discover the latest arrivals in jerseys and sportswear', href: '/latest', icon: faFireFlameCurved },
        ]
    }    
]

export default function Navbar() {
    const [activeMenu, setActiveMenu] = useState(null)
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [menuHovered, setMenuHovered] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    
    const {getCartCount} = useContext(ShopContext);

    const navigate = useNavigate();

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
        e.preventDefault();
        navigate(`/search?q=${searchQuery}`);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
            <header 
                className="bg-black text-white z-20 sticky top-0 left-0 right-0 shadow-md"
            >
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="flex">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img
                                alt=""
                                src={Assets.logoblokecore}
                                className="h-6 sm:h-12 w-auto"
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
                                className="w-full pl-10 sm:pr-4 py-1 sm:py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 sm:h-5 w-auto text-gray-400" />
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
                                onClick={() => navigate(`${navigation.link}`)}
                                className="flex items-center text-sm font-medium uppercase"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                            {navigation.name}
                            </button>
                            <hr className='items-center border-none h-[1.5px] bg-primary hidden' />

                            {activeMenu === index && (
                            <div 
                                className="absolute -left-8 top-full z-20 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
                                onMouseEnter={handleProductMenuEnter}
                                onMouseLeave={handleProductMenuLeave}
                            >
                                <div className="p-4">
                                {navigation.product.map((item) => (
                                    <NavLink
                                    to={item.href}
                                    key={item.name}
                                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                    >
                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <FontAwesomeIcon icon={item.icon} aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-primary" />
                                        </div>
                                        <div className="flex-auto hover:text-hover-primary text-black">
                                            <p className="block text-base font-semibold tracking-wider">
                                            {item.name}
                                            </p>
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
                                className="pl-10 pr-4 py-2 w-80 border rounded-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary"
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

                        <div className="hidden lg:flex lg:items-center lg:gap-x-6">
                            {localStorage.getItem('token') ? (
                                <AvatarDropdown/>
                            ) : (
                                <button className='border-primary py-2 px-4 rounded-full bg-primary text-white hover:bg-hover-primary ease-in duration-200'>
                                    <Link to="/login" className="text-sm font-semibold leading-6">
                                        Log in <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </button>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Mobile menu dialog */}
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-40" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
                        <div className="flex items-center justify-between">
                            <NavLink href="#" className="-m-1.5 p-1.5">
                                <img
                                    alt=""
                                    src={Assets.logoblokecore}
                                    className="h-5 w-auto"
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
                                {localStorage.getItem('token') ? (
                                    <div className="py-6">
                                        <div className="space-y-3">
                                        <Link
                                            to="/profile"
                                            className="block px-3 py-2 text-base font-semibold text-white hover:text-primary"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            to="/order"
                                            className="block px-3 py-2 text-base font-semibold text-white hover:text-primary"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Orders
                                        </Link>
                                        <button
                                            onClick={() => {
                                            localStorage.removeItem('token');
                                            localStorage.removeItem('user');
                                            navigate('/login');
                                            setMobileMenuOpen(false);
                                            }}
                                            className="block w-full px-3 py-2 text-base font-semibold text-white hover:text-primary text-left"
                                        >
                                            Logout
                                        </button>
                                        </div>
                                    </div>
                                    ) : (
                                    <button className="bg-primary rounded-full w-full border mt-5 hover:bg-hover-primary ease-in duration-150">
                                        <Link
                                        to="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                        >
                                        Log in
                                        </Link>
                                    </button>
                                    )}
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
                <Banner />
            </header>
            <CartSlider open={isCartOpen} setOpen={setIsCartOpen} />
        </>
  )
}
