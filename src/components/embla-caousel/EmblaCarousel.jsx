import React from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const EmblaCarousel = ({ title, slides, options }) => {  // Destructure props here
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  console.log('Title in EmblaCarousel:', title)  // Check if the title is being logged

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
      {/* Title section */}
      <div className='m-4 mt-8 mb-2 text-right text-white text-4xl  drop-shadow-lg'>
        <h1>{title}</h1> {/* Use 'title' directly here */}
      </div>

      {/* Carousel */}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.id}>
              <Image src={slide.src} width={1000} height={50} className='rounded-xl mt-6 border border-slate-400' />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation (if needed) */}
      {/* 
      <div className="embla__controls">
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
      </div> 
      */}
    </section>
  )
}

export default EmblaCarousel
