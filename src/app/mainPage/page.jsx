"use client"
import React from 'react'
import EmblaCarousel from '@/components/embla-caousel/EmblaCarousel'
import '@/components/embla-caousel/assets/css/sandbox.css'
import '@/components/embla-caousel/assets/css/embla.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use router for navigation
import { useState, useEffect } from 'react';



const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


function Mainpage() {

    const router = useRouter(); // Use Next.js router
    useEffect(() => {
        // Check if user info exists in localStorage
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            // If no user info, redirect to login
            router.push('/login');
        }
    }, [router]); // Empty dependency to run once on mount

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };


    const slides1 = [
        { id: 1, src: '/images/hadi-chopan.jpeg' },
        { id: 2, src: '/images/hany-rambod.jpg' },
        { id: 3, src: '/images/hany-rambod.jpg' },
        { id: 1, src: '/images/hadi-chopan.jpeg' },
    ]

    return (
        <div>
            <EmblaCarousel slides={slides1} options={OPTIONS} />
            {/* <div className='flex flex-wrap justify-center items-center gap-4'>
                <div class=" bg-[#c6d8d3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5">

            <div class="flex justify-end py-8 px-28 ">

                    </div>

                    <div class="flex flex-col items-center ">


                        <h5 class="mb-1  text-xl font-medium text-gray-900 dark:text-white">برنامه تمرینی ماه جاری</h5>

                        <div class="flex py-4 mt-4 mb-2 md:mt-6">
                            <Link href="/plan">
                                <button className='hover:bg-pink-700 p-4 mt-1  w-18 h-8 border  border-x-4 rounded-full mr-0 flex justify-center items-center text-sm'>اطلاعات بیشتر</button>
                            </Link>
                        </div>
                    </div>

                </div>

            </div> */}

        </div>
    )
}

export default Mainpage