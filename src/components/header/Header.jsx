import React from 'react'
import Image from 'next/image'
import styles from './header.module.css'
import { RxHamburgerMenu } from "react-icons/rx"
function Header() {
    return (
        <div className='flex flex-col justify-center items-center '>
            <div className='relative  justify-center  '>

                <div className=''>
                    <Image className={`${styles.bgBackGround} `} src="/images/45562.jpg" height={10} width={500} />
                </div>
                <div className='flex sticky  top-0 h-16  text-2xl   bg-pink-700 ' >
                    <div className='m-4 flex items-center '><RxHamburgerMenu /></div>





                </div>

            </div>

            <div className='w-[50%] absulote right-0 '>
                <div> <Image /></div>
                <div className='bg-pink-300 text-right'>
                    <h1>: نام</h1>
                    <h1>: نام خانوادگی</h1>

                </div>

            </div>


        </div >
    )
}

export default Header
