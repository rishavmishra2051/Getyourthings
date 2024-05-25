import React, { useState, useEffect } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useLocation } from "react-router-dom";
import Search from '../../components/Search';

const Inventary = () => {
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])
    const loadProducts = async () => {
        let response = await fetch('https://fakestoreapi.com/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json();
        setProducts(response);
    }
    useEffect(() => {
        loadProducts()
    }, [])


    return (
        <div>
            <div className="mx-auto px-4 flex justify-between items-center">
                <div className="lg:inline-flex flex my-2 h-10 rounded-md flex-grow relative">
                    <input
                        className="h-full text-base bg-transparent flex-grow outline-none border border-yellow-500 border-2  px-2 rounded-tl-md rounded-bl-md"
                        type="search" placeholder='Search for product' value={search} onChange={(e) => { setSearch(e.target.value) }}
                    />
                    <span className="w-12 h-full flex text-gray-600 items-center justify-center border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 border-2 duration-200 rounded-tr-md rounded-br-md">
                        <SearchIcon className='cursor-pointer ' onClick={() => { }} />
                    </span>
                </div>
            </div>
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-4 px-4">
                {products.length > 0 ? products.filter(
                    (data) => data.title.toLowerCase().includes(search.toLowerCase()) || data.category.toLowerCase().includes(search.toLowerCase()) || data.description.toLowerCase().includes(search.toLowerCase()))
                    .map((item) => (
                        <div
                            key={item.id}
                            className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4 cursor-pointer"
                        >
                            <div className='flex'>
                                <span className="text-xs capitalize italic absolute top-2 left-2 text-gray-500">
                                    {item.category}
                                </span>

                            </div>
                            <div className="w-full h-auto flex items-center justify-center relative group">
                                <img
                                    className="w-52 h-64 object-contain"
                                    src={item.image}
                                    alt="ProductImg"
                                />
                            </div>
                            <div className="px-4 bg-white flex flex-col gap-1 z-10">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-titleFont tracking-wide text-lg text-gray-600 font-medium">
                                            {item.title.substring(0, 20)}
                                        </h2>
                                        <p className="text-sm text-gray-600 font-semibold">
                                            ${item.price}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-text_color">{item.description.substring(0, 95)}...Read More</p>

                                    </div>
                                </div>
                                <div className='flex gap-2'>

                                <input placeholder="Centered Text" className="w-full p-1.5 mt-3 font-titleFont rounded-md text-center font-medium text-base border border-purple-500 " />
                                    <button className="w-full py-1.5 mt-3 font-titleFont rounded-md  font-medium text-base bg-gradient-to-tr from-purple-500 to-purple-300 border border-purple-600 hover:border-purple-800 hover:from-purple-400 to hover:to-purple-500 active:bg-gradient-to-bl active:from-purple-500 active:to-purple-600 duration-200">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : <div className="w-full h-full flex items-center justify-center"><SearchOffIcon /> No Product Found</div>}

            </div>
        </div>

    )
}

export default Inventary
