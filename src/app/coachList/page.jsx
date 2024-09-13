'use client';

import React from 'react'
import Link from 'next/link'
function Coachlist() {
    return (
        <div className=''>
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
                <Link href="/mainpage">
                    <button className='hover:bg-pink-700 mt-[6rem] w-32 h-11 border  border-x-4 rounded-full mr-5 flex justify-center items-center text-xl'>بازگشت</button>
                </Link>

            </div>
        </div>
    )
}

export default Coachlist
