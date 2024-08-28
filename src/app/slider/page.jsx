
"use client"

import React from 'react'
import Image from 'next/image'
import styles from './style.module.css'
import { useState } from 'react';
import { MdOutlineWoman2 } from "react-icons/md";
import { IoManSharp } from "react-icons/io5";
function slider() {

    // State برای هر اسلایدر
    const [value1, setValue1] = useState(500);
    const [value2, setValue2] = useState(250);
    const [value3, setValue3] = useState(750);

    // هندلر برای تغییر مقدار هر اسلایدر
    const handleSliderChange1 = (event) => {
        setValue1(event.target.value);
    };

    const handleSliderChange2 = (event) => {
        setValue2(event.target.value);
    };

    const handleSliderChange3 = (event) => {
        setValue3(event.target.value);
    };


    return (
        <div className='flex flex-col justify-center items-center '>
            <div className='relative  justify-center  '>
                <Image className={`${styles.bgBackGround}  `} src="/images/45562.jpg" height={10} width={500} />
            </div>

            <div className='flex flex-col  absolute top-20 right-18'>

                <div className=' text-3xl text-gray-700 font-bold vazir mb-8' >
                    <h1>اطلاعات خود را وارد کنید</h1>
                </div>

                <div className='flex justify-center mb-10'>
                    <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 rounded-full mr-3 text-white'>
                        <MdOutlineWoman2 className='   text-[30px] ml-[45px] ' />
                    </button>
                    <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-32 h-11 border rounded-full ml-3 text-white'>
                        <IoManSharp className='text-[27px] ml-[45px] ' />
                    </button>
                </div>

                <div className="flex flex-col items-center space-y-8">
                    {/* اسلایدر اول */}
                    <div className="relative w-full max-w-xl">
                        <div className="relative w-full">
                            {/* <span
                                style={{
                                    position: 'absolute',
                                    left: `calc(${(value1 / 300) * 100}% -90px)`,
                                    top: '25px',
                                    color: 'text-gray-700 ',
                                    border: '1px solid pinc',
                                    padding: '2px 5px',
                                    minWidth: '100px',
                                    textAlign: 'center',
                                }}
                            >
                                <span>{value1}</span>
                            </span> */}
                            <input
                                type="range"
                                max="300"
                                min="20"
                                value={value1}
                                onChange={handleSliderChange1}
                                className="w-full accent-pink-700"
                            />
                        </div>
                        <div className=" text-center text-lg text-gray-700 font-bold vazir ">
                            وزن: {value1}
                        </div>
                    </div>

                    {/* اسلایدر دوم */}
                    <div className="relative w-full max-w-xl">
                        <div className="relative w-full">
                            {/* <span
                                style={{
                                    position: 'absolute',
                                    left: `calc(${(value2 / 1000) * 100}% - 50px)`,
                                    top: '25px',
                                    color: 'red',
                                    border: '1px solid blue',
                                    padding: '2px 5px',
                                    minWidth: '100px',
                                    textAlign: 'center',
                                }}
                            >
                                <span>{value2}</span>
                            </span> */}
                            <input
                                type="range"
                                max="100"
                                min="10"
                                value={value2}
                                onChange={handleSliderChange2}
                                className="w-full accent-pink-700"
                            />
                        </div>
                        <div className=" text-center text-lg  text-gray-700 font-bold vazir">
                            سن: {value2}
                        </div>
                    </div>

                    {/* اسلایدر سوم */}
                    <div className="relative w-full max-w-xl">
                        <div className="relative w-full">
                            {/* <span
                                style={{
                                    position: 'absolute',
                                    left: `calc(${(value3 / 1000) * 100}% - 50px)`,
                                    top: '25px',
                                    color: 'red',
                                    border: '1px solid blue',
                                    padding: '2px 5px',
                                    minWidth: '100px',
                                    textAlign: 'center',
                                }}
                            >
                                <span>{value3}</span>
                            </span> */}
                            <input
                                type="range"
                                max="220"
                                min="50"
                                value={value3}
                                onChange={handleSliderChange3}
                                className="w-full accent-pink-700"
                            />
                        </div>
                        <div className=" text-center text-lg text-gray-700 font-bold vazir ">
                            قد: {value3}
                        </div>
                        <div className='absolute mt-44'>
                            <button className='text-lg text-gray-700 font-bold vazir hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-32 h-10 border border-x-4 rounded-full mr-3 mb-3'>بازگشت</button>
                            <button className=' text-lg text-gray-700 font-bold vazir hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border  focus:bg-pink-700  focus:ring-violet-300 w-32 h-10 border border-x-4 rounded-full ml-3 mb-3'>بعدی</button>
                        </div>

                    </div>


                </div>


            </div>
        </div>
    )
}

export default slider
