import React from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const EmblaCarousel = (props) => {


  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className='m-4 text-right text-white text-4xl  drop-shadow-lg'>
           <h1>برترین ها</h1> 
      </div>
  
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">

          
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.id}>
              
              <Image src={slide.src} width={1000} height={50} className='rounded-xl mt-4 border border-slate-400' />
            </div>
          ))}
        </div>
      </div>

      <div className='m-4 mt-8 mb-2 text-right text-white text-4xl  drop-shadow-lg'>
           <h1>ویکی</h1> 
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.id}>
              <Image src={slide.src} width={1000} height={50} className='rounded-xl mt-6 border border-slate-400' />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

       <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>


      </div> */}
    </section>

  )
}

export default EmblaCarousel
