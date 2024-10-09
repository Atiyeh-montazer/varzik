"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use router for navigation

function Validateotp() {
    const [otp, setOtp] = useState(['', '', '', '']); // Initialize OTP with 4 values
    const [error, setError] = useState('');
    const searchParams = useSearchParams();
    const [token, setToken] = useState(null);

    const phone = searchParams.get('phone') ?? "0";
    const email = searchParams.get('email') ?? "";

    const router = useRouter(); // Use Next.js router

    useEffect(() => {
        // Check if user info exists in localStorage
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            // If no user info, redirect to login
            router.push('/user');
        }
    }, [router]); // Empty dependency to run once on mount

    // UseEffect to automatically trigger validation when the OTP array is fully filled
    useEffect(() => {
        if (otp.every((value) => value !== '')) {
            validateCode(); // Trigger validation only when all fields are filled
        }
    }, [otp]); // Depend on changes to the otp array

    // Validate the OTP code and send it to the server
    const validateCode = async () => {
        if (otp.some((value) => value === '')) {
            setError('وارد کردن کد الزامی است!');
            return;
        }

        // [3, 4, 5, 6]
        // 3456
        let finalCode = otp.join(''); // Concatenate the OTP values

        try {
            let resp = await axios.post('https://api.varzik.ir/validate-otp', { otp: finalCode, phone: phone });
            const token = resp.data.token;
            localStorage.setItem('jwtToken', token); // Store the token in local storage

            // Call the check-token API to get user info
            checkToken(token);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(`ورود با خطا مواجه شد: ${error.response.data.message}`);
              } else {
                  setError('ورود با خطا مواجه شد: ' + error.message);
              }
        }
    };

    // Call the check-token API to get user information
    const checkToken = async (jwtToken) => {
        try {
            let userInfoResp = await axios.get('https://api.varzik.ir/check-token', {
                headers: {
                    Authorization: `Bearer ${jwtToken}` // Send the token in headers
                }
            });

            const userInfo = userInfoResp.data.user;
            console.log('User Info:', userInfo);

            // Store the user info in localStorage
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            // redirect to user page
            router.push("/user");


        } catch (err) {
            setError('Failed to fetch user info: ' + err);
        }
    };

    // Helper function to handle input change and manage the next focus
    const handleInputChange = (e, index) => {
        const value = e.target.value;


        console.log("index>>", index);
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
        try {
            setError(''); // Remove any existing error when resend button is clicked
            let resp = await axios.post('https://api.varzik.ir/login', { email, phone });
            console.log(resp);

            // Reset OTP fields
            setOtp(['', '', '', '']);
            
            // Reset countdown and hide the button again
            setCountdown(120);
            setShowResendButton(false); // Hide the resend button after click
        } catch (error) {
            setError('ارسال مجدد کد با خطا مواجه شد ' + error);
        }
    };

    // State for countdown and button visibility
    const [countdown, setCountdown] = useState(120);
    const [showResendButton, setShowResendButton] = useState(false);

    useEffect(() => {
        // Start the countdown timer when the component is mounted
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    setShowResendButton(true); // Show the resend button when countdown reaches 0
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        // Cleanup the timer when the component is unmounted
        return () => clearInterval(timer);
    }, [countdown]);

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

            {/* Show resend button only when countdown is zero */}
            {showResendButton && (
                <div className={`w-full text-center`}>
                    <button
                        className='hover:bg-gradient-to-r w-36 h-11 border focus:bg-pink-700 mt-4 text-white border-x-4 rounded-full mb-3'
                        id="resendBtn"
                        onClick={resendOtp}
                    >
                        <span>درخواست مجدد کد</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Validateotp;
