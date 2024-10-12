"use client";
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/contexts/userContext';

function Goal() {
    const { user, login } = useContext(UserContext);
    const [selectedGoal, setSelectedGoal] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            // If user doesn't exist in context, redirect to login
            router.push('/login');
        } else {
            // Check for user workout_info in context or fall back to localStorage
            const workoutInfo = user?.workout_info || JSON.parse(localStorage.getItem('userWorkoutInfo')) || {};
            setSelectedGoal(workoutInfo.goal || '');
            setSelectedLevel(workoutInfo.level || '');
            setLoading(false);
        }
    }, [user, router]);

    const handleGoalClick = (goal) => {
        setSelectedGoal(goal);
    };

    const handleLevelClick = (level) => {
        setSelectedLevel(level);
    };

    const handleSaveClick = async () => {
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('jwtToken');
            const updatedInfo = {
                ...user.workout_info, // Merge existing workout_info
                goal: selectedGoal,
                level: selectedLevel,
            };

            // Update backend with the new workout info
            await axios.put('https://api.varzik.ir/user/update-workout-info', updatedInfo, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update the context and localStorage
            login({
                ...user,
                workout_info: updatedInfo,
            });
            localStorage.setItem('userWorkoutInfo', JSON.stringify(updatedInfo));

            setSuccessMessage('اطلاعات با موفقیت بروزرسانی شد.');
            setTimeout(() => {
                router.push("/user");
            }, 2000);
        } catch (err) {
            console.error('Failed to update workout info:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div>در حال بارگذاری...</div>;
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
