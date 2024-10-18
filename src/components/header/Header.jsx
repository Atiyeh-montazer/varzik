"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/providers/auth_provider';

function Header() {
  const pathName = usePathname();
  const { push } = useRouter();
  const auth = useAuth()
  const [user, setUser] = useState(undefined)
  // Fetch the latest user info from the check-token API on mount
  useEffect(() => {
    if (auth.loading) return
    if (auth.user) setUser(auth.user)
  }, [auth]);

  // Logout function
  const handleLogout = () => {
    auth.logout()
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
              src="/images/main.svg" // Add your custom image path here
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
            {user.access != 0 ? undefined :
              <h2>وزن: {user.workout_info?.weight || '0'}</h2>}
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
