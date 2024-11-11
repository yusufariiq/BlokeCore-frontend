import React from 'react'
import { Assets } from '../assets/Assets'
import Breadcrumbs from '../components/Common/Breadcrumbs'
import Title from '../components/Common/Title'

const features = [
  {
    name: 'Curated Selection.',
    description:
      'Our collection is handpicked by fashion experts who understand the essence of contemporary streetwear and classic sports fashion.',
  },
  {
    name: 'Quality Guarantee.',
    description: 'We stand by the quality of every product. We source from trusted suppliers to ensure each item is made with premium materials, built to last, and offers unmatched comfort.',
  },
  {
    name: 'Customer-Centric Experience.',
    description: ' We’re here to provide personalized support and make your shopping experience seamless.',
  },
  {
    name: 'Secure & Reliable Shopping.',
    description: 'We use the latest technology to protect your personal information and ensure your payment details are secure.',
  },
  {
    name: 'Global Shipping.',
    description: 'We deliver worldwide, so no matter where you are, you can enjoy the unique styles we have to offer.',
  },
  {
    name: 'Community-Driven.',
    description: 'We value the connection with our customers and continuously strive to build a space where style, culture, and identity come together.',
  },
]

const About = () => {
  return (
    <div className="overflow-hidden bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs />
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <Title text={"About us"} />
              <p className="mt-5 text-lg/8 text-gray-600 text-justify">
                Welcome to BlokeCore, your ultimate destination for authentic, trendy, and high-quality streetwear and sportswear. Founded by enthusiasts with a passion for the intersection of sport, culture, and style, BlokeCore is more than just a store it’s a lifestyle. Our mission is to bring you unique, curated collections that let you express yourself and stand out with confidence.
              </p>
              <p className="mt-5 text-lg font-medium text-black">Why You Should Buy From Us?</p>
              <dl className="mt-5 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name}>
                    <dt className="inline font-semibold text-gray-900">
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={Assets.heroImage}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}

export default About