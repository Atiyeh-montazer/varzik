// components/header/Header.js
"use client";

import { useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { UserContext } from '@/contexts/userContext'; // Import the UserContext

function Header() {
  const { user, login, logout } = useContext(UserContext); // Access user, login, logout from the context
  const pathName = usePathname();
  const { push } = useRouter();

  // Fetch the latest user info from the check-token API on mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('jwtToken');

      // If no token is available, redirect to login
      if (!token) {
        push('/login');
        return;
      }

      try {
        const response = await axios.get('https://api.varzik.ir/check-token', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If the API returns the user data successfully
        if (response.status === 200 && response.data.user) {
          const latestUserInfo = response.data.user;

          // Update the context and local storage with the latest user info
          login(latestUserInfo);
        } else {
          // Handle case when token is invalid
          push('/login');
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err);
        push('/login');
      }
    };

    fetchUserInfo();
  }, [push, login]);

  return (
    <div className='top-0 left-0 z-50 bg-[#331832] shadow-2xl w-full text-center py-1'>
      <div className='flex justify-between items-center'>
        {/* Profile Picture */}
        <div className='w-16 h-16 rounded-full ml-4 mx-4 bg-white overflow-hidden'>
          {user && (
            <Image
              src={`https://api.varzik.ir${user.profile_pic}`}
              alt="User Image"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Username and Weight */}
        <div className='text-white mr-10'>
          <h1>{user ? user.username : 'User'}</h1>
          <h2>وزن: {user ? user.workout_info.weight : '0'}</h2>
        </div>

        <div>
          {pathName !== '/login' && user && (
            <button
              className='hover:bg-gradient-to-r w-32 h-11 border focus:bg-pink-700 mt-4 text-white border-x-4 rounded-full mr-3 mb-3'
              onClick={logout}
            >
              خروج
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
