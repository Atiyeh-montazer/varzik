"use client";
import React, { useState, useEffect, useContext } from 'react';
import { MdOutlineWoman2 } from "react-icons/md";
import './style.css'; 
import { IoMdMan } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';
import { UserContext } from '@/contexts/userContext'; 

function Info() {
    const { user, login } = useContext(UserContext); 
    const [selectedGender, setSelectedGender] = useState('');
    const [sliderValue, setSliderValue] = useState(50);  
    const [sliderValue1, setSliderValue1] = useState(50); 
    const [sliderValue2, setSliderValue2] = useState(50); 
    const [error, setError] = useState('');
    const [isFirstRender, setIsFirstRender] = useState(true); 
    
    const router = useRouter(); 

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else if (isFirstRender) {
            // Pre-fill the sliders and gender from the user context
            if (user.workout_info) {
                setSliderValue(user.workout_info.weight || 50);
                setSliderValue1(user.workout_info.height || 50);
                setSliderValue2(user.workout_info.age || 50);
                setSelectedGender(user.workout_info.sex === 'male' ? 'man' : 'woman');
            }
            setIsFirstRender(false);
        }
    }, [user, router, isFirstRender]); 

    const handleSliderChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
    };

    const handleNextClick = () => {
        const updatedWorkoutInfo = {
            weight: sliderValue,
            height: sliderValue1,
            age: sliderValue2,
            sex: selectedGender === 'woman' ? 'female' : 'male',
        };

        // Merge the workout info into the user context
        login({
            ...user, // Spread current user properties
            workout_info: updatedWorkoutInfo // Update only workout_info
        });

        // For debugging purposes, check if the user context has updated properly
        console.log('Updated User Context:', {
            ...user,
            workout_info: updatedWorkoutInfo
        });

        // Optionally update localStorage for redundancy
        localStorage.setItem('userWorkoutInfo', JSON.stringify(updatedWorkoutInfo));
    };

    return (
        <div>
            {error && <p className="text-red-500 text-center">{error}</p>}

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
                    onChange={(e) => handleSliderChange(e, setSliderValue)}
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
                    onChange={(e) => handleSliderChange(e, setSliderValue1)}
                />
                <p className='text-center text-gray-900 text-xl'><span>قد: {sliderValue1}</span> سانتی متر</p>
            </div>

            <h1 className='text-center text-2xl text-gray-800 font-bold vazir mt-8'>:سن خود را وارد کنید</h1>
            <div className="slidecontainer">
                <input
                    type="range"
                    min="12"
                    max="70"
                    value={sliderValue2}
                    className="slider"
                    id="myRange"
                    onChange={(e) => handleSliderChange(e, setSliderValue2)}
                />
                <p className='text-center text-gray-900 text-xl'><span>سن: {sliderValue2}</span> سال</p>
            </div>

            <div className='flex justify-center'>
                <Link href="/user">
                    <button className='hover:bg-pink-700 mt-[6rem] w-32 h-11 border border-x-4 rounded-full mr-3 flex justify-center items-center text-xl'>
                        بازگشت
                    </button>
                </Link>

                <Link href="/goal">
                    <button className='hover:bg-pink-700 mt-[6rem] w-32 h-11 border border-x-4 rounded-full mr-3 flex justify-center items-center text-xl' onClick={handleNextClick}>
                        بعدی
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Info;
