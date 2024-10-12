"use client";
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import Trainning from "@/components/Trainning";
import Diet from "@/components/Diet";
import Coach from "@/components/Coach";
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/contexts/userContext'; // Import UserContext

function User() {
    const { user } = useContext(UserContext); // Get user data from context
    const [activeComponent, setActiveComponent] = useState('trainning');
    const [plans, setPlans] = useState([]); 
    const [diets, setDiets] = useState([]); 
    const [coaches, setCoaches] = useState([]); 
    const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();

    // Check for user and redirect to login if not found
    useEffect(() => {
        if (!user) {
            router.replace('/login'); // Avoid multiple pushes to the history
        } else {
            setLoading(false); // Stop loading once user is confirmed
        }
    }, [user, router]);

    // Fetch data only if the user exists in context
    useEffect(() => {
        if (user) {
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
        }
    }, [activeComponent, user]);

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='relative W-full'>
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
