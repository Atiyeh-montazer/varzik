"use client"
import Image from 'next/image'
import { GiHamburgerMenu } from "react-icons/gi";
import { SlArrowDown } from "react-icons/sl";
import { useState } from 'react';
import Sliderphoto from '@/components/Sliderphoto'
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

    // const [isVisible, setIsVisible] = useState(false);  // حالت اولیه به صورت نمایان

    // const toggleVisibility = () => {
    //     setIsVisible(!isVisible);  // تغییر حالت بین نمایش و مخفی
    // };
    // const images = [
    //     '/images/45562.jpg',
    //     '/images/slider1.jpg',
    //     '/images/slider2.jpg',
    //     '/images/slider3.jpg',
    //     // تصاویر بیشتر اضافه کنید
    // ];

    const [activeComponent, setactiveComponent] = useState('trainning');


    return (

        <>

            <div className='flex flex-col justify-center items-center '>
                <div className='absolute'>
                    <div>

                    </div>

                </div>
                <div className='relative   W-full '>
                    <Image className="" src="/images/45562.jpg" height={500} width={1440} />




                    {/* start header */}
                    <div className=' absolute top-0 left-0 z-50 bg-[#331832] shadow-2xl h-20 w-full  text-center '>

                        <div className='flex  justify-between items-center'>
                            <div className='bg-white w-16 h-16 rounded-full ml-4 mt-2'>
                            </div>


                            <div className='text-white mr-10'>

                                <h1>عرفان  مقدم</h1>
                                <h2> وزن:
                                    68</h2>
                            </div>




                            <div >
                                <Link href="/login">
                                    <button className='hover:bg-gradient-to-r   w-32 h-11 border  focus:bg-pink-700  mt-4 text-white  border-x-4 rounded-full mr-3 mb-3'>خروج</button>
                                </Link>
                            </div>


                        </div>


                        {/* 
                        <div className='text-2xl flex justify-end p-4'>
                            <GiHamburgerMenu onClick={toggleVisibility} className="cursor-pointer text-white" />
                        </div> */}





                        {/* start slid  */}

                        <div>
                            {/* <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <Image className={`${styles.bgBackGround}`} src={image} height={500} width={1440} alt={`slide-${index}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper> */}


                        </div>



                        {/* start side bar */}
                        {/* <div
                            className={`absolute right-0 top-0 w-[50%] h-screen flex flex-col justify-end bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-700 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                                }`}
                            style={{ transition: 'transform 0.9s ease-in-out, opacity 0.7s ease-in-out' }} >

                            <SlArrowDown className="absolute top-3 right-4 cursor-pointer" onClick={toggleVisibility} />

                            <div className='w-32 h-32 m-4 rounded-full  absolute top-0 right-7 bg-pink-300 '>
                                <Image />
                            </div>

                            <div className='absolute top-40 right-3  ml-18 '>

                                <div className='flex flex-col justify-between gap-5 '>
                                    <input className='text-right rounded-l bg-purple-500 placeholder-gray-700' type="text" placeholder=' :نام' />
                                    <input className='text-right rounded-l bg-pink-500 placeholder-gray-700' type="text" placeholder=' : نام خانوادگی' />
                                    <input className='text-right rounded-l bg-purple-500 placeholder-gray-700' type="text" placeholder=' :نام مربی' />
                                    <input className='text-right rounded-l bg-pink-500 placeholder-gray-700' type="text" placeholder=' : هدف' />
                                    <input className='text-right rounded-l bg-purple-500 placeholder-gray-700' type="text" placeholder=': وزن' />
                                    <input className='text-right rounded-l bg-pink-500 placeholder-gray-700' type="text" placeholder=':ماه تمرینی' />

                                </div>

                            </div>


                        </div> */}
                        {/* end sidbar */}

                        {/* start Article  */}
                        <div>


                            <div className=' w-32 h-32 rounded-full bg-white m-10'>
                            </div>

                            <div className=''>
                                <button className='hover:bg-pink-700   w-32 h-11 border  border-x-4 rounded-full mr-12'>پرونده پزشکی</button>
                                <button className='hover:bg-pink-700   w-32 h-11 border  border-x-4 rounded-full ml-3 '>ویرایش</button>
                            </div>
                            {/* start menu  */}

                            <div className=' flex text-4xl mt-8 ml-20 gap-16  '>

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

                            {/* end menu  */}
                        </div>







                        {/* end Article  */}
                    </div>
                    {/* en header */}


                    {/* start footer  */}
                    <div className=' absolute bottom-0 left-0 z-50 bg-[#331832] shadow-2xl h-16 w-full  text-center '>
                        <div className='flex justify-center gap-24 mt-4 items-center text-center   '>

                            <Link href="/goal">
                                <button >
                                    <MdDashboard className='text-white text-4xl' />
                                </button>
                            </Link >

                            <Link href="/goal">
                                <button>
                                    <GoHomeFill className='text-white text-4xl' />
                                </button>
                            </Link>

                            <Link href="/goal">
                                <button>
                                    <FaChalkboardTeacher className='text-white text-4xl' />
                                </button>
                            </Link>

                        </div>

                    </div>
                    {/* end footer  */}

                </div>




            </div>

        </>
    )
}

export default Mainpage