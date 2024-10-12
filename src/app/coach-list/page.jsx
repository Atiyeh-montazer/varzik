'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use router for navigation
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/contexts/userContext'; // Import UserContext

function Coachlist() {
    const [coaches, setCoaches] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState('advanced'); // Default to 'advanced'
    const [searchQuery, setSearchQuery] = useState(''); // State for the search query
    const router = useRouter(); // Use Next.js router

    const { user, logout } = useContext(UserContext); // Get user from context

    useEffect(() => {
        // Check if user info exists in context
        if (!user) {
            // If no user info, redirect to login
            router.push('/login');
        } else {
            fetchCoaches(); // Fetch coaches on initial load if user exists
        }
    }, [user, router]); // Empty dependency to run once on mount

    // Fetch coaches based on selected level
    const fetchCoaches = async () => {
        const token = localStorage.getItem('jwtToken'); // You could get the token from context as well if stored
        try {
            const response = await axios.get(`https://api.varzik.ir/user/coach-plans-prices?level=${selectedLevel}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // If the response has valid plans, update the state
            if (response.status === 200 && response.data.plans) {
                setCoaches(response.data.plans);
            }
        } catch (err) {
            // Check for 404 status or any other errors
            if (err.response && err.response.status === 404) {
                console.error('No coaches found for the selected level');
                setCoaches([]); // Set empty array to show no results message
            } else {
                console.error('Failed to fetch coach plans:', err);
                setCoaches([]); // Still set an empty array to prevent crash
            }
        }
    };

    // Handle level selection change
    const handleLevelChange = (e) => {
        setSelectedLevel(e.target.value);
        fetchCoaches(); // Fetch coaches when the level is changed
    };

    // Filter coaches based on the search query
    const filteredCoaches = coaches.filter((coach) => 
        coach.coach_username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* Sticky Search form */}
            <form className="mt-7 sticky top-0 z-10">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>

                    <div className="flex">
                        {/* Search button */}
                        <Link href="/#">
                            <button className="text-white text-left absolute end-2.5 bottom-2.5 bg-pink-700 text-sm px-4 py-2 mr-3 border border-x-4 rounded-full">
                                جستجو
                            </button>
                        </Link>

                        {/* Search input */}
                        <input
                            type="search"
                            id="default-search"
                            className="block ml-4 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-500 focus:border-blue-500"
                            placeholder="....جستجوی مربی"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                        />
                    </div>
                </div>
            </form>

            {/* Dropdown for selecting level */}
            <div className="flex justify-center mt-4">
                <select
                    value={selectedLevel}
                    onChange={handleLevelChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-500 focus:border-blue-500 p-2.5"
                >
                    <option value="beginner">مبتدی</option>
                    <option value="intermediate">متوسط</option>
                    <option value="advanced">حرفه‌ای</option>
                </select>
            </div>

            {/* Display filtered coaches based on selected level and search query */}
            <div className="flex flex-wrap justify-center items-center gap-4">
                {filteredCoaches.length > 0 ? (
                    filteredCoaches.map((coach) => (
                        <div 
                            key={coach.coach_id} 
                            className="bg-[#c6d8d3] border border-gray-200 rounded-lg shadow mt-5 w-64 h-80" // Wider and taller card
                        >
                            <div className="flex flex-col items-center p-4">
                                {/* Placeholder image for coach */}
                                <img
                                    className="w-32 h-32 mb-3 rounded-full shadow-lg" // Increased image size
                                    src={`https://api.varzik.ir${coach.coach_profile_pic}`}
                                    alt="Coach Image"
                                />
                                {/* Coach details */}
                                <h5 className="mb-1 text-xl font-medium text-gray-900">{coach.coach_username}</h5>
                                <span className="text-sm text-gray-500">{coach.level}</span>
                                <span className="text-sm text-gray-500">قیمت: {parseInt(coach.price)} تومان</span>
                                <div className="flex mt-4">
                                    <button
                                        onClick={() => {
                                            alert('در حال آماده سازی برنامه تمرینی توسط مربی');
                                        }}
                                        className="hover:bg-pink-700 w-28 h-10 border border-x-4 rounded-full mr-1 flex justify-center items-center text-sm" // Wider button
                                    >
                                        دریافت برنامه
                                    </button>

                                    <Link href="/coachinfo">
                                        <button className="hover:bg-pink-700 w-32 h-10 border border-x-4 rounded-full flex justify-center items-center text-sm"> {/* Wider button */}
                                            اطلاعات بیشتر
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 mt-5">مربی‌ای برای این سطح پیدا نشد.</p>
                )}
            </div>

            {/* Back button */}
            <div className="flex justify-center mt-48">
                <Link href="/mainPage">
                    <button className="hover:bg-pink-700 mt-[6rem] w-32 h-11 border border-x-4 rounded-full flex justify-center items-center text-xl">
                        بازگشت
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Coachlist;
