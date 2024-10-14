"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setUserFromStorage } from '@/redux/userSlice'; // Import the actions from Redux

function Header() {
  const user = useSelector((state) => state.user.userInfo); // Get user from Redux store
  const dispatch = useDispatch(); // Get dispatch to send actions
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

          // Dispatch login action to update Redux state
          dispatch(login(latestUserInfo));
        } else {
          // Handle case when token is invalid
          push('/login');
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err);
        push('/login');
      }
    };

    // Load user info from local storage on mount
    if (!user) {
      dispatch(setUserFromStorage());
    }

    // Fetch the latest user info from API
    if (!user) {
      fetchUserInfo();
    }
  }, [user, push, dispatch]);

  // Logout function
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to Redux
    push('/login'); // Redirect to login after logout
  };

  return (
    <div className='top-0 left-0 z-50 bg-[#331832] shadow-2xl w-full text-center py-1'>
      <div className='flex justify-between items-center'>
        {/* Profile Picture */}
        <div className='w-16 h-16 rounded-full ml-4 mx-4 bg-white overflow-hidden'>
          {user && user.profile_pic ? (
            <Image
              src={`https://api.varzik.ir${user.profile_pic}`}
              alt="User Image"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          ) : (
            <Image
              src="/images/default-profile.jpg" // Add your custom image path here
              alt="Default User Image"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Username and Weight */}
        {user ? (
          <div className='text-white mr-10'>
            <h1>{user.username}</h1>
            <h2>وزن: {user.workout_info?.weight || '0'}</h2>
          </div>
        ) : null}

        <div>
          {pathName !== '/login' && user && (
            <button
              className='hover:bg-gradient-to-r w-32 h-11 border focus:bg-pink-700 mt-4 text-white border-x-4 rounded-full mr-3 mb-3'
              onClick={handleLogout}
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
