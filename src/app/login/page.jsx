import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'
import { RiLockPasswordLine } from "react-icons/ri";
import { BiSolidUser } from "react-icons/bi";
import { GiExitDoor } from "react-icons/gi";

function Login() {
  return (
    <div>

      <div className='relative '>
        <Image className={`${styles.bgBackGround}  `} src="/images/45562.jpg"
          height={10} width={500}
        />
      </div>

      <div className='absolute top-28 right-18  '>

        <div className='flex flex-col text-center justify-center items-center ml-10'>

          <div className='mb-16  text-3xl text-gray-700 font-bold vazir'>
            <h1 className=''>VaRziK</h1>
          </div>

          <div className='flex flex-col mb-5 vazir text-gray-500'>

            <div className='flex justify-center items-center'>
              <input type='text' placeholder='نام کاربری
' className='text-center text-xl  border border-t-0 border-r-0 border-l-0 border border-b-1 w-64 text-right mb-5'>
              </input>
              <span className='text-2xl text-xstext-gray-600 pb-5 pl-2'><BiSolidUser /></span>
            </div>


            <div className='flex justify-center items-center '>ّ

              <input type='text' placeholder=' رمز ورود' className='text-center text-xl  border border-t-0 border-r-0 border-l-0 border border-b-1 w-64 text-right m-1 pr-5
             hover:transition duration-300 ease-in-out' >



              </input>
              <span className='text-lg text-3xl text-gray-600 pl-2'> <RiLockPasswordLine />
              </span>


            </div>

          </div>

          <div className='relative hover:transition duration-300 ease-in-out'>
            <span className='absolute left-4 top-11 text-4xl text-white '><GiExitDoor /></span>
            <button className='border border-none w-52 h-16 rounded-full text-2xl vazir text-white h-14 bg-gradient-to-r from-purple-500 to-pink-500 mt-9  '>ورود</button>

            <h3></h3>
          </div>

          <div>
            <i></i>
            <i></i>
          </div>

        </div>

      </div>



    </div>
  )
}

export default Login
