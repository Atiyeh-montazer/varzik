"use client";

import React, { useState, useEffect } from 'react';

function Validateotp() {
    // State for countdown
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        // Start the countdown timer when the component is mounted
        const timer = setInterval(updateTimer, 1000);

        // Cleanup the timer when the component is unmounted
        return () => clearInterval(timer);
    }, [countdown]);

    // Update timer every second
    function updateTimer() {
        if (countdown > 0) {
            setCountdown((prevCountdown) => prevCountdown - 1);
        } else {
            // Enable the resend button when countdown is over
            document.getElementById('resendBtn').disabled = false;
            clearInterval(timer); // Stop the timer
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <div className='flex flex-col'>
                <div className='flex h-full items-center justify-center '>
                    <input className='w-12 h-12 bg-white rounded-sm text-center outline-none hover:border-2 border-[#331832] ml-5' type="text" maxlength="1" />
                    <input className='w-12 h-12 bg-white rounded-sm text-center outline-none hover:border-2 border-[#331832] ml-5' type="text" maxlength="1" />
                    <input className='w-12 h-12 bg-white rounded-sm text-center outline-none hover:border-2 border-[#331832] ml-5' type="text" maxlength="1" />
                    <input className='w-12 h-12 bg-white rounded-sm text-center outline-none hover:border-2 border-[#331832] ml-5' type="text" maxlength="1" />



                </div>
            </div>

            <div className={`flex my-10 ${countdown == 0 ? 'hidden' : ""} `}>
                {/* Render countdown */}

                <p className='text-white' id="timer">ثانیه {countdown}</p>

                {/* Resend button */}

            </div>

            <div className={`w-full text-center ${countdown != 0 ? 'hidden' : ""} `}>
                <button
                    className='hover:bg-gradient-to-r  w-36 h-11 border  focus:bg-pink-700  mt-4 text-white  border-x-4 rounded-full mb-3'
                    id="resendBtn"
                    disabled>
                    <span className=''>درخواست مجدد کد</span>
                </button>
            </div>


        </div>
    );
}

export default Validateotp;