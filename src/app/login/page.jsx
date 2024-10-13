"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { GiExitDoor } from "react-icons/gi";
import { BsInstagram } from "react-icons/bs";
import { SiTelegram } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { login, setUserFromStorage } from '@/redux/userSlice'; // Import login action

function Login() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch(); // Use dispatch to trigger actions
  const { push } = useRouter();
  const router = useRouter();
  
  // Set user info from localStorage if available
  useEffect(() => {
    dispatch(setUserFromStorage()); // Load user from storage on first render

    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      router.push('/user'); // Redirect if user is already logged in
    }
  }, [dispatch, router]);

  const handleLogin = async () => {
    if (!phone || !email) {
      setError('ایمیل یا شماره تلفن را پر کنید');
      return;
    }

    try {
      let resp = await axios.post('https://api.varzik.ir/login', { email, phone });
      // Redirect to OTP validation page
      push(`/validate-otp?phone=${phone}&email=${email}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(`درخواست کد با خطا مواجه شد: ${error.response.data.message}`);
      } else {
        setError('درخواست کد با خطا مواجه شد: ' + error.message);
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>

      <div className='absolute top-28 right-18'>

        <div className='flex flex-col text-center justify-center items-center ml-10 mt-32'>

          <div className='mb-16  text-3xl text-gray-900 font-bold vazir'>
            <h1 className=''>VaRziK</h1>
          </div>

          <div className='flex flex-col mb-5 vazir '>

            <div className='flex justify-center items-center '>
              <input type='text' placeholder='ایمیل' value={email} onChange={(e) => { setEmail(e.target.value) }} className='outline-none text-xl   border border-t-0 border-r-0 border-l-0  border-b-1  bg-transparent placeholder-gray-800 w-64 text-right mb-5 m-1' />

              <span className='text-2xl text-gray-800  pb-2'><MdEmail /></span>
            </div>


            <div className='flex   items-center '>

              <input type='text' placeholder=' تلفن همراه' value={phone} onChange={(e) => { setPhone(e.target.value) }} className='outline-none text-xl   border border-t-0 border-r-0 border-l-0  border-b-1  bg-transparent placeholder-gray-800 w-64 text-right mb-5 m-1' />



              <span className='text-2xl text-gray-800  pb-2'> <FaPhoneFlip />
              </span>


            </div>

          </div>

          {
            error && <p style={{ color: 'red' }}>{error}</p>
          }
          <div className='relative hover:transition duration-300 ease-in-out'>
            <span className='absolute left-4 top-6 text-2xl text-white '><GiExitDoor /></span>

            <div >


              <button onClick={handleLogin} className='hover:bg-gradient-to-r   w-32 h-11 border  focus:bg-pink-700  mt-4 text-white  border-x-4 rounded-full mr-3 mb-3'>ورود</button>

            </div>




          </div>

          <div className='flex gap-5 absolute 
        bottom-[-90px]
           '>
            <div className='text-4xl text-gray-800'>
              <BsInstagram />

            </div>

            <div className='text-gray-800 text-4xl bg-none  '>
              <SiTelegram />

            </div>

          </div>

        </div>

      </div>



    </div >
  )
}

export default Login;
