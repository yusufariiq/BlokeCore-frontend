import { React, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext';
import RelatedProduct from '../Section/RelatedProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = () => {
    const { productId } = useParams();
    const { products, currency } = useContext(ShopContext);
    const [ productData, setProductData ] = useState(false);
    const [ image, setImage ] = useState('')
    const [ size, setSize ] = useState('')
    const [ activeIndex, setActiveIndex ] = useState(false);

    const toggleAccordion = () => {
        setActiveIndex(activeIndex === true ? null : true);
    };

    const fetchProductData = async () => {
        products.map((item) => {
            if (item.id === productId){
                setProductData(item)
                setImage(item.image[0])
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData();
    }, [productId, products])

    return productData ? (
        <div className="pt-10 mb-10 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            {/* Product Data */}
            <div className="flex gap-12 flex-col sm:flex-row">
                
                {/* Product images  */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex flex-col justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {
                            productData.image.map((item, index) => (
                                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2' />
                            ))
                        }
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img src={image} className='w-full h-auto border-2' />
                    </div>
                </div>

                {/*  Product info */}
                <div className="flex-1">
                    <h1 className="font-bold text-3xl">
                        {productData.name}
                    </h1>
                    <p className="mt-5 text-3xl font-medium text-primary">{currency}{". "}{productData.price}</p>
                    <p className="mt-5 text-black md:w-4/5">{productData.description}</p>

                    {/* Product Details Section */}
                    <div className="mt-8 space-y-5">
                        <h2 className='font-medium text-xl mb-4'>Product Details</h2>
                        <div className="grid grid-cols-2 gap-y-4 text-base">                            
                            <div className="text-gray-600">Brand:</div>
                            <p className="text-primary">{productData.brand || 'Umbro'}</p>
                            
                            <div className="text-gray-600">Condition:</div>
                            <div>{productData.condition || 'Very good'}</div>
                            
                            <div className="text-gray-600">SKU:</div>
                            <div className="text-primary">{productData.sku || 'EVEH14011'}</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size:</p>
                        <div className="flex gap-3">
                            { productData.sizes.map((item, index) => (
                                <button onClick={() => setSize(item)} className={`border py-2 px-4 text-lg bg-gray-200 ${item === size ? 'border-primary' : ''}`} key={index}>
                                    {item}
                                </button>
                            )) }
                        </div>
                    </div>
                    <button className="bg-primary text-white px-8 py-3 text-base font-medium hover:bg-hover-primary"> ADD TO CART</button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className="text-sm text-black mt-5 flex flex-col gap-1">
                        <p>100% Original product</p>
                        <p>Cash on delivery is available on this product</p>
                    </div>
                    {/* <div className="mt-8">
                        <div className={`bg-gray-50 border-b-2 ${
                            activeIndex ? 'bg-white' : ''
                        }`}>
                            <button
                                className={`w-full flex justify-between items-center py-4 text-left ${
                                    activeIndex ? 'bg-primary text-white'
                                        : 'text-black hover:bg-primary hover:text-white '
                                } transition ease-linear duration-100 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75`}
                                onClick={() => toggleAccordion(true)}
                            >
                                <h3 className="text-lg font-medium">Product Care</h3>
                                <FontAwesomeIcon icon={ activeIndex ? faChevronUp : faChevronDown}/>
                            </button>
                            <div className={`px-6 pt-4 pb-8 ${ activeIndex ? 'block' : 'hidden'}`}>
                                <ul className="list-disc pl-5">
                                    <li>Cool wash</li>
                                    <li>Do not tumble dry</li>
                                    <li>Do not bleach</li>
                                    <li>Do not use fabric softener</li>
                                    <li>Wash inside out</li>
                                    <li>Use a cool iron</li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            


            {/* Related Products */}
            <RelatedProduct category={productData.category} subcategory={productData.subcategory} />

        </div>
    ) : <div className="opacity-0"></div>
}

export default ProductDetails