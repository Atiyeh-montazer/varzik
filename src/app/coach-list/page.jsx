'use client';
import Link from 'next/link'
import { useRouter } from 'next/navigation'; // Use router for navigation
import { useState, useEffect } from 'react';

function Coachlist() {

    const router = useRouter(); // Use Next.js router
    useEffect(() => {
        // Check if user info exists in localStorage
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            // If no user info, redirect to login
            router.push('/login');
        }
    }, [router]); // Empty dependency to run once on mount

    return (
        <div >
            <form class=" mt-7">
                {/* <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">جستجو</label> */}
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex  items-center ps-3 pointer-events-none">
                        <svg class=" text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>

                 <div className=' '>
                        <div>
                            <Link href="/#">
                                <button className=' text-white text-left absolute end-2.5 bottom-2.5 bg-pink-700 text-sm px-4 py-2  mr-3 border  border-x-4 rounded-full '>جستجو</button>
                            </Link>

                        </div>
                        <input type="search" id="default-search" class="block ml-4 w-[93%] p-4 ps-40 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="....جستجوی مربی" required />

                    </div>

                    {/* <button type="submit" class="text-white text-left absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">جستجو</button> */}




                </div>
            </form>


            <div className='flex flex-wrap justify-center items-center gap-4'>
                <div class=" bg-[#c6d8d3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5">

                    <div class="flex justify-end px-4 pt-4 ">

                    </div>
                    <div class="flex flex-col items-center ">
                        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/hadi-chopan.jpeg" />
                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">عرفان عارفی</h5>
                        <span class="text-sm text-gray-500 dark:text-gray-400">پرورش اندام </span>
                        <div class="flex mt-4 mb-2 md:mt-6">

                            <button onClick={() => { alert("در حال آماده سازی برنامه تمرینی توسط مربی"); }} className='hover:bg-pink-700  mt-1  w-18 h-8 border  border-x-4 rounded-full mr-1 flex justify-center items-center text-sm' >دریافت برنامه</button>

                            <Link href="/coachinfo">
                                <button className='hover:bg-pink-700  mt-1  w-18 h-8 border  border-x-4 rounded-full mr-0 flex justify-center items-center text-sm'>اطلاعات بیشتر</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div class=" bg-[#c6d8d3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  mt-5">




                    <div class="flex justify-end px-4 pt-4 ">

                    </div>



                    <div class="flex flex-col items-center ">
                        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/hadi-chopan.jpeg" />
                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">عرفان عارفی</h5>
                        <span class="text-sm text-gray-500 dark:text-gray-400">پرورش اندام </span>
                        <div class="flex mt-4 mb-2 md:mt-6">

                            <button onClick={() => { alert("در حال آماده سازی برنامه تمرینی توسط مربی"); }} className='hover:bg-pink-700  mt-1  w-18 h-8 border  border-x-4 rounded-full mr-1 flex justify-center items-center text-sm' >دریافت برنامه</button>

                            <Link href="/coachinfo">
                                <button className='hover:bg-pink-700  mt-1  w-18 h-8 border  border-x-4 rounded-full mr-0 flex justify-center items-center text-sm'>اطلاعات بیشتر</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center mt-48 '>
                <Link href="/mainPage">
                    <button className='hover:bg-pink-700 mt-[6rem] w-32 h-11 border  border-x-4 rounded-full mr-5 flex justify-center items-center text-xl'>بازگشت</button>
                </Link>

            </div>
        </div>
    )
}

export default Coachlist
