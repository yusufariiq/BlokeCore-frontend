import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Banner = () => {
  const bannerMessages = [
    {
      text: "Beware of fraud",
      link: "/fraud-awareness",
      linkText: "Learn more"
    },
    {
      text: "Free shipping over Rp 20.000",
      link: "/shipping-info",
      linkText: "View details"
    },
    {
      text: "New collection arriving next week",
      link: "/latest",
      linkText: "Shop now"
    },
    {
      text: "Subscribe to our newsletter for 10% off",
      link: "/subscribe",
      linkText: "Subscribe"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === bannerMessages.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  if (!isVisible) return null;

  const currentMessage = bannerMessages[currentIndex];

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-black px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        aria-hidden="true"
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-primary to-white opacity-30"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-primary to-secondary opacity-30"
        />
      </div>
      
       {/* Message container*/}
      <div className="max-h-11 flex overflow-hidden">
        <div className={`flex items-center justify-center transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          <p className="text-xs sm:text-sm leading text-white">
            {currentMessage.text}
          </p>
          <span className='mx-4'>&#9135;</span>
          <NavLink
            to={currentMessage.link}
            className="text-xs sm:text-sm font-semibold text-white hover:text-gray-300"
          >
            <u>{currentMessage.linkText}</u> <span aria-hidden="true">→</span>
          </NavLink>
        </div>
      </div>

      <div className="flex flex-1 justify-end">
        <button 
          type="button" 
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          onClick={() => setIsVisible(false)}
        >
          <span className="sr-only">Dismiss</span>
          <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Banner;