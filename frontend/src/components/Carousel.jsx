import React, { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const slides = [
  {
    title: "24/7 Emergency Care",
    desc: "Immediate support with highly trained staff and modern facilities.",
    img: "/carousel/healthcare.jpg",
  },
  {
    title: "Advanced Diagnostics",
    desc: "Get results fast with our state-of-the-art diagnostic tools.",
    img: "/carousel/diagnostics.jpg",
  },
  {
    title: "Experienced Doctors",
    desc: "Our team includes specialists across all major disciplines.",
    img: "/carousel/doctors.jpg",
  },
];

const Carousel = () => {
  const timer = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    duration: 1000,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Autoplay every 3 seconds
  useEffect(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
    return () => clearInterval(timer.current);
  }, [instanceRef]);

  return (
    <div className="w-full">
      <div ref={sliderRef} className="keen-slider rounded-xl shadow-lg overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="keen-slider__slide relative h-[300px] md:h-[400px]"
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-6 md:px-16 text-white">
              <h2 className="text-xl md:text-3xl font-semibold">{slide.title}</h2>
              <p className="text-sm md:text-lg mt-2 max-w-md">{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => instanceRef.current?.moveToIdx(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-blue-600 scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
