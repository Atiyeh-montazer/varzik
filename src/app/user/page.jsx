"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import Trainning from "@/components/Trainning";
import Diet from "@/components/Diet";
import Coach from "@/components/Coach";
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use router for navigation

function User() {
    const [activeComponent, setActiveComponent] = useState('trainning');
    const [plans, setPlans] = useState([]); // State to store user plans
    const [diets, setDiets] = useState([]); // State to store user diets
    const [coaches, setCoaches] = useState([]); // State to store user coaches
    const [userInfo, setUserInfo] = useState(null); // State to store user info
    const router = useRouter(); // Use Next.js router

    useEffect(() => {
        // Check if user info exists in localStorage
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            // If no user info, redirect to login
            router.push('/login');
        }
    }, [router]); // Empty dependency to run once on mount

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwtToken');
            try {
                if (activeComponent === 'trainning') {
                    const response = await axios.get('https://api.varzik.ir/user/plans', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setPlans(response.data.plans);
                } else if (activeComponent === 'diet') {
                    const response = await axios.get('https://api.varzik.ir/user/diets', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setDiets(response.data.diets);
                } else if (activeComponent === 'coach') {
                    const response = await axios.get('https://api.varzik.ir/user/coaches', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setCoaches(response.data.coaches);
                }
            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };

        fetchData();
    }, [activeComponent, router]);

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='relative W-full'>
                <div className=''>
                    <div className='w-32 h-32 rounded-full bg-white m-6'>
                        <Image
                            src='/images/hadi-chopan.jpeg'
                            alt="User Image"
                            width={128}
                            height={128}
                        />
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

                    <div className='flex justify-center text-2xl mt-8 m gap-10'>
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
                        {activeComponent === 'trainning' && <Trainning plans={plans} />} {/* Pass plans to Trainning component */}
                        {activeComponent === 'diet' && <Diet diets={diets} />} {/* Pass diets to Diet component */}
                        {activeComponent === 'coach' && <Coach coaches={coaches} />} {/* Pass coaches to Coach component */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
