"use client"


import { useState } from 'react';
import Link from 'next/link';
import { GoHomeFill } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import Trainning from "@/components/Trainning"
import Diet from "@/components/Diet"
import Coach from "@/components/Coach"

function Mainpage() {

    const [activeComponent, setactiveComponent] = useState('trainning');

    return (

        <>

            <div className='flex flex-col justify-center items-center '>

                <div className='relative   W-full '>
                    <div className='  '>

                        <div className=' w-32 h-32 rounded-full bg-white m-6'>
                        </div>

                        <div className='flex justify-center'>
                            <Link href='/ medicalfile'>
                              <button className='hover:bg-pink-700   w-32 h-11 border  border-x-4 rounded-full mr-12'>پرونده پزشکی</button>

                            </Link>
                          
                            <Link href='/info'>
                                <button className='hover:bg-pink-700   w-32 h-11 border  border-x-4 rounded-full ml-3 '>ویرایش</button>

                            </Link>

                        </div>


                        <div className=' flex justify-center text-4xl mt-8 m gap-16  '>

                            <button onClick={() => setactiveComponent('trainning')}>
                                <FaClipboardList className='hover:border-b-2   ' />
                            </button>


                            <button onClick={() => setactiveComponent('diet')}>
                                <BiSolidDish className='hover:border-b-2 
                              ' />
                            </button>


                            <button>
                                <FaChalkboardTeacher onClick={() => setactiveComponent('coach')} className='hover:border-b-2   ' />
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

export default Mainpage