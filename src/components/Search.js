import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import ListIcon from '@mui/icons-material/List';
import { useMediaQuery } from '@mui/material';

const Search = (props) => {
    let navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [showAll, setShowAll] = useState(false);
    const ref = useRef();
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(ref.current)) {
                showAll && setShowAll(false);
            }
        });
    }, [ref, showAll]);
    const loadCategories = async () => {
        let response = await fetch("https://fakestoreapi.com/products/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        response = await response.json();
        setCategories(response);
    };
    useEffect(() => {
        loadCategories();
    }, []);
    const handleSearch = () => {
        if (search.length === 0) {
          navigate('/');
        } else {
          navigate('/searchresult', { state: { search: search } });
          setSearch('');
        }
      };

    // Check if screen size is smaller than 'lg' breakpoint
    const isMobile = useMediaQuery('(max-width: 720px)');

    if (isMobile) {
        return (
            <div>
                {/* Search Bar */}
                <div className="mx-auto px-4 flex justify-between items-center">
                    <div className="lg:inline-flex flex h-10 rounded-md flex-grow relative">
                    <span
                    onClick={() => setShowAll(!showAll)}
                    className="w-12 h-full text-gray-600 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 border-2 cursor-pointer text-sm  font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
                >
                    <ListIcon />
                </span>
                {showAll && (
                    <div>
                        <ul
                            ref={ref}
                            className="absolute w-40 h-30 top-10 left-0 rounded-md overflow-x-hidden bg-gray-500 border-[1px] border-yellow-500 text-black p-2 flex flex-col gap-1 z-50"
                        >
                            {categories.map((item) => (
                                <li
                                    onClick={() => { navigate("/searchresult", { state: { search: item } }) && setShowAll(false) }} className="text-yellow-500 tracking-wide font-titleFont rounded-md text-sm flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <input
                    className="h-full text-base bg-neutral-300 flex-grow outline-none border border-yellow-500 border-2  px-2"
                    type="search" placeholder='Search for get your things' value={search} onChange={(e) => { setSearch(e.target.value) && handleSearch() }}
                />
                <span className="w-12 h-full flex text-gray-600 items-center justify-center border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 border-2 duration-200 rounded-tr-md rounded-br-md">
                    <SearchIcon className='cursor-pointer ' onClick={() => { handleSearch() }} />
                </span>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="lgl:inline-flex h-10 rounded-md flex-grow relative ms-5 me-5">
                <span
                    onClick={() => setShowAll(!showAll)}
                    className="w-12 h-full border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 border-2 cursor-pointer text-sm  font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
                >
                    <ListIcon />
                </span>
                {showAll && (
                    <div>
                        <ul
                            ref={ref}
                            className="absolute w-40 h-30 top-10 left-0 rounded-md overflow-x-hidden bg-gray-500 border-[1px] border-yellow-500 text-black p-2 flex flex-col gap-1 z-50"
                        >
                            {categories.map((item) => (
                                <li
                                    onClick={() => { navigate("/searchresult", { state: { search: item } }) && setShowAll(false) }} className="text-yellow-500 tracking-wide font-titleFont rounded-md text-sm flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <input
                    className="h-full text-base bg-neutral-100 text-gray-700 flex-grow outline-none border-2 border-yellow-500 px-2"
                    type="search" placeholder='Search for get your things' value={search} onChange={(e) => { setSearch(e.target.value) && handleSearch() }}
                />
                <span className="w-12 h-full flex items-center justify-center border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 border-2 duration-200  rounded-tr-md rounded-br-md">
                    <SearchIcon className='cursor-pointer ' onClick={() => { handleSearch() }} />
                </span>
            </div>
        );
    }
}

export default Search;
