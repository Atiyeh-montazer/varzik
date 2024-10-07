"use client"
import React, { useState, useEffect } from 'react';
import { MdOutlineWoman2 } from "react-icons/md";
import './style.css'; // Keeping your styles intact
import { IoMdMan } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use router for navigation
import axios from 'axios';

function Info() {
    const [selectedGender, setSelectedGender] = useState('');
    const [sliderValue, setSliderValue] = useState(50);  // Weight
    const [sliderValue1, setSliderValue1] = useState(50); // Height
    const [sliderValue2, setSliderValue2] = useState(50); // Age
    const [error, setError] = useState('');
    
    const router = useRouter(); // Use Next.js router for redirection

    // Fetch workout info from the server when the component is mounted
    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const resp = await axios.get('http://192.168.30.200:3000/check-token', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const userInfo = resp.data.user;

                // Pre-fill the fields with the workout info from the response
                if (userInfo.workout_info) {
                    setSliderValue(userInfo.workout_info.weight || 50);
                    setSliderValue1(userInfo.workout_info.height || 50);
                    setSliderValue2(userInfo.workout_info.age || 50);
                    setSelectedGender(userInfo.workout_info.sex === 'male' ? 'man' : 'woman');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                setError('Failed to fetch user information.');
                // Redirect to login if token check fails
                router.push('/login');
            }
        };

        fetchUserInfo();
    }, [router]);

    const handleSliderChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
    };

    const handleNextClick = () => {
        // Store the workout info in localStorage
        const userWorkoutInfo = {
            weight: sliderValue,
            height: sliderValue1,
            age: sliderValue2,
            sex: selectedGender === 'woman' ? 'female' : 'male',
        };
        console.log("userWorkoutInfo", userWorkoutInfo);
        localStorage.setItem('userWorkoutInfo', JSON.stringify(userWorkoutInfo));
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
