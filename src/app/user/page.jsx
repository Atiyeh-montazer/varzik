"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import Trainning from "@/components/Trainning";
import Diet from "@/components/Diet";
import Coach from "@/components/Coach";
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPlans, fetchUserDiets, fetchUserCoaches } from '@/redux/userSlice'; // Import your action creators

function User() {
    const dispatch = useDispatch(); // Hook to dispatch Redux actions
    const user = useSelector((state) => state.user.userInfo); // Access user data from Redux store
    const plans = useSelector((state) => state.user.plans); // Access plans from Redux store
    const diets = useSelector((state) => state.user.diets); // Access diets from Redux store
    const coaches = useSelector((state) => state.user.coaches); // Access coaches from Redux store
    const [activeComponent, setActiveComponent] = useState('trainning');
    const [loadingData, setLoadingData] = useState(false); // Single loading state for data
    const [error, setError] = useState(null); // Track errors during fetch
    const router = useRouter();

    // Redirect to login if user is not available
    useEffect(() => {
        if (!user) {
            router.replace('/login');
        }
    }, [user, router]);

    // Fetch plans, diets, or coaches based on active component and user
    useEffect(() => {
        if (user) {
            const token = localStorage.getItem('jwtToken');
            if (activeComponent === 'trainning') {
                setLoadingData(true);
                dispatch(fetchUserPlans(token)) // Dispatch Redux action to fetch plans
                    .finally(() => setLoadingData(false));
            } else if (activeComponent === 'diet') {
                setLoadingData(true);
                dispatch(fetchUserDiets(token)) // Dispatch Redux action to fetch diets
                    .finally(() => setLoadingData(false));
            } else if (activeComponent === 'coach') {
                setLoadingData(true);
                dispatch(fetchUserCoaches(token)) // Dispatch Redux action to fetch coaches
                    .finally(() => setLoadingData(false));
            }
        }
    }, [activeComponent, user, dispatch]);

    // Show loading indicator when fetching user or data
    // if (!user || loadingData) {
    //     return <div>Loading data...</div>; // Show loading only when necessary
    // }

    if (error) {
        return <div>{error}</div>; // Show error message if fetch fails
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='relative w-full'>
                <div className=''>
                    <div className='w-32 h-32 rounded-full bg-white m-6 overflow-hidden'>
                        {user && user.profile_pic && (
                            <Image
                                src={`https://api.varzik.ir${user.profile_pic}`}
                                alt="User Image"
                                width={128}
                                height={128}
                                className="object-cover w-full h-full"
                            />
                        )}
                    </div>

                    <div className='flex justify-center'>
                        <Link href='/medicalfile'>
                            <button className='hover:bg-pink-700 w-32 h-11 border border-x-4 rounded-full mr-12'>
                                پرونده پزشکی
                            </button>
                        </Link>

                        <Link href='/info'>
                            <button className='hover:bg-pink-700 w-32 h-11 border border-x-4 rounded-full ml-3'>
                                ویرایش
                            </button>
                        </Link>
                    </div>

                    <div className='flex justify-center text-2xl mt-8 gap-10'>
                        <button onClick={() => setActiveComponent('trainning')}>
                            <FaClipboardList
                                className={`text-4xl shadow ${activeComponent === 'trainning' ? 'text-green-200' : 'text-black'}`}
                            />
                        </button>

                        <button onClick={() => setActiveComponent('diet')}>
                            <BiSolidDish
                                className={`text-4xl shadow ${activeComponent === 'diet' ? 'text-green-200' : 'text-black'}`}
                            />
                        </button>

                        <button onClick={() => setActiveComponent('coach')}>
                            <FaChalkboardTeacher
                                className={`text-4xl shadow ${activeComponent === 'coach' ? 'text-green-200' : 'text-black'}`}
                            />
                        </button>
                    </div>

                    <div>
                        {activeComponent === 'trainning' && <Trainning plans={plans} />}
                        {activeComponent === 'diet' && <Diet diets={diets} />}
                        {activeComponent === 'coach' && <Coach coaches={coaches} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
