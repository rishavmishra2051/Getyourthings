import React, { useState, useEffect, useRef } from 'react'
import { fetchProducts } from '../../FirebaseConfig';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ProductApprovalCard from '../components/ProductApprovalCard';
const ProductForApproval = () => {
    const [search, setSearch] = useState('');
    const [productData, setProductData] = useState([]);
    const [verificationcategory, setverificationcategory] = useState('');
    const [showAll, setShowAll] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const fetchData = async () => {
            const products = await fetchProducts();
            // Sort products by date before setting the state
            const sortedProducts = products.sort((a, b) => new Date(b.date) - new Date(a.date));
            setProductData(sortedProducts);
        };
        fetchData();
    }, []);
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(ref.current)) {
                showAll && setShowAll(false);
            }
        });
    }, [ref, showAll]);

    const filteredProducts = productData.filter(product => {
        // Filter by verification, search query, and verification category
        return (
            (product.verification.toLowerCase().includes(search.toLowerCase()) ||
                product.userEmail.toLowerCase().includes(search.toLowerCase())) &&
            (verificationcategory === '' || product.verification === verificationcategory)
        );
    });
    return (
        <div>
            <div className="mx-auto px-4 flex justify-between items-center mt-4">
                <div className="lg:inline-flex flex h-10 rounded-md flex-grow relative">
                    <span onClick={() => setShowAll(!showAll)} className='fs-32 w-12 h-full text-yellow-500 cursor-pointer flex items-center justify-center border-2 border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 rounded-tl-md rounded-bl-md'>
                        <SwapVertIcon className='font-semibold font-titleFont text-yellow-500' />
                    </span>
                    {showAll && (
                        <div>
                            <ul ref={ref} className="absolute w-40 h-30 top-10 left-0 rounded-md overflow-x-hidden bg-gray-500 border-[1px] border-yellow-500 text-black p-2 flex flex-col gap-1 z-50">

                                <li onClick={() => { setShowAll(false) }} className="text-yellow-500 tracking-wide font-titleFont rounded-md text-sm flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer">
                                    Approved
                                </li>

                                <li onClick={() => { setShowAll(false) }} className="text-yellow-500 tracking-wide font-titleFont rounded-md text-sm flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer">
                                    Pending
                                </li>

                                <li onClick={() => { setShowAll(false) }} className="text-yellow-500 tracking-wide font-titleFont rounded-md text-sm flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer">
                                    Rejected
                                </li>

                            </ul>
                        </div>
                    )}
                    <input
                        className="h-full text-base bg-transparent flex-grow outline-none border-2 border-yellow-500 px-2"
                        type="search"
                        placeholder="Search Products by Email Id or Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="w-16 h-full text-yellow-500 cursor-pointer flex items-center justify-center border-2 border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 rounded-tr-md rounded-br-md">
                        Search
                    </span>
                </div>
            </div>
            <div className="max-w-container mx-auto px-4 mt-3">
                {productData.map(product => (
                    <div key={product.id}>
                        <ProductApprovalCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductForApproval
