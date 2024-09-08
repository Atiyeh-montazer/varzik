"use client"
import Image from 'next/image'
import styles from './style.module.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { SlArrowDown } from "react-icons/sl";
import { useState } from 'react';
import Sliderphoto from '@/components/Sliderphoto'
function Mainpage() {

    const [isVisible, setIsVisible] = useState(true);  // حالت اولیه به صورت نمایان

    const toggleVisibility = () => {
        setIsVisible(!isVisible);  // تغییر حالت بین نمایش و مخفی
    };
    const images = [
        '/images/45562.jpg',
        '/images/slider1.jpg',
        '/images/slider2.jpg',
        '/images/slider3.jpg',
        // تصاویر بیشتر اضافه کنید
    ];

    return (

        <>

            <div className='flex flex-col justify-center items-center '>
<div className='absolute'>
 <div>
    
 </div>

</div>
                <div className='relative   W-full '>
                    <Image className={`${styles.bgBackGround}  `} src="/images/45562.jpg" height={500} width={1440} />




{/* start header */}
                    <div className=' absolute top-0 left-0 z-50 bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl h-16 w-full  text-center '>

                        <div className='text-2xl flex justify-end p-4'>
                            <GiHamburgerMenu onClick={toggleVisibility} className="cursor-pointer" />
                        </div>
{/* end header  */}


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

                    <Sliderphoto />
</div>


{/* start side bar */}
                        <div
                            className={`absolute right-0 top-0 w-[50%] h-screen flex flex-col justify-end bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-700 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                                }`}
                            style={{ transition: 'transform 0.9s ease-in-out, opacity 0.7s ease-in-out' }} >

 <SlArrowDown className="absolute top-3 right-4 cursor-pointer" onClick={toggleVisibility} />

    <div className='w-32 h-32 m-4 rounded-full  absolute top-0 right-7 bg-pink-300 '>
                            <Image />
                        </div>

                        <div className='absolute top-40 right-3  ml-16 '>

                            <div className='flex flex-col justify-between gap-5 '>
                                <input className='text-right rounded-l bg-purple-500 placeholder-gray-700' type="text" placeholder=' :نام' />
                                <input className='text-right rounded-l bg-pink-500 placeholder-gray-700' type="text" placeholder=' : نام خانوادگی' />
                                <input className='text-right rounded-l bg-purple-500 placeholder-gray-700' type="text" placeholder=' :نام مربی' />
                                <input className='text-right rounded-l bg-pink-500 placeholder-gray-700' type="text" placeholder=' : هدف' />
                                <input className='text-right rounded-l bg-purple-500 placeholder-gray-700' type="text" placeholder=': وزن' />
                                <input className='text-right rounded-l bg-pink-500 placeholder-gray-700' type="text" placeholder=':ماه تمرینی' />

                            </div>

                        </div>


                        </div>
{/* end sidbar */}
                       

                     
                    </div>
{/* en header */}



                </div>

            </div>

        </>
    )
}

export default Mainpage