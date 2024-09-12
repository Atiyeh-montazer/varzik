"use client"
import EmblaCarousel from '@/components/embla-caousel/EmblaCarousel'
// import '@/components/embla-caousel/assets/css/sandbox.css'
import './embla.css'




const OPTIONS = { loop: true, axis: 'y' }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const slides1 = [
    { id: 1, src: '/images/hadi-chopan.jpeg' },
    { id: 2, src: '/images/hany-rambod.jpg' },
    { id: 3, src: '/images/hany-rambod.jpg' },
    { id: 1, src: '/images/hadi-chopan.jpeg' },
]

function Plan() {
    return (
        <div>
            <EmblaCarousel slides={slides1} options={OPTIONS} />

            {/* <div className='flex justify-center mt-[422px] '>
                <Link href="/user">
                    <button className='hover:bg-pink-700 mt-[6rem] w-32 h-11 border  border-x-4 rounded-full mr-5 flex justify-center items-center text-xl'>بازگشت</button>
                </Link>

            </div> */}
        </div>
    )
}

export default Plan
