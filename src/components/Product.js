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
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { ToastContainer, toast } from "react-toastify";
const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const location = useLocation();
  const search = location.state ? location.state.search : '';
  const category = location.state ? location.state.search : '';
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.counter.userInfo)
  const handleLogin = () => {
    toast.error("Please login first!");
    navigate("/signup");
  }
  useEffect(() => {
    //console.log(search)
  }, [search]);
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
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-4 px-4">
      {products.length > 0 ? products.filter(
        (data) => data.title.toLowerCase().includes(search.toLowerCase()) || data.category.toLowerCase().includes(search.toLowerCase()) || data.description.toLowerCase().includes(search.toLowerCase()) && data.category.toLowerCase().includes(category.toLowerCase()))
        .map((item) => (
          <div
            key={item.id}
            className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4 cursor-pointer"
            onClick={() => navigate("/productdetail", { state: { item: item } })}
          >
            <div className='flex'>
              <span className="text-xs capitalize italic absolute top-2 left-2 text-gray-500">
                {item.category}
              </span>
              <span className="text-xs capitalize italic absolute top-2 right-2 text-yellow-500 cursor-pointer">
                <FavoriteBorderOutlinedIcon onClick={() => userInfo ? dispatch(addToWishlist({ ...item })) && toast.success("Item added to wishlist!") : handleLogin()} />
              </span>
            </div>
            {/* ========== Product Image Start here ============== */}
            <div className="w-full h-auto flex items-center justify-center relative group">
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
                  <div className='flex items-center'>
                    {Array.from(Array(parseInt(item.rating.rate)), (e, i) => {
                      return (
                        <div className="text-yellow-500 ">
                          <StarIcon />
                        </div>)
                    })}

                    {Array.from(Array(5 - parseInt(item.rating.rate)), (e, i) => {
                      return (
                        <div className="text-yellow-500 ">
                          <StarBorderOutlinedIcon />
                        </div>)
                    })}
                  </div>
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
        )) : <div className="w-full h-full flex items-center justify-center"><SearchOffIcon /> No Product Found</div>}
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
  )
}

export default Product
