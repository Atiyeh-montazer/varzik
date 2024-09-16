"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import Trainning from "@/components/Trainning"
import Diet from "@/components/Diet"
import Coach from "@/components/Coach"
import Image from 'next/image';
import { usePathname } from 'next/navigation'

function User() {
    const pathname = usePathname()

    const [activeComponent, setactiveComponent] = useState('trainning');

    return (

        <>

            <div className='flex flex-col justify-center items-center '>

                <div className='relative   W-full '>
                    <div className='  '>

                        <div className=' w-32 h-32 rounded-full bg-white m-6'>
                            <Image srce='/images/hadi-chopan.jpg' />
                        </div>

                        <div className='flex justify-center'>
                            <Link href='/medicalfile'>
                                <button className='hover:bg-pink-700   w-32 h-11 border  border-x-4 rounded-full mr-12'>پرونده پزشکی</button>

                            </Link>

                            <Link href='/info'>
                                <button className='hover:bg-pink-700   w-32 h-11 border  border-x-4 rounded-full ml-3 '>ویرایش</button>

                            </Link>

                        </div>


                        <div className=' flex justify-center text-2xl mt-8 m gap-10  '>

                            <button onClick={() => setactiveComponent('trainning')}>
                                <FaClipboardList   className={`
                            ${activeComponent == 'trainning' ? 'text-green-200' : 'text-black'} 
                            text-4xl shadow `}/>
                            </button>


                            <button onClick={() => setactiveComponent('diet')}>
                                <BiSolidDish 
                                className={`
                            ${activeComponent == 'diet' ? 'text-green-200' : 'text-black'} 
                            text-4xl shadow `} />
                            </button>


                            <button>
                                <FaChalkboardTeacher onClick={() => setactiveComponent('coach')}   
                                 className={`
                            ${activeComponent == 'coach'  ? 'text-green-200' : 'text-black'} 
                            text-4xl shadow `} />
                            </button>

                        </div>

                        <div>

                            {activeComponent === 'trainning' && <Trainning />}
                            {activeComponent === 'coach' && <Coach />}
                            {activeComponent === 'diet' && <Diet />}

                        </div>

                    </div>

                </div>

            </div >

        </>
    )
}

export default User