import React, { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { removeUser } from "../redux/counterSlice";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
const UserSettingOption = (props) => {
    const ref = useRef();
    const auth = getAuth();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.counter.userInfo)
    const [logOutOptions, setLogOutOptions] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(ref.current)) {
                logOutOptions && setLogOutOptions(false);
            }
        });
    }, [ref, logOutOptions]);
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(removeUser());
                navigate("/");
                setLogOutOptions(!logOutOptions);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            {userInfo && <div>
                <ul
                    ref={ref}
                    className="absolute w-40 h-30 top-15 right-1 rounded-md overflow-x-hidden bg-gray-500 border-[1px] border-yellow-500 text-black p-2 flex flex-col gap-1 z-50"
                >
                    <li
                        onClick={() => { navigate("/cart"); props.closeSettingList(); }} className="text-yellow-500 tracking-wide font-titleFont rounded-md text-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer"

                    >
                        Cart <ShoppingCartOutlinedIcon className="scale-75" />
                    </li>
                    <li
                        onClick={() => { navigate("/orders"); props.closeSettingList(); }} className="text-yellow-500 tracking-wide font-titleFont rounded-md text-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer"

                    >
                        Orders <LocalMallOutlinedIcon className="scale-75" />
                    </li>
                    <li
                        onClick={() => { navigate("/wishlist"); props.closeSettingList(); }} className="text-yellow-500 tracking-wide font-titleFont rounded-md text-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer"

                    >
                        Wishlist <FavoriteBorderOutlinedIcon className="scale-75" />
                    </li>
                    <li
                        onClick={() => { navigate("/offers"); props.closeSettingList(); }} className="text-yellow-500 tracking-wide font-titleFont rounded-md text-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer"

                    >
                        Offers <LocalOfferOutlinedIcon className="scale-75" />
                    </li>
                    <li
                        onClick={() => { navigate("/addresses"); props.closeSettingList(); }} className="text-yellow-500 tracking-wide font-titleFont rounded-md text-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer"

                    >
                        Addresses <LocationOnOutlinedIcon className="scale-75" />
                    </li>
                    <li
                        onClick={() => { setLogOutOptions(!logOutOptions) }} className="text-yellow-500 tracking-wide font-titleFont rounded-md text-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer"
                    >
                        Log Out <LoginOutlinedIcon className="scale-75" />
                    </li>
                </ul>
            </div>
            }

            {/*LogOut Option*/}
            
            {logOutOptions && (
                <div className="max-w-[500px] p-4 py-8 bg-white flex flex-col items-center rounded-md shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h1 className="font-titleFont text-xl mb-3 text-red-500 font-bold uppercase">
                    Sign Out Warning
                </h1>
                <p className="text-sm text-center px-10 -mt-2">
                    Are you sure you want to sign out?
                </p>
                <div className='flex gap-2'>
                    <button onClick={handleSignOut} className="rounded-md cursor-pointer mt-3 bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 px-9 py-2 font-titleFont font-semibold text-lg duration-300">
                        Sign Out
                    </button>
                    <button onClick={() => { setLogOutOptions(!logOutOptions); props.closeSettingList(); }} className="rounded-md cursor-pointer mt-3 bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 px-9 py-2 font-titleFont font-semibold text-lg duration-300">
                        Cancel
                    </button>
                </div>
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
    )
}

export default UserSettingOption
