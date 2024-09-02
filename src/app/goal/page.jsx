import React from 'react'
import Image from 'next/image'
import styles from './style.module.css'
// import Header from '@/components/header/Header'

function goal() {
    return (

        <div className='flex flex-col justify-center items-center '>

            <div className='relative  justify-center  '>
                <Image className={`${styles.bgBackGround}  `} src="/images/45562.jpg" height={10} width={500} />
            </div>


            <div className='flex flex-col  absolute top-20 right-18'>
                <div className='flex justify-center items-center mb-6 text-3xl text-gray-700 font-bold vazir'>
                    <h1>هدف خود را انتخاب کنید</h1>
                </div>


                <div className='flex  flex-col mb-6 justify-center items-center'>
                    <div >
                        <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-44 h-10  border-x-4 rounded-full  mb-3'>کاهش وزن و تناسب اندام</button>

                    </div>

                    <div>
                        <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-44 h-10  border-x-4 rounded-full mb-3'>عضله‌سازی و قدرت</button>

                    </div>

                    <div>
                        <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-44 h-10  border-x-4 rounded-full mb-3'>فیتنس فانکشنال</button>

                    </div>

                    <div>
                        <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-44 h-10  border-x-4 rounded-full mb-3'>بهبود عملکرد ورزشی</button>

                    </div>

                    <div className='mb-6 mt-4 text-3xl text-gray-700 font-bold vazir'>
                        <h1>سطح ورزشی خود را انتخاب کنید؟</h1>
                    </div>

                    <div className='flex  flex-col mb-6 justify-center items-center'>

                        <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-44 h-10 border-x-4 rounded-full  mb-3'>مبتدی</button>
                        <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-44 h-10  border-x-4 rounded-full  mb-3'>متوسط</button>
                        <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-44 h-10  border-x-4 rounded-full  mb-3'>حرفه ای</button>

                    </div>

                    <div className='mt-[px]'>
                        <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-32 h-10  border-x-4 rounded-full mr-3 mb-3'>بازگشت</button>
                        <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-32 h-10  border-x-4 rounded-full ml-3 mb-3'>بعدی</button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default goal
