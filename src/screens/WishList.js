import React, {useEffect} from 'react'
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/counterSlice';
import { addToWishlist } from '../redux/wishList';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { deleteFromWishlist } from '../redux/wishList';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ToastContainer,toast } from "react-toastify";
const WishList = () => {
  const products = useSelector((state) => state.wishList.wishListData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when component mounts
  }, []);
  return (
    <>
      {products.length > 0 ? (<>
        <h2 className='m-5 text-3xl text-yellow-500'>WishList <FavoriteBorderOutlinedIcon /></h2>
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-4 px-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4"
            >
              <div className='flex'>
              <span className="text-xs capitalize italic absolute top-2 left-2 text-gray-500">
                {item.category}
              </span>
              <span className="text-xs capitalize italic absolute top-2 right-2 text-yellow-500 cursor-pointer">
                <DeleteOutlinedIcon onClick={() => dispatch(deleteFromWishlist(item.id))&&toast.warning("Item removed from wishlist!")} />
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
                <ul className="absolute w-full h-36 text-gray-600 bg-gray-100 -bottom-[160px] group-hover:bottom-0 duration-700 flex flex-col justify-center items-end gap-2 cursor-pointer">
                  <li className="productLi">
                    Compare
                    <span>
                      <ApiIcon />
                    </span>
                  </li>
                  <li onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))&&toast.success("Item added to cart!")} className="productLi">
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
                </ul>
              </div>
              <div className="px-4 bg-white flex flex-col gap-1 z-10">
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
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))&&toast.success("Item added to cart!")} className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
                    Add to Cart
                  </button>
                  <button className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div></>) : (
        <div className="flex justify-center items-center h-screen -mt-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col mdl:flex-row justify-center items-center"
          >
            <div className="max-w-[500px] p-4 py-8 bg-white flex flex-col items-center rounded-md shadow-lg">
              <h1 className="font-titleFont text-xl mb-3 text-yellow-500 font-bold uppercase">
                WishList <FavoriteBorderOutlinedIcon />
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
                Your Wishlist is empty. Fill it with
                books, electronics etc.
              </p>
              <Link to="/">
                <button className="rounded-md cursor-pointer mt-3 bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 px-8 py-2 font-titleFont font-semibold text-lg duration-300">
                  Create Wishlist
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
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
    </>
  );
}

export default WishList
