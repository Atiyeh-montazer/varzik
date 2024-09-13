"use client"
import React, { useState } from 'react';
import { MdOutlineWoman2 } from "react-icons/md";
import './style.css';
import { IoMdMan } from "react-icons/io";
import Link from 'next/link';

function Info() {
    // State for gender selection
    const [selectedGender, setSelectedGender] = useState('');

    // استفاده از state برای ذخیره مقدار وزن اسلایدر
    const [sliderValue, setSliderValue] = useState(50);

    // تابعی که در هنگام تغییر اسلایدر فراخوانی می‌شود
    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    // استفاده از state برای ذخیره مقدار قد اسلایدر
    const [sliderValue1, setSliderValue1] = useState(50);

    // تابعی که در هنگام تغییر اسلایدر فراخوانی می‌شود
    const handleSliderChange1 = (event) => {
        setSliderValue1(event.target.value);
    };

    // استفاده از state برای ذخیره مقدار سن اسلایدر
    const [sliderValue2, setSliderValue2] = useState(50);

    // تابعی که در هنگام تغییر اسلایدر فراخوانی می‌شود
    const handleSliderChange2 = (event) => {
        setSliderValue2(event.target.value);
    };

    // Handlers for gender selection
    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
    };

    return (
        <div>
            <div className='flex justify-center items-center '>
                <button
                    className={`mt-6 mb-3 w-32 h-11 border border-x-4 rounded-full mr-5 flex justify-center items-center text-4xl ${selectedGender === 'woman' ? 'bg-pink-700' : ''}`}
                    onClick={() => handleGenderClick('woman')}
                >
                    <MdOutlineWoman2 />
                </button>
                <button
                    className={`mt-6 mb-3 w-32 h-11 border border-x-4 rounded-full mr-5 flex justify-center items-center text-4xl ${selectedGender === 'man' ? 'bg-pink-700' : ''}`}
                    onClick={() => handleGenderClick('man')}
                >
                    <IoMdMan />
                </button>
            </div>

            <h1 className='text-center text-2xl text-gray-800 font-bold vazir mt-8'>:وزن خود را وارد کنید</h1>
            <div className="slidecontainer">
                <input
                    type="range"
                    min="20"
                    max="300"
                    value={sliderValue}
                    className="slider"
                    id="myRange"
                    onChange={handleSliderChange} 
                />
                <p className='text-center text-gray-900 text-xl'><span>وزن: {sliderValue}</span> کیلو گرم</p>
            </div>

            <h1 className='text-center text-2xl text-gray-800 font-bold vazir mt-8'>:قد خود را وارد کنید</h1>
            <div className="slidecontainer">
                <input
                    type="range"
                    min="20"
                    max="300"
                    value={sliderValue1}
                    className="slider"
                    id="myRange"
                    onChange={handleSliderChange1}
                />
                <p className='text-center text-gray-900 text-xl'><span>قد: {sliderValue1}</span> سانتی متر</p>
            </div>

            <h1 className='text-center text-2xl text-gray-800 font-bold vazir mt-8'>:سن خود را وارد کنید</h1>
            <div className="slidecontainer">
                <input
                    type="range"
                    min="20"
                    max="300"
                    value={sliderValue2}
                    className="slider"
                    id="myRange"
                    onChange={handleSliderChange2}
                />
                <p className='text-center text-gray-900 text-xl'><span>سن: {sliderValue2}</span> سال</p>
            </div>

            <div className='flex justify-center'>
                <Link href="/user">
                    <button className='hover:bg-pink-700 mt-[6rem] w-32 h-11 border border-x-4 rounded-full mr-3 flex justify-center items-center text-xl'>بازگشت</button>
                </Link>

                <Link href='/goal'>
                    <button className='hover:bg-pink-700 mt-[6rem] w-32 h-11 border border-x-4 rounded-full mr-3 flex justify-center items-center text-xl'>بعدی</button>
                </Link>
            </div>
        </div>
    );
}

export default Info;
