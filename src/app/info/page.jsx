
"use client"
import React from 'react'
import { MdOutlineWoman2 } from "react-icons/md";
import './style.css'
import { IoMdMan } from "react-icons/io";
import { useState } from 'react';
import Link from 'next/link'

function Info() {
    // استفاده از state برای ذخیره مقدار وزن اسلایدر
    const [sliderValue, setSliderValue] = useState(50);

    // تابعی که در هنگام تغییر اسلایدر فراخوانی می‌شود
    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    // استفاده از state برای ذخیره مقدار  قد اسلایدر
    const [sliderValue1, setSliderValue1] = useState(50);

    // تابعی که در هنگام تغییر اسلایدر فراخوانی می‌شود
    const handleSliderChange1 = (event) => {
        setSliderValue1(event.target.value);
    };

    // استفاده از state برای ذخیره مقدار  سن اسلایدر
    const [sliderValue2, setSliderValue2] = useState(50);

    // تابعی که در هنگام تغییر اسلایدر فراخوانی می‌شود
    const handleSliderChange2 = (event) => {
        setSliderValue2(event.target.value);
    };

    return (
        <div>



            <div className='flex justify-center items-center ' >

                <button className='hover:bg-pink-700 mt-6 mb-3  w-32 h-11 border  border-x-4 rounded-full mr-5 flex justify-center items-center text-4xl'><MdOutlineWoman2 /></button>
                <button className='hover:bg-pink-700  mt-6 mb-3 w-32 h-11 border  border-x-4 rounded-full mr-5 flex justify-center items-center
                text-4xl' ><IoMdMan /></button>
            </div>

            <h1 className='text-center   text-2xl text-gray-800 font-bold vazir mt-8 '>:وزن خود را وارد کنید</h1>
            <div className="slidecontainer">
                <input
                    type="range"
                    min="20"
                    max="300"
                    value={sliderValue}
                    className="slider"
                    id="myRange"
                    onChange={handleSliderChange} // وقتی مقدار اسلایدر تغییر می‌کند
                />
                <p className='text-center text-gray-900 text-xl '><span > وزن:{sliderValue}</span>کیلو گرم</p> {/* نمایش مقدار اسلایدر */}
            </div>



            <h1 className='text-center   text-2xl text-gray-800 font-bold vazir mt-8'>:قد خود را وارد کنید</h1>
            <div className="slidecontainer">
                <input
                    type="range"
                    min="20"
                    max="300"
                    value={sliderValue1}
                    className="slider"
                    id="myRange"
                    onChange={handleSliderChange1} // وقتی مقدار اسلایدر تغییر می‌کند
                />
                <p className='text-center text-gray-900 text-xl  '><span >قد:{sliderValue1}</span>سانتی متر</p> {/* نمایش مقدار اسلایدر */}
            </div>





            <h1 className='text-center   text-2xl text-gray-800 font-bold vazir mt-8'>:سن خود را وارد کنید</h1>
            <div className="slidecontainer">
                <input
                    type="range"
                    min="20"
                    max="300"
                    value={sliderValue2}
                    className="slider"
                    id="myRange"
                    onChange={handleSliderChange2} // وقتی مقدار اسلایدر تغییر می‌کند
                />
                <p className='text-center text-gray-900 text-xl '><span >سن:{sliderValue2}</span>سال</p> {/* نمایش مقدار اسلایدر */}
            </div>

            <div className=' flex justify-center  '>

                <Link href="/user">
                    <button className='hover:bg-pink-700   mt-[6rem] w-32 h-11 border   border-x-4 rounded-full mr-3 flex justify-center items-center text-xl'>بازگشت</button>
                </Link>


                <Link href='/goal'>
                    <button className='hover:bg-pink-700  mt-[6rem]  w-32 h-11 border  border-x-4 rounded-full mr-3 flex justify-center items-center text-xl'>بعدی</button>
                </Link>



            </div>
        </div>
    );
}

export default Info
