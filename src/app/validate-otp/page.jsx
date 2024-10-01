"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

function Validateotp() {
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [error, setError] = useState('');
    const searchParams = useSearchParams();

    const phone = searchParams.get('phone') ?? "0";
    const email = searchParams.get('email') ?? "";

    // Validate the OTP code and send it to the server
    const validateCode = async () => {
        if (!code1 || !code2 || !code3 || !code4) {
            setError('وارد کردن کد الزامی است!');
            return;
        }

        let finalCode = code1 + code2 + code3 + code4;
        console.log(finalCode);

        try {
            let resp = await axios.post('http://192.168.0.158:3000/validate-otp', { finalCode, phone });
            console.log(resp);
        }
        catch (error) {
            setError('ورود با خطا مواجه شد: ' + error);
        }
    };

    // Helper function to handle input change
    const handleInputChange = (e, setCode, nextFieldId) => {
        const { value } = e.target;

        // If the input has a value, set it and move focus
        if (value.length === 1) {
            setCode(value);
            if (nextFieldId) {
                document.getElementById(nextFieldId).focus();  // Focus on the next input
            }
        }

        // If this is the last input, validate the OTP after setting the value
        if (!nextFieldId && value.length === 1) {
            setCode(value);  // Make sure to set the final input
            validateCode();   // Trigger validation after the last input
        }
    };

    const resendOtp = async () => {
        // Implement OTP resend logic
    };

    // State for countdown
    const [countdown, setCountdown] = useState(120);

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
            document.getElementById('resendBtn').disabled = false;
            clearInterval(timer);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <div className='flex flex-col'>
                <div className='flex h-full items-center justify-center '>
                    <input
                        id="code1"
                        className='w-12 h-12 bg-white rounded-sm text-center outline-none hover:border-2 border-[#331832] ml-5'
                        type="text"
                        value={code1}
                        onChange={(e) => handleInputChange(e, setCode1, 'code2')}
                        maxLength="1"
                    />
                    <input
                        id="code2"
                        className='w-12 h-12 bg-white rounded-sm text-center outline-none hover:border-2 border-[#331832] ml-5'
                        type="text"
                        value={code2}
                        onChange={(e) => handleInputChange(e, setCode2, 'code3')}
                        maxLength="1"
                    />
                    <input
                        id="code3"
                        className='w-12 h-12 bg-white rounded-sm text-center outline-none hover:border-2 border-[#331832] ml-5'
                        type="text"
                        value={code3}
                        onChange={(e) => handleInputChange(e, setCode3, 'code4')}
                        maxLength="1"
                    />
                    <input
                        id="code4"
                        className='w-12 h-12 bg-white rounded-sm text-center outline-none hover:border-2 border-[#331832] ml-5'
                        type="text"
                        value={code4}
                        onChange={(e) => handleInputChange(e, setCode4, null)}  // No next field
                        maxLength="1"
                    />
                </div>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className={`flex my-10 ${countdown === 0 ? 'hidden' : ""}`}>
                {/* Render countdown */}
                <p className='text-white' id="timer">ثانیه {countdown}</p>
            </div>

            <div className={`w-full text-center ${countdown !== 0 ? 'hidden' : ""}`}>
                <button
                    className='hover:bg-gradient-to-r  w-36 h-11 border  focus:bg-pink-700  mt-4 text-white  border-x-4 rounded-full mb-3'
                    id="resendBtn"
                    disabled
                    onClick={resendOtp}
                >
                    <span>درخواست مجدد کد</span>
                </button>
            </div>
        </div>
    );
}

export default Validateotp;
