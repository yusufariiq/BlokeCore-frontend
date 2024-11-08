import React from 'react'
import { NavLink } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const footerLinks = {
  legal: {
    title: 'Legal',
    links: [
      { name: 'About us', path: '/about' },
      { name: 'Returns', path: '/returns' },
      { name: 'Privacy policy', path: '/policy' },
      { name: 'Terms & condition', path: '/terms-conditions' }
    ]
  },
  supports: {
    title: 'Supports',
    links: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Contact', path: '/contact' },
      { name: 'Shipping', path: '/shipping-info' },
      { name: 'Track Your Order', path: '/track-order' }
    ]
  }
}

const Footer = () => {
  // Reusable component for NavLinks
  const NavLinks = ({ links }) => (
    links.map(link => (
      <NavLink 
        key={link.name}
        to={link.path} 
        className="link link-hover block py-2 hover:text-primary"
      >
        {link.name}
      </NavLink>
    ))
  )

  const MobileDisclosure = ({ section }) => (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between items-center footer-title text-lg font-heading">
            {section.title}
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`${open ? 'transform rotate-180' : ''} w-4 h-4 transition-transform duration-200`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="pt-2 pb-4 space-y-2">
            <NavLinks links={section.links} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )

  return (
    <footer className="footer bg-black text-white p-10">
        <aside className='md:mx-auto items-center'>
            <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current">
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p>BlokeCore</p>
        </aside>

        {/* Section - Desktop */}
        <nav className='hidden md:block md:mx-auto items-center'>
            <h6 className="footer-title text-lg font-heading">{footerLinks.legal.title}</h6>
            <NavLinks links={footerLinks.legal.links} />
        </nav>

        <nav className='hidden md:block md:mx-auto items-center'>
            <h6 className="footer-title text-lg font-heading">{footerLinks.supports.title}</h6>
            <NavLinks links={footerLinks.supports.links} />
        </nav>

        {/* Section - Mobile */}
        <div className="md:hidden w-full">
            <MobileDisclosure section={footerLinks.legal} />
        </div>

        <div className="md:hidden w-full">
            <MobileDisclosure section={footerLinks.supports} />
        </div>

        <form className='md:mx-auto items-center border-none w-full md:w-auto'>
            <h6 className="footer-title text-lg">Newsletter</h6>
            <fieldset className="form-control w-full md:w-80">
            <label className="label">
                <span className="label-text">Enter your email address</span>
            </label>
            <div className="join w-full">
                <input
                type="text"
                placeholder="username@site.com"
                className="input join-item w-full bg-white border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="btn btn-primary join-item bg-primary whitespace-nowrap">Subscribe</button>
            </div>
            </fieldset>
        </form>
    </footer>
  )
}

export default Footer