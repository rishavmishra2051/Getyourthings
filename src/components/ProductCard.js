import React, { useState, useEffect } from 'react'
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/counterSlice';
import { addToWishlist } from '../redux/wishList';
import { ToastContainer, toast } from "react-toastify";

const ProductCard = ({ item }) => {
    const navigate = useNavigate();
  const location = useLocation();
  const search = location.state ? location.state.search : '';
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.counter.userInfo)
  const handleLogin = () => {
    toast.error("Please login first!");
    navigate("/signup");
  }
  useEffect(() => {
    //console.log(search)
  }, [search]);
    return (
        <div className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4 cursor-pointer" >
            <div className='flex'>
                <span className="text-xs capitalize italic absolute top-2 left-2 text-gray-500">
                    {item.category}
                </span>
                <span className="text-xs capitalize italic absolute top-2 right-2 text-yellow-500 cursor-pointer">
                    <FavoriteBorderOutlinedIcon onClick={() => userInfo ? dispatch(addToWishlist({ ...item })) && toast.success("Item added to wishlist!") : handleLogin()} />
                </span>
            </div>
            {/* ========== Product Image Start here ============== */}
            <div className="w-full h-auto flex items-center justify-center relative group cursor-pointer" onClick={() => navigate("/productdetail", { state: { item: item } })}>
                <img
                    className="w-52 h-64 object-contain"
                    src={item.image}
                    alt="ProductImg"
                />
                {/* ================== Product mini drop down Start here ============ */}
                {/*<ul className="absolute w-full h-36 text-gray-600 bg-gray-100 -bottom-[160px] group-hover:bottom-0 duration-700 flex flex-col justify-center items-end gap-2 cursor-pointer">
                <li className="productLi">
                  Compare
                  <span>
                    <ApiIcon />
                  </span>
                </li>
                <li onClick={() => dispatch(addToCart({ ...item, quantity: 1 })) && toast.success("Item added to cart!")} className="productLi">
                  Add to Cart
                  <span>
                    <ShoppingCartIcon />
                  </span>
                </li>
                <li onClick={() => navigate("/productdetail", { state: { item: item } })} className="productLi">
                  View Details{" "}
                  <span>
                    <ArrowCircleRightIcon />
                  </span>
                </li>
                <li onClick={() => userInfo ? dispatch(addToWishlist({ ...item })) && toast.success("Item added to wishlist!") : handleLogin()} className="productLi">
                  Add to WishList{" "}
                  <span>
                    <FavoriteIcon />
                  </span>
                </li>
                  </ul>*/}
            </div>
            <div className="px-4 bg-white flex flex-col gap-1 z-10">
                <div className='cursor-pointer' onClick={() => navigate("/productdetail", { state: { item: item } })}>
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
                    <button onClick={() => dispatch(addToCart({ ...item, quantity: 1 })) && toast.success("Item added to cart!")} className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
                        Add to Cart
                    </button>
                    <button className="w-full py-1.5 mt-3 font-titleFont rounded-md  font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
