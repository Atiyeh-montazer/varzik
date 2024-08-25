
"use client"
import React from 'react'
import { MdOutlineWoman2 } from "react-icons/md";
import { IoManSharp } from "react-icons/io5";
import Image from 'next/image';
import styles from './style.module.css'

import { useState } from 'react';

function Info() {
    // سه state برای هر محور عددی
    const [positionWeight, setPositionWeight] = useState(50);
    const [positionAge, setPositionAge] = useState(25);
    const [positionHeight, setPositionHeight] = useState(50);

    const [dragging, setDragging] = useState(null);

    const handleDrag = (e, setPosition) => {
        const line = e.target.closest('.number-line');
        const lineRect = line.getBoundingClientRect();
        const newPosition = ((e.clientX - lineRect.left) / lineRect.width) * 100;

        if (newPosition >= 0 && newPosition <= 100) {
            setPosition(newPosition);
        }
    };

    const handleMouseUp = () => setDragging(null);
    const handleMouseDown = (setPosition) => setDragging(() => (e) => handleDrag(e, setPosition));

    return (
        <div className='flex flex-col justify-center items-center '>
            <div className='relative  justify-center  '>
                <Image className={`${styles.bgBackGround}  `} src="/images/45562.jpg" height={10} width={500} />
            </div>

            <div className='absolute top-18 right-18'>
                <div className='flex flex-col text-center justify-center items-center '>
                    <h1 className='mb-6  text-3xl text-gray-700 font-bold vazir'>اطلاعات خود را وارد کنید</h1>
                </div>

                <div className='flex justify-center mb-10'>
                    <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border rounded-full mr-3 text-white'>
                        <MdOutlineWoman2 className='   text-[30px] ml-[45px] ' />
                    </button>
                    <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500  w-32 h-11 border rounded-full ml-3 text-white'>
                        <IoManSharp className='text-[27px] ml-[45px] ' />
                    </button>
                </div>

                <div className='flex flex-col space-y-16'>
                    {/* محور وزن */}
                    <div className="flex flex-col items-center">
                        <div
                            className="relative w-4/5 h-3 bg-gray-300 rounded-full shadow-md number-line cursor-pointer  "
                            onMouseMove={(e) => dragging && dragging(e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchMove={(e) => dragging && handleDrag(e.touches[0], dragging)}
                            onTouchEnd={handleMouseUp}
                            onClick={(e) => handleDrag(e, setPositionWeight)}
                        >
                            <div
                                className="absolute top-0 h-full bg-blue-400 rounded-full transition-all duration-300 ease-in-out"
                                style={{ left: `${positionWeight}%`, transform: "translateX(-50%)" }}
                            >
                                <div
                                    className="w-4 h-4 bg-pink-700 rounded-full shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-125 active:scale-100"
                                    onMouseDown={() => handleMouseDown(setPositionWeight)}
                                    onTouchStart={() => handleMouseDown(setPositionWeight)}
                                />
                            </div>
                        </div>
                        {/* <div className="relative w-4/5 mt-2 flex justify-between text-gray-600 font-semibold">
                            {Array.from({ length: 11 }).map((_, index) => (
                                <span key={index} className="transform -translate-x-1/2">
                                    {index * 10}
                                </span>
                            ))}
                        </div> */}
                        <div className="mt-3 text-2xl font-bold text-gray-700 drop-shadow-lg">
                            وزن خود را وارد کنید: <span className=" ">{Math.round(positionWeight)}</span> کیلوگرم
                        </div>
                    </div>

                    {/* محور سن */}
                    <div className="flex flex-col items-center">
                        <div
                            className="  relative w-4/5 h-3 bg-gray-300 rounded-full shadow-md number-line cursor-pointer"
                            onMouseMove={(e) => dragging && dragging(e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchMove={(e) => dragging && handleDrag(e.touches[0], dragging)}
                            onTouchEnd={handleMouseUp}
                            onClick={(e) => handleDrag(e, setPositionAge)}
                        >
                            <div
                                className="absolute top-0 h-full bg-green-400 rounded-full transition-all duration-300 ease-in-out"
                                style={{ left: `${positionAge}%`, transform: "translateX(-50%)" }}
                            >
                                <div
                                    className="w-4 h-4 bg-pink-700 rounded-full shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-125 active:scale-100"
                                    onMouseDown={() => handleMouseDown(setPositionAge)}
                                    onTouchStart={() => handleMouseDown(setPositionAge)}
                                />
                            </div>
                        </div>
                        {/* <div className="relative w-4/5 mt-2 flex justify-between text-gray-600 font-semibold">
                            {Array.from({ length: 11 }).map((_, index) => (
                                <span key={index} className="transform -translate-x-1/2">
                                    {index * 10}
                                </span>
                            ))}
                        </div> */}
                        <div className="mt-3 text-2xl font-bold text-gray-700 drop-shadow-lg">
                            سن خود را وارد کنید: <span className=" ">{Math.round(positionAge)}</span> سال
                        </div>
                    </div>

                    {/* محور قد */}
                    <div className="flex flex-col items-center">
                        <div
                            className=" relative w-4/5 h-3 bg-gray-300 rounded-full shadow-md number-line cursor-pointer"
                            onMouseMove={(e) => dragging && dragging(e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchMove={(e) => dragging && handleDrag(e.touches[0], dragging)}
                            onTouchEnd={handleMouseUp}
                            onClick={(e) => handleDrag(e, setPositionHeight)}
                        >
                            <div
                                className="absolute top-0 h-full bg-purple-400 rounded-full transition-all duration-300 ease-in-out"
                                style={{ left: `${positionHeight}%`, transform: "translateX(10%)" }}
                            >
                                <div
                                    className="w-4 h-4 bg-pink-700  rounded-full shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-125 active:scale-100"
                                    onMouseDown={() => handleMouseDown(setPositionHeight)}
                                    onTouchStart={() => handleMouseDown(setPositionHeight)}
                                />
                            </div>
                        </div>
                        {/* <div className="relative w-4/5 mt-2 flex justify-between text-gray-600 font-semibold">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <span key={index} className="transform -translate-x-1/2">
                                    {index * 50}
                                </span>
                            ))}
                        </div> */}
                        <div className="mt-4 text-2xl font-bold text-gray-700 drop-shadow-lg">
                            قد خود را وارد کنید: <span className="">{Math.round(positionHeight * 2.5)}</span> سانتیمتر
                        </div>
                    </div>
                </div>


                <div className='absolute'>
                    <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500 w-32 h-10 border border-x-4 rounded-full mr-3 mb-3'>بازگشت</button>
                    <button className='hover:bg-gradient-to-r from-purple-500 to-pink-500 w-32 h-10 border border-x-4 rounded-full ml-3 mb-3'>بعدی</button>
                </div>

            </div>


        </div>

    )
}

export default Info
