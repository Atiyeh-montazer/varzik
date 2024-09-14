"use client"
import Link from "next/link"
import { MdDashboard } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaChalkboardTeacher } from "react-icons/fa";
import { usePathname } from 'next/navigation'
import { FaRegEdit } from "react-icons/fa";

function Footer() {
    const pathname = usePathname()

    return (
        <div className='bottom-0 left-0 z-50 bg-[#331832] shadow-2xl w-full  text-center '>
            <div className='flex justify-center gap-24 mt-4 items-center text-center   '>

                {
                    pathname == '/edit'
                        ?
                        <Link href="/goal">
                            <button >
                                <FaRegEdit className='text-white text-4xl' />
                            </button>
                        </Link >
                        :
                        <Link href="/user">
                            <button >
                                <MdDashboard className='text-white text-4xl shadow hover:shadow-pink-100' />
                            </button>
                        </Link >
                }


                <Link href="/mainPage">
                    <button>
                        <GoHomeFill className='text-white text-4xl shadow hover:shadow-pink-100' />
                    </button>
                </Link>

                <Link href="/coach-list">
                    <button >
                        <FaChalkboardTeacher className='text-white text-4xl shadow hover:shadow-pink-100' />
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default Footer
