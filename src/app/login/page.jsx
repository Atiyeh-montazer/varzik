import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'
import { GiExitDoor } from "react-icons/gi";
import { BsInstagram } from "react-icons/bs";
import { SiTelegram } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import Link from 'next/link'
function Login() {
  return (
    <div className='flex flex-col items-center'>

      <div className='relative  justify-center  '>
        <Image className={`${styles.bgBackGround} `} src="/images/45562.jpg"
          height={10} width={500}
        />
      </div>

      <div className='absolute top-28 right-18'>

        <div className='flex flex-col text-center justify-center items-center ml-10'>

          <div className='mb-16  text-3xl text-gray-700 font-bold vazir'>
            <h1 className=''>VaRziK</h1>
          </div>

          <div className='flex flex-col mb-5 vazir '>

            <div className='flex justify-center items-center '>
              <input type='text' placeholder='ایمیل' className='outline-none text-xl  border border-t-0 border-r-0 border-l-0  border-b-1  bg-transparent placeholder-gray-600 w-64 text-right mb-5 m-1' />

              <span className='text-2xl text-gray-600  pb-2'><MdEmail /></span>
            </div>


            <div className='flex   items-center '>

              <input type='text' placeholder=' تلفن همراه' className='outline-none text-xl  border border-t-0 border-r-0 border-l-0  border-b-1 bg-transparent placeholder-gray-600 w-64 text-right m-3 ' />



              <span className='text-lg pr-5 pt-3 text-gray-600'> <FaPhoneFlip />
              </span>


            </div>

          </div>

          <div className='relative hover:transition duration-300 ease-in-out'>
            <span className='absolute left-4 top-6 text-2xl text-white '><GiExitDoor /></span>

            <div >
              <Link href="/mainPage">
                <button className='hover:bg-gradient-to-r   w-32 h-11 border  focus:bg-pink-700  mt-4 text-white  border-x-4 rounded-full mr-3 mb-3'>ورود</button>
              </Link>
            </div>




          </div>

          <div className='flex gap-3 absolute top-[33rem]
           '>
            <div className='text-4xl  from-purple-500 to-pink-500'>
              <BsInstagram />

            </div>

            <div className='text-black-700 text-4xl bg-none '>
              <SiTelegram />

            </div>

          </div>

        </div>

      </div>



    </div >
  )
}

export default Login
