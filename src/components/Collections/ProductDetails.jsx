import { React, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext';
import RelatedProduct from '../Section/RelatedProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Breadcrumbs from '../Common/Breadcrumbs';


const ProductDetails = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [ productData, setProductData ] = useState(false);
    const [ image, setImage ] = useState('')
    const [ size, setSize ] = useState('')
    const [ activeIndex, setActiveIndex ] = useState(false);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
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
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <Breadcrumbs/>
            
            {/* Product Data */}
            <div className="flex tems-center justify-center py-12 gap-12 flex-col sm:flex-row">
                
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
                    <p className="mt-5 text-gray-600 md:w-4/5">{productData.description}</p>
                    <div className="flex flex-col gap-4 mt-5">
                        <p>Select Size:</p>
                        <div className="flex gap-3">
                            { productData.sizes.map((item, index) => (
                                <button onClick={() => setSize(item)} className={`border py-2 px-4 text-lg bg-gray-200 ${item === size ? 'border-primary' : ''}`} key={index}>
                                    {item}
                                </button>
                            )) }
                        </div>
                    </div>
                    <button onClick={() => addToCart(productData.id, size)} className="w-[50%] bg-primary text-white px-8 py-3 mt-5 text-base font-medium hover:bg-hover-primary"> ADD TO CART</button>

                    {/* Product Details Section */}
                    <div className="mt-8 space-y-5">
                        <div className="bg-white border-b-2">
                        <button
                            className="w-full flex justify-between items-center py-4 text-left transition ease-linear duration-300"
                            onClick={() => toggleAccordion(0)}
                        >
                            <h3 className="text-lg font-medium">Product Details</h3>
                            <FontAwesomeIcon icon={activeIndex === 0 ? faMinus : faPlus}/>
                        </button>
                        <div className={`px-6 pt-4 pb-8 ${activeIndex === 0 ? 'block' : 'hidden'}`}>
                            <div className="grid grid-cols-2 gap-y-4 text-base">                            
                                        <div className="text-gray-600">Brand:</div>
                                        <p className="text-primary">{productData.brand || 'Umbro'}</p>
                                        
                                        <div className="text-gray-600">Condition:</div>
                                        <div>{productData.condition || 'Very good'}</div>
                                        
                                        <div className="text-gray-600">SKU:</div>
                                        <div className="text-primary">{productData.sku || 'EVEH14011'}</div>
                                    </div>
                            </div>
                        </div>

                        <div className="bg-white border-b-2">
                            <button
                                className="w-full flex justify-between items-center py-4 text-left transition ease-linear duration-300"
                                onClick={() => toggleAccordion(1)}
                            >
                                <h3 className="text-lg font-medium">Product Care</h3>
                                <FontAwesomeIcon icon={activeIndex === 1 ? faMinus : faPlus}/>
                            </button>
                            <div className={`px-6 pt-4 pb-8 ${activeIndex === 1 ? 'block' : 'hidden'}`}>
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
                    </div>
                </div>
            </div>
            
            {/* Related Products */}
            <RelatedProduct category={productData.category} subcategory={productData.subcategory} />

        </div>
    ) : <div className="opacity-0"></div>
}

export default ProductDetails