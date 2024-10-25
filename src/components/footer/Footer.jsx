"use client"
import Link from "next/link"
import { MdDashboard } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaChalkboardTeacher } from "react-icons/fa";
import { usePathname } from 'next/navigation'
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "@/providers/auth_provider";
import { useEffect, useState } from "react";

import { CgProfile } from "react-icons/cg";
import { GoGoal } from "react-icons/go";
import { IoMdList } from "react-icons/io";

function Footer() {
    const pathname = usePathname()
    const auth = useAuth()
    const [user, setUser] = useState(undefined)
    useEffect(() => {
        if (auth.loading) return
        console.log(auth)
        if (auth.user) setUser(auth.user)
    }, [auth])
    useEffect(() => {
        console.log(user)
    }, [user])
    if (!user) return undefined
    return (
        <div className='bottom-0 left-0 z-50 bg-[#331832] shadow-2xl w-full  text-center '>
            <div className='flex justify-center gap-24 mt-4 items-center text-center   '>

                {user.access == 0 ? pathname == '/edit' ?
                    <Link href="/goal">
                        <button >
                            <GoGoal className={`
                            ${pathname == "/goal" ? 'text-green-200' : 'text-white'} 
                            text-4xl shadow hover:shadow-pink-100`} />
                        </button>
                    </Link >
                    :
                    <Link href={user.access == 0 ? `/user` : "/coach-prof"}>
                        <CgProfile className={`
                            ${pathname == "/user" ? 'text-green-200' : 'text-white'} 
                            text-4xl shadow hover:shadow-pink-100`} />
                    </Link >
                    :
                    undefined
                }


                <Link href="/mainPage">
                    <button>
                        <GoHomeFill className={`
                            ${pathname == "/mainpage" ? 'text-green-200' : 'text-white'} 
                            text-4xl shadow hover:shadow-pink-100`} />
                    </button>
                </Link>

                <Link href="/coach-list">
                    <button >
                        <IoMdList className={`
                            ${pathname == "/coach-list" ? 'text-green-200' : 'text-white'} 
                            text-4xl shadow hover:shadow-pink-100`} />
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default Footer
