import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/counterSlice';
import { addToWishlist } from '../redux/wishList';
import { ToastContainer, toast } from "react-toastify";
const ProductDetail = () => {
    const { state } = useLocation();
    const { item } = state;
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [baseQty, setBaseQty] = useState(1);
    const userInfo = useSelector(state => state.counter.userInfo)
    const loadProducts = async () => {
        let response = await fetch("https://fakestoreapi.com/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        response = await response.json();
        setProducts(response);
    };
    const handleLogin = () => {
        toast.error("Please login first!");
        navigate("/signup");
    }
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when component mounts
    }, []);
    useEffect(() => {
        loadProducts();
    }, []);

    let finalPrice = baseQty * parseInt(item.price);   //This is where Price is changing

    return (
        <div>

            <div className='max-w-container mx-auto px-4'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <div className="bg-white h-auto py-6 z-30 relative flex flex-col gap-4">
                            <div className='flex'>
                                <span className="text-xs capitalize italic absolute top-2 left-2 text-gray-500">
                                    {item.category}
                                </span>
                                <span className="text-xs capitalize italic absolute top-2 right-2 text-yellow-500 cursor-pointer">
                                    <FavoriteBorderOutlinedIcon onClick={() => userInfo ? dispatch(addToWishlist({ ...item })) && toast.success("Item added to wishlist!") : handleLogin()} />
                                </span>
                            </div>
                            <div className="w-full h-auto flex items-center justify-center relative group">
                                <img
                                    className="w-52 h-64 object-contain"
                                    src={item.image}
                                    alt="ProductImg"
                                />

                            </div>
                            <small className="text-gray-500 text-center">
                                {item.rating.count} People ordered this in last 7 days
                            </small>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="bg-white h-auto py-6 z-30 relative flex flex-col gap-4">

                            <div className="w-full h-auto flex items-center justify-center relative group">
                                <div className="px-4 bg-white flex flex-col gap-1">
                                    <h2 className="font-titleFont tracking-wide text-lg text-gray-600 font-medium">
                                        {item.title}
                                    </h2>
                                    <div className="flex items-center gap-8">
                                        <p className="text-lg text-gray-600 font-semibold">
                                            ${finalPrice}
                                        </p>

                                        <p className="flex font-semibold items-center text-gray-600">
                                            Quantity:
                                            <div className="flex items-center ms-1 gap-2 text-sm font-semibold">
                                                <button onClick={() => setBaseQty(baseQty === 1 ? (baseQty = 1) : baseQty - 1)} className="border font-normal text-lg items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                                                >-</button>
                                                {baseQty}
                                                <button onClick={() => setBaseQty(baseQty + 1)} className="border font-normal text-lg items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                                                >+</button>
                                            </div>
                                        </p>

                                    </div>

                                    <div>
                                        <p className="text-sm text-text_color">{item.description}</p>
                                        <div className="flex items-center">
                                            {Array.from(Array(parseInt(item.rating.rate)), (e, i) => {
                                                return (
                                                    <div className="text-yellow-500 ">
                                                        <StarIcon />
                                                    </div>
                                                );
                                            })}
                                            {Array.from(Array(5 - parseInt(item.rating.rate)), (e, i) => {
                                                return (
                                                    <div className="text-yellow-500 ">
                                                        <StarBorderOutlinedIcon />
                                                    </div>)
                                            })}
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button onClick={() => dispatch(addToCart({ ...item, quantity: baseQty })) && toast.success("Item added to cart!")} className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
                                            Add to Cart
                                        </button>
                                        <button className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/*Related Products*/}
            <h3 className="m-5" style={{ fontSize: "18px", fontWeight: "bold" }}>
                Related Products
            </h3>
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-4 px-4">
                {products
                    .filter(
                        (data) => data.category === item.category && data.id !== item.id
                    )
                    .map((prod) => (
                        <div
                            key={prod.id}
                            className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4"
                        >
                            <span className="text-xs capitalize italic absolute top-2 left-2 text-gray-500">
                                {prod.category}
                            </span>
                            <span className="text-xs capitalize italic absolute top-2 right-2 text-yellow-500 cursor-pointer">
                                <FavoriteBorderOutlinedIcon onClick={() => userInfo ? dispatch(addToWishlist({ ...prod })) && toast.success("Item added to wishlist!") : handleLogin()} />
                            </span>
                            <div className="w-full h-auto flex items-center justify-center relative group">
                                <img
                                    className="w-52 h-64 object-contain"
                                    src={prod.image}
                                    alt="ProductImg"
                                />
                               
                            </div>
                            <div className="px-4 bg-white flex flex-col gap-1 z-10">
                                <div className='cursor-pointer' onClick={() => navigate("/productdetail", { state: { item: prod } })}>
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-titleFont tracking-wide text-lg text-gray-600 font-medium">
                                            {prod.title.substring(0, 20)}
                                        </h2>
                                        <p className="text-sm text-gray-600 font-semibold">
                                            ${prod.price}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-text_color">{prod.description.substring(0, 95)}...Read More</p>
                                        <div className='flex items-center'>
                                            {Array.from(Array(parseInt(prod.rating.rate)), (e, i) => {
                                                return (
                                                    <div className="text-yellow-500 ">
                                                        <StarIcon />
                                                    </div>)
                                            })}

                                            {Array.from(Array(5 - parseInt(prod.rating.rate)), (e, i) => {
                                                return (
                                                    <div className="text-yellow-500 ">
                                                        <StarBorderOutlinedIcon />
                                                    </div>)
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <button onClick={() => dispatch(addToCart({ ...prod, quantity: 1 })) && toast.success("Item added to cart!")} className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
                                        Add to Cart
                                    </button>
                                    <button className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default ProductDetail;
