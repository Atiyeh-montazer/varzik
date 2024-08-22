import React from 'react'
import { MdOutlineWoman2 } from "react-icons/md";
import { IoManSharp } from "react-icons/io5";
import Image from 'next/image';
import styles from './style.module.css'

function Info() {
    return (
        <div className=' ' >

            <div className='relative '>
                <Image className={`${styles.bgBackGround}   `} src="/images/images (1) .jpg " width={100} height={100} />
            </div>


            <div className='absolute top-0 left-8'>

                <div className='flex  justify-center '>
                    <h1 className='vazir m-10'>اطلاعات خود را وارد کنید</h1>
                </div>

                <div className='flex  justify-center'>
                    <button className='w-32 h-11 border rounded-full mr-10 mb-10'>
                        <MdOutlineWoman2 className='text-[30px] ml-[45px] ' />
                    </button>

                    <button className='w-32 h-11 border rounded-full'>
                        <IoManSharp className='text-[27px] ml-[47px]' />
                    </button>
                </div>

                <div className='flex flex-col text-right m '>
                    <label >سن خود را وارد کنید</label>
                    <input type="number" />
                    <label > قد خود را وارد کنید</label>
                    <input type="number" />
                    <label > وزن خود را وارد کنید</label>
                    <input type="number" />

                </div>
            </div>

        </div>
    )
}

export default Info
