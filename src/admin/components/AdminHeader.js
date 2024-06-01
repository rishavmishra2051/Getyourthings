import React, { useState, useEffect, useRef } from 'react'
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { removeUser } from "../../redux/counterSlice";
const AdminHeader = () => {
    const [logOutOptions, setLogOutOptions] = useState(false);
    const ref = useRef();
    const auth = getAuth();
    const dispatch = useDispatch();
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(ref.current)) {
                logOutOptions && setLogOutOptions(false);
            }
        });
    }, [ref, logOutOptions]);
    let navigate = useNavigate();
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
        <div className='sticky top-0 z-50'>
            <nav className="bg-gradient-to-tr from-yellow-400 to-yellow-200 text-gray-800 py-4 gap-2">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate("/") }}>
                        <img src={Logo} alt="Logo" className="h-10 w-10" />
                        <h1 className='font-titleFont font-bold'><i>GetYourThings</i></h1>
                    </div>
                    
                    <button onClick={() => { setLogOutOptions(!logOutOptions) }} className="font-titleFont font-medium text-base border-2 border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-400 p-1.5 rounded-md">
                        Log Out 
                    </button>

                </div>
            </nav>
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
                    <button onClick={() => { setLogOutOptions(!logOutOptions); }} className="rounded-md cursor-pointer mt-3 bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 px-9 py-2 font-titleFont font-semibold text-lg duration-300">
                        Cancel
                    </button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AdminHeader
