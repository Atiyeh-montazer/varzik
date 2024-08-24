
"use client"
import React from 'react'
import { MdOutlineWoman2 } from "react-icons/md";
import { IoManSharp } from "react-icons/io5";
import Image from 'next/image';
import styles from './style.module.css'

import { useState } from 'react';

function Info() {
    const [position, setPosition] = useState(50); // Initial position in percentage
    const [dragging, setDragging] = useState(false);

    const handleDrag = (e) => {
        const line = e.target.closest('.number-line'); // Updated to handle drag more effectively
        const lineRect = line.getBoundingClientRect();
        const newPosition = ((e.clientX - lineRect.left) / lineRect.width) * 100;

        // Constrain the position between 0 and 100%
        if (newPosition >= 0 && newPosition <= 100) {
            setPosition(newPosition);
        }
    };

    const handleMouseUp = () => setDragging(false);
    const handleMouseDown = () => setDragging(true);
    return (
        <div className='flex flex-col justify-center items-center ' >

            <div className='relative  justify-center  '>
                <Image className={`${styles.bgBackGround}  `} src="/images/45562.jpg"
                    height={10} width={500}
                />
            </div>


            <div className='absolute top-28 right-18'>

                <div className='flex flex-col text-center justify-center items-center ml-10'>
                    <h1 className='vazir mb-16 text-3xl'>اطلاعات خود را وارد کنید</h1>
                </div>

                <div className='flex  justify-center'>
                    <button className='w-32 h-11 border rounded-full  '>
                        <MdOutlineWoman2 className='text-[30px] ml-[45px] ' />
                    </button>

                    <button className='w-32 h-11 border rounded-full'>
                        <IoManSharp className='text-[27px] ml-[45px] ' />
                    </button>
                </div>

                <div className='flex flex-col text-right  '>
                    {/* <label >سن خود را وارد کنید</label>
                    <input type="number" />
                    <label > قد خود را وارد کنید</label>
                    <input type="number" />
                    <label > وزن خود را وارد کنید</label>
                    <input type="number" /> */}


                    <div className="flex flex-col items-center justify-center h-screen ">
                        <div
                            className="relative w-4/5 h-3 bg-gray-300 rounded-full shadow-md number-line cursor-pointer"
                            onMouseMove={(e) => dragging && handleDrag(e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchMove={(e) => handleDrag(e.touches[0])}
                            onTouchEnd={handleMouseUp}
                            onClick={handleDrag}
                        >
                            {/* The Number Line */}
                            <div
                                className="absolute top-0 h-full bg-blue-400 rounded-full transition-all duration-300 ease-in-out"
                                style={{ left: `${position}%`, transform: "translateX(-50%)" }}
                            >
                                {/* The marker */}
                                <div
                                    className="w-4 h-4 bg-red-500 rounded-full shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-125 active:scale-100"
                                    onMouseDown={handleMouseDown}
                                    onTouchStart={handleMouseDown}
                                />
                            </div>
                        </div>

                        {/* Number line labels */}
                        <div className="relative w-4/5 mt-2 flex justify-between text-white font-semibold">
                            {Array.from({ length: 11 }).map((_, index) => (
                                <span key={index} className="transform -translate-x-1/2">
                                    {index * 10}
                                </span>
                            ))}
                        </div>

                        {/* Displaying the current value */}
                        <div className="mt-4 text-2xl font-bold text-white drop-shadow-lg">
                            وزن خود را وارد کنید: <span className="text-pink-400">{Math.round(position)}</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Info
