import React from 'react';
import Title from '../Common/Title';
import { Assets } from '../../assets/Assets';

const LogoCloud = () => {
  const logos = [
    { src: Assets.logoadidas, alt: "Adidas" },
    { src: Assets.logokappa, alt: "Kappa" },
    { src: Assets.logonike, alt: "Nike" },
    { src: Assets.logopuma, alt: "Puma" },
    { src: Assets.logoumbro, alt: "Umbro" },
    { src: Assets.logocastore, alt: "Castore" },
    { src: Assets.logohummel, alt: "Hummel" }
  ];

  return (
    <div className="py-12 sm:py-24">
      <div className="mx-auto">
        <Title text={"Popular Brands"} />
        <div className="mt-24 overflow-hidden">
          <div className="flex animate-scroll">
            
            <div className="flex space-x-20 min-w-full">
              {logos.map((logo, index) => (
                <div key={`logo1-${index}`} className="flex-none w-40">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-20 w-full object-contain hover:scale-110 duration-200"
                  />
                </div>
              ))}
            </div>

            <div className="flex space-x-20 min-w-full">
              {logos.map((logo, index) => (
                <div key={`logo2-${index}`} className="flex-none w-40">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-20 w-full object-contain hover:scale-110 duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;