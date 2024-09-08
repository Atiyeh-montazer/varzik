
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode'
import { FreeMode , pagination } from 'swiper/modules';
import { RxArrowTopRight } from 'react-icons/rx';

function Sliderphoto({slides}){

    return(
        <>
<div className='flex items-center justify-center flex-col h-screen bg-[#6c34af]'>
    <Swiper breakpoints={{
        340: {slidesPerView :2,
            spaceBetween:15
            },
            700: {slidesPerView:3,
                spaceBetween:15
            }
    }}
    FreeMode={true}
    pagination={{
        clickable:true,
    }}
    modules={[FreeMode ,pagination]}
    className='max-w-[90%] lg:max-w-[80%]'
    >

        {
            images.map(()=>{
                <SwiperSlide key={item.id}>
<div className='flex flex-col gap-6 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[250px] lg:h-[400px]
lg:w-[350px]'>

</div>
</SwiperSlide>
            })
        }

    </Swiper>



</div>
        </>
    )
}

export default Sliderphoto