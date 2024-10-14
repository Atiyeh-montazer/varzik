"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkoutInfo, setUserFromStorage } from '@/redux/userSlice'; // Import your Redux action

function Goal() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo); // Get the user from Redux store
    const [selectedGoal, setSelectedGoal] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const router = useRouter();
    const [isFirstRender, setIsFirstRender] = useState(true); 

    useEffect(() => {
        // Load user info from localStorage into Redux store on page load
        if (!user) {
            router.push('/login');
        } else if (isFirstRender) {
            if (user.workout_info) {
                console.log("cechking user info", user);
                const workoutInfo = user.workout_info;
                // Initialize goal and level only if they exist
                setSelectedGoal(workoutInfo.goal || '');
                setSelectedLevel(workoutInfo.level || '');
                setLoading(false); // Set loading to false after data is initialized
            }
            setIsFirstRender(false); 
        }
    }, [user, router, isFirstRender]);

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
                username: user.username, // Update username
                workout_info: {
                  weight: user.workout_info.weight,
                  height: user.workout_info.height,
                  age: user.workout_info.age,
                  sex: user.workout_info.sex,
                  goal: selectedGoal,
                  level: selectedLevel
                },
              };

            // Update username if it has changed
            if (user.username) {
                console.log("userInfo", updatedInfo);
                await axios.post('https://api.varzik.ir/user/update-username', { username: user.username }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            
            // Update backend with the new workout info
            await axios.put('https://api.varzik.ir/user/update-workout-info', updatedInfo.workout_info, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Dispatch the action to update Redux store and update localStorage
            try {
                dispatch(updateWorkoutInfo(updatedInfo));
            } catch (err) {
            console.error('Dispatching updateWorkoutInfo failed:', err);
            }

            localStorage.setItem('userWorkoutInfo', JSON.stringify(updatedInfo.workout_info));

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

    // If loading is still true, show a loading message
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
