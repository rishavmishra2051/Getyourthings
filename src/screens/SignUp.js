import React from 'react'
import googleLogo from "../assets/googleLogo.png"
import githubLogo from "../assets/githubLogo.png"
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/counterSlice";
import { useNavigate } from "react-router-dom";
import Login from './Login';

const SignUp = () => {
  //const userInfo = useSelector((state) => state.counter.userInfo);
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(
      auth,
      provider.setCustomParameters({ prompt: "select_account" })
    )
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
        toast.success("Sign In Successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const githubLogin = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="h-screen">
      <div className='w-full flex flex-col items-center justify-center py-5'>
        <h1 className="text-3xl font-bold text-green-800">Log in to your account</h1>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        {/*<div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <div
            onClick={handleLogin}
            className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300 mb-5 md:mb-0"
          >
            <img className="w-8" src={googleLogo} alt="googleLogo" />
            <span className="text-sm text-gray-900"> Sign in with Google</span>
          </div>
          <div
            onClick={githubLogin}
            className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
          >
            <img className="w-8" src={githubLogo} alt="githubLogo" />
            <span className="text-sm text-gray-900"> Sign in with Github</span>
          </div>
        </div>
  <h3 className='text-gray-400 my-5'>-----Or with email and password-----</h3>*/}
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Login />
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
    </div>
  )
}

export default SignUp
