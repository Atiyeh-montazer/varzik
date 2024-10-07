"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Goal() {
    const [selectedGoal, setSelectedGoal] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [isSubmitting, setIsSubmitting] = useState(false); // State to disable button while submitting
    const [loading, setLoading] = useState(true); // State for loading while fetching data

    const router = useRouter();

    // Fetch user data from the check-token API and set default values
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    router.push('/login'); // Redirect if no token
                    return;
                }

                // Fetch user data from the check-token API
                const response = await axios.get('http://localhost:3000/check-token', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const { workout_info } = response.data.user;

                // Set default values from workout_info (goal and level)
                if (workout_info) {
                    setSelectedGoal(workout_info.goal || '');
                    setSelectedLevel(workout_info.level || '');
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                router.push('/login'); // Redirect if fetch fails
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchData();
    }, [router]);

    const handleGoalClick = (goal) => {
        setSelectedGoal(goal);
    };

    const handleLevelClick = (level) => {
        setSelectedLevel(level);
    };

    const handleSaveClick = async () => {
        setIsSubmitting(true); // Disable the save button while submitting

        try {
            const token = localStorage.getItem('jwtToken');
            const userWorkoutInfo = JSON.parse(localStorage.getItem('userWorkoutInfo')) || {};

            // Extend workout info with goal and level
            const updatedInfo = { ...userWorkoutInfo, goal: selectedGoal, level: selectedLevel };
            localStorage.setItem('userWorkoutInfo', JSON.stringify(updatedInfo));

            // Send updated data to the backend
            await axios.put('http://localhost:3000/user/update-workout-info', updatedInfo, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Show success message
            setSuccessMessage('اطلاعات با موفقیت بروزرسانی شد.');

            // Wait for 2 seconds before redirecting
            setTimeout(() => {
                router.push("/user"); // Redirect to the user page
            }, 2000);
        } catch (err) {
            console.error('Failed to update workout info:', err);
        } finally {
            setIsSubmitting(false); // Enable the save button
        }
    };

    if (loading) {
        return <div>در حال بارگذاری...</div>; // Display loading message while fetching data
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            {successMessage && (
                <div className='mb-4 text-center text-green-500'>
                    {successMessage}
                </div>
            )}

            <div className='flex flex-col absolute top-20 right-18'>
                <div className='flex justify-center items-center mb-2 mt-6 text-2xl text-gray-800 font-bold vazir'>
                    <h1>هدف خود را انتخاب کنید</h1>
                </div>

                <div className='flex flex-col mb-6 justify-center items-center'>
                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-4 ${selectedGoal === 'کاهش وزن و تناسب اندام' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleGoalClick('کاهش وزن و تناسب اندام')}
                    >
                        کاهش وزن و تناسب اندام
                    </button>

                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-3 ${selectedGoal === 'عضله‌سازی و قدرت' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleGoalClick('عضله‌سازی و قدرت')}
                    >
                        عضله‌سازی و قدرت
                    </button>

                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-3 ${selectedGoal === 'فیتنس فانکشنال' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleGoalClick('فیتنس فانکشنال')}
                    >
                        فیتنس فانکشنال
                    </button>

                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-3 ${selectedGoal === 'بهبود عملکرد ورزشی' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleGoalClick('بهبود عملکرد ورزشی')}
                    >
                        بهبود عملکرد ورزشی
                    </button>
                </div>

                <div className='mb-6 mt-2 text-2xl text-gray-800 font-bold vazir'>
                    <h1>سطح ورزشی خود را انتخاب کنید</h1>
                </div>

                <div className='flex flex-col mb-6 justify-center items-center'>
                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-2 ${selectedLevel === 'مبتدی' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleLevelClick('مبتدی')}
                    >
                        مبتدی
                    </button>

                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-3 ${selectedLevel === 'متوسط' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleLevelClick('متوسط')}
                    >
                        متوسط
                    </button>

                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full ${selectedLevel === 'حرفه ای' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleLevelClick('حرفه ای')}
                    >
                        حرفه ای
                    </button>
                </div>

                <div className='mb-8 flex justify-center'>
                    <Link href="/info">
                        <button className='hover:bg-pink-700 mt-1 w-32 h-11 border border-x-4 rounded-full mr-5 flex justify-center items-center text-xl'>
                            بازگشت
                        </button>
                    </Link>

                    <button
                        className={`hover:bg-pink-700 mt-1 w-32 h-11 border border-x-4 rounded-full mr-5 flex justify-center items-center text-xl ${isSubmitting ? 'opacity-50' : ''}`}
                        onClick={handleSaveClick}
                        disabled={isSubmitting}
                    >
                        ذخیره
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Goal;
