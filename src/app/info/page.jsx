"use client";
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'; import React, { useState, useEffect } from 'react';
import { MdOutlineWoman2 } from "react-icons/md";
import './style.css';
import { IoMdMan } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaClipboardUser } from "react-icons/fa6";
import { useAuth } from '@/providers/auth_provider';
import { Input, InputAdornment } from '@mui/material';

function Info() {
    const [selectedGender, setSelectedGender] = useState('');
    const [sliderValue, setSliderValue] = useState(50);
    const [sliderValue1, setSliderValue1] = useState(50);
    const [sliderValue2, setSliderValue2] = useState(50);
    const [username, setUsername] = useState("");
    const [error, setError] = useState('');
    const auth = useAuth()
    const router = useRouter();
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        if (auth.loading) return
        if (!auth.user) {
            router.push('/login');
            return
        }
        setUser(auth.user)
        console.log("user info in info page", auth.user);
        if (auth.user.workout_info) {
            setSliderValue(auth.user.workout_info.weight || 50);
            setSliderValue1(auth.user.workout_info.height || 50);
            setSliderValue2(auth.user.workout_info.age || 50);
            setSelectedGender(auth.user.workout_info.sex === 'male' ? 'man' : 'woman');
        }
        setUsername(auth.user.username || '');

    }, [auth]);

    const handleSliderChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
    };

    const handleNextClick = () => {
        console.log("handleNextClick userinfo", user);
        const updatedUserInfo = {
            ...user, // Spread the existing user info
            username: username, // Update the username
            workout_info: {
                weight: sliderValue,
                height: sliderValue1,
                age: sliderValue2,
                sex: selectedGender === 'woman' ? 'female' : 'male',
                goal: user.workout_info.goal,
                level: user.workout_info.level
            }
        };
        auth.setUser(updatedUserInfo)
        // Navigate to the next page
        router.push('/goal');
    };

    return (
        <div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                    <InputAdornment position="start">
                        <span className='text-2xl text-gray-800'>
                            <FaClipboardUser />
                        </span>
                    </InputAdornment>
                }
                type='text' placeholder='نام کاربری' value={username} onChange={(e) => { setUsername(e.target.value) }}
                className='text-xl placeholder-gray-800 w-64 text-right'
                css={css`justify-self:center;`}
            />
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
