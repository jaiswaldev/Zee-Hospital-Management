import React, { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { cld } from "../lib/cloudinary";

const Carousel = ({ slides }) => {
  const timer = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    duration: 1000,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Enhanced autoplay with pause/resume functionality
  useEffect(() => {
    if (isPaused) return;

    clearInterval(timer.current);
    timer.current = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);

    return () => clearInterval(timer.current);
  }, [instanceRef, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    clearInterval(timer.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const goToSlide = (index) => {
    instanceRef.current?.moveToIdx(index);
  };

  const goToPrevious = () => {
    instanceRef.current?.prev();
  };

  const goToNext = () => {
    instanceRef.current?.next();
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-500 text-lg">No slides available</p>
      </div>
    );
  }

  return (
    <div 
      className="w-full group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Carousel Container */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl">
        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="keen-slider__slide relative  overflow-hidden"
            >
              
              <AdvancedImage
                cldImg={cld
                  .image(slide.img)
                  .resize(fill().width(1200).height(400))
                }
                className="w-full h-full object-cover"
                alt={slide.title || `Slide ${index + 1}`}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12 lg:px-16">
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                    {slide.title}
                  </h2>
                  {slide.desc && (
                    <p className="text-sm md:text-lg lg:text-xl text-gray-200 leading-relaxed drop-shadow-md max-w-lg">
                      {slide.desc}
                    </p>
                  )}
                </div>
              </div>

              {/* Slide Number Indicator */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {index + 1} / {slides.length}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Enhanced Pagination Dots */}
      {slides.length > 1 && (
        <div className="flex justify-center items-center mt-6 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-full ${
                currentSlide === index
                  ? "w-8 h-3 bg-blue-600 rounded-full"
                  : "w-3 h-3 bg-gray-400 hover:bg-gray-500 rounded-full"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Active slide progress indicator */}
              {currentSlide === index && !isPaused && (
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Pause Indicator */}
      {isPaused && (
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
          Paused
        </div>
      )}
    </div>
  );
};

export default Carousel;