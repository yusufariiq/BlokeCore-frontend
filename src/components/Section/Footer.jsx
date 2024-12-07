import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Assets } from '../../assets/Assets'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'

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
      { name: 'Track Your Order',
        path: '/track-order',
        specialNavigation: true
      }
    ]
  }
}

const Footer = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // Reusable component for NavLinks
  const NavLinks = ({ links }) => (
    links.map(link => (
      link.specialNavigation ? (
        <div 
          key={link.name}
          onClick={() => handleSpecialNavigation(link)}
          className="link link-hover block py-2 hover:text-primary cursor-pointer"
        >
          {link.name}
        </div>
      ) : (
        <NavLink 
          key={link.name}
          to={link.path} 
          className="link link-hover block py-2 hover:text-primary"
        >
          {link.name}
        </NavLink>
      )
    ))
  )

  const handleSpecialNavigation = (link) => {
    if (isAuthenticated) {
      navigate('/order')
    } else {
      navigate('/login')
      toast.error('You have to login to your account first')
    }
  }

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
    <>
      <footer className="footer bg-black text-white p-10">
          <aside className='mx-auto my-auto items-center'>
              <img src={Assets.logoblokecore} className='h-24'></img>
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
    </>
  )
}

export default Footer