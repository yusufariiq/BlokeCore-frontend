import { React, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext';
import RelatedProduct from './RelatedProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Breadcrumbs from '../Layout/Breadcrumbs';

const ProductDetails = () => {
    const { productId } = useParams();
    const { products, currency, addToCart, formatIDR } = useContext(ShopContext);
    const [ productData, setProductData ] = useState(null);
    const [ currentImage, setCurrentImage ] = useState('');
    const [ selectedSize, setSelectedSize ] = useState('');
    const [ activeIndex, setActiveIndex ] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        const product = products.find(item => item.id === productId);
        if (product) {
            setProductData(product);
            if (product.images && product.images.length > 0) {
                setCurrentImage(product.images[0]);
            }
        }
    }, [productId, products]);

    if (!productData) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const productImages = productData.images || [];
    const productSizes = Array.isArray(productData.details?.size) 
        ? productData.details.size 
        : [productData.details?.size];

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            {/* <Breadcrumbs/> */}
            
            <div className="flex items-center justify-center py-12 gap-12 flex-col sm:flex-row">
                {/* Product images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex flex-col justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productImages.map((img, index) => (
                            <img 
                                onClick={() => setCurrentImage(img)} 
                                src={img} 
                                key={index} 
                                alt={`Product view ${index + 1}`}
                                className='w-[24%] bg-hover-white sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2'
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img 
                            src={currentImage} 
                            alt={productData.name}
                            className='w-full bg-hover-white h-auto border-2' 
                        />
                    </div>
                </div>

                {/* Product info */}
                <div className="flex-1">
                    <h1 className="font-bold text-3xl">
                        {productData.name}
                    </h1>
                    <p className="mt-5 text-3xl font-medium text-primary">
                        {currency}{' '}{formatIDR(productData.price)}
                    </p>
                    <p className="mt-5 text-gray-600 md:w-4/5">
                        {productData.description}
                    </p>
                    
                    {productSizes.length > 0 && (
                        <div className="flex flex-col gap-4 mt-5">
                            <p>Select Size:</p>
                            <div className="flex gap-3">
                                {productSizes.map((size, index) => (
                                    <button 
                                        onClick={() => setSelectedSize(size)} 
                                        className={`border py-2 px-4 text-lg bg-gray-200 ${size === selectedSize ? 'border-primary' : ''}`} 
                                        key={index}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button 
                        onClick={() => addToCart(productData.id, selectedSize)} 
                        className="w-[50%] bg-primary text-white px-8 py-3 mt-5 text-base font-medium hover:bg-hover-primary"
                    >
                        ADD TO CART
                    </button>

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
                                    <div>{productData.details?.brand || '-'}</div>

                                    <div className="text-gray-600">Team:</div>
                                    <p className="text-primary">{productData.metadata?.team || '-'}</p>
                                    
                                    <div className="text-gray-600">Season:</div>
                                    <p>{productData.metadata?.season || '-'}</p>
                                    
                                    <div className="text-gray-600">Condition:</div>
                                    <div>{productData.details?.condition || '-'}</div>
                                    
                                    <div className="text-gray-600">Type:</div>
                                    <div>{productData.details?.type || '-'}</div>

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
            <RelatedProduct 
                category={productData.category} 
                subCategory={productData.subCategory?.nations || productData.subCategory} 
            />
        </div>
    );
}

export default ProductDetails;