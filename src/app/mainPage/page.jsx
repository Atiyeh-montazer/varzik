"use client"
import { useState } from 'react';
import React from 'react'
import EmblaCarousel from '@/components/embla-caousel/EmblaCarousel'
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


    const slides1 = [
        { id: 1, src: '/images/hadi-chopan.jpeg' },
        { id: 2, src: '/images/hany-rambod.jpg' },
        { id: 3, src: '/images/hany-rambod.jpg' },
        { id: 1, src: '/images/hadi-chopan.jpeg' },
    ]

    return (
        <div>
            <EmblaCarousel slides={slides1} options={OPTIONS} />
        </div>
    )
}

export default Mainpage