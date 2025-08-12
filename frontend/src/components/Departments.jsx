import React, { useEffect, useRef } from "react";
import departments from "../data/departments.json";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../lib/cloudinary";

const Departments = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;

    if (isMobile && scrollRef.current) {
      const container = scrollRef.current;
      let scrollAmount = container.scrollLeft;
      const scrollStep = 2; // pixels per step
      const intervalDelay = 20; // ms per step
      let direction = 1; // 1 = forward, -1 = reverse

      const interval = setInterval(() => {
        const maxScroll = container.scrollWidth - container.clientWidth;

        // Reverse direction if reaching either end
        if (scrollAmount >= maxScroll) {
          direction = -1;
        } else if (scrollAmount <= 0) {
          direction = 1;
        }

        scrollAmount += scrollStep * direction;
        container.scrollTo({ left: scrollAmount, behavior: "auto" });
      }, intervalDelay);

      return () => clearInterval(interval); // cleanup on unmount
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-10 text-gray-800" id="speciality">
      <h1 className="md:text-3xl text-xl font-medium">Find by Speciality</h1>
      <p className="text-center md:text-sm">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>
      <div
        ref={scrollRef}
        className="flex sm:justify-center gap-4 pt-5 w-full overflow-x-scroll scrollbar-hide"
      >
        {departments.map((item, index) => (
          <div
            className="flex flex-col items-center text-xs flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <AdvancedImage
              cldImg={cld.image(item.image)}
              className="w-16 sm:w-24 mb-2"
              alt={item.speciality || `item ${index + 1}`}
            />
            <p>{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
