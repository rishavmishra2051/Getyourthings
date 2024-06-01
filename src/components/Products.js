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
import ProductCard from './ProductCard';
import { fetchProducts, productRef } from '../FirebaseConfig';
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
const Products = () => {
    const [products, setProducts] = useState([])
    const location = useLocation();
    const search = location.state ? location.state.search : '';
    const category = location.state ? location.state.search : '';
    useEffect(() => {
        const fetchData = async () => {
            const prods = await fetchProducts();
            const approvedProds = prods.filter(product => product.verification === "Approved");
            const shuffledProds = shuffleArray(approvedProds);
            setProducts(shuffledProds);
        };
        fetchData();
    }, []);
    return (
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-4 px-4">
      {products.length > 0 ? products.filter(
        (data) => data.title.toLowerCase().includes(search.toLowerCase()) || data.category.toLowerCase().includes(search.toLowerCase()) || data.description.toLowerCase().includes(search.toLowerCase()) && data.category.toLowerCase().includes(category.toLowerCase()))
        .map((item) => (
          <div key={item.id}>
            <ProductCard item={item} />
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

export default Products
