"use client"
import { useState } from 'react';
import React from 'react'
import EmblaCarousel from '@/components/embla-caousel/EmblaCarousel'
import '@/components/embla-caousel/assets/css/base.css'
import '@/components/embla-caousel/assets/css/sandbox.css'
import '@/components/embla-caousel/assets/css/embla.css'




const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


function Mainpage() {

    const [isVisible, setIsVisible] = useState(false);  // حالت اولیه به صورت نمایان

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
        <div>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
    )
}

export default Mainpage