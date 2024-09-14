"use client"
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
function Header() {


    const pathName = usePathname();


    return (
        <div className='top-0 left-0 z-50 bg-[#331832] shadow-2xl w-full  text-center py-1 '>

            <div className='flex  justify-between items-center'>
                <div className='bg-white w-16 h-16 rounded-full ml-4 mx-4'>
                </div>


                <div className='text-white mr-10'>

                    <h1>عرفان  مقدم</h1>
                    <h2> وزن:
                        68</h2>
                </div>
                <div >

                    {
                        pathName == '/login'
                            ?
                            ""
                            :
                            <Link href="/login">
                                <button className='hover:bg-gradient-to-r   w-32 h-11 border  focus:bg-pink-700  mt-4 text-white  border-x-4 rounded-full mr-3 mb-3'>خروج</button>
                            </Link>
                    }






                </div>
            </div>

        </div>
    )
}

export default Header
