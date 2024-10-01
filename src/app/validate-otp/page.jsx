"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

function Validateotp() {
    const [otp, setOtp] = useState(['', '', '', '']); // Initialize OTP with 4 values
    const [error, setError] = useState('');
    const searchParams = useSearchParams();

    // UseEffect to automatically trigger validation when the OTP array is fully filled
    useEffect(() => {
        if (otp.every((value) => value !== '')) {
            validateCode(); // Trigger validation only when all fields are filled
        }
    }, [otp]); // Depend on changes to the otp array

    const phone = searchParams.get('phone') ?? "0";
    const email = searchParams.get('email') ?? "";

    // Validate the OTP code and send it to the server
    const validateCode = async () => {
        console.log(otp)
        if (otp.some((value) => value === '')) {
            setError('وارد کردن کد الزامی است!');
            return;
        }

        let finalCode = otp.join(''); // Concatenate the OTP values

        try {
            let resp = await axios.post('http://localhost:3000/validate-otp', { otp: finalCode, phone });
            console.log(resp.data.token);
        }
        catch (error) {
            setError('ورود با خطا مواجه شد: ' + error);
        }
    };

    // Helper function to handle input change and manage the next focus
    const handleInputChange = (e, index) => {
        const value = e.target.value;

        // Only accept numeric input
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp]; // Copy the existing otp array
            newOtp[index] = value; // Update the specific index with the new value
            setOtp(newOtp); // Update the state

            // Automatically focus the next input field (unless it's the last one)
            if (value !== '' && index < otp.length - 1) {
                document.getElementById(`code${index + 2}`).focus();
            }
            
        }
    };

    const resendOtp = async () => {
        // Implement OTP resend logic here
    };

    // State for countdown
    const [countdown, setCountdown] = useState(120);

    useEffect(() => {
        // Start the countdown timer when the component is mounted
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        // Cleanup the timer when the component is unmounted
        return () => clearInterval(timer);
    }, []);

    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <div className='flex flex-col'>
                <div className='flex h-full items-center justify-center'>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`code${index + 1}`}
                            className='w-12 h-12 bg-white rounded-sm text-center outline-none hover:border-2 border-[#331832] ml-5'
                            type="text"
                            value={digit}
                            onChange={(e) => handleInputChange(e, index)}
                            maxLength="1"
                        />
                    ))}
                </div>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className={`flex my-10 ${countdown === 0 ? 'hidden' : ""}`}>
                <p className='text-white' id="timer">ثانیه {countdown}</p>
            </div>

            <div className={`w-full text-center ${countdown !== 0 ? 'hidden' : ""}`}>
                <button
                    className='hover:bg-gradient-to-r w-36 h-11 border focus:bg-pink-700 mt-4 text-white border-x-4 rounded-full mb-3'
                    id="resendBtn"
                    disabled={countdown !== 0}
                    onClick={resendOtp}
                >
                    <span>درخواست مجدد کد</span>
                </button>
            </div>
        </div>
    );
}

export default Validateotp;
