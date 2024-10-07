"use client"
import EmblaCarousel from '@/components/embla-caousel/EmblaCarousel'
import '@/components/embla-caousel/assets/css/sandbox.css'
import './embla.css'




const OPTIONS = { loop: true, axis: 'y' }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
const slide_title = "ویکی"
const slides1 = [
    { id: 1, src: '/images/hadi-chopan.jpeg' },
    { id: 2, src: '/images/hany-rambod.jpg' },
]

function Plan() {
    return (
        

        <div>


            <EmblaCarousel title="ویکی" slides={slides1} options={OPTIONS} />
        </div>
    )
}

export default Plan
