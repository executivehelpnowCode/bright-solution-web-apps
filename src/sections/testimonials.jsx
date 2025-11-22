import { useRef, useLayoutEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import Testimonial from "../components/testimonial";
import { userTestimonials } from "../constants";

export default function Testimonials() {
  const SPEED = 40; // scroll speed in px/s
  const x = useMotionValue(0);

  const items = [...userTestimonials, ...userTestimonials];

  const containerRef = useRef(null);
  const [loopWidth, setLoopWidth] = useState(0);

  // Measure width dynamically on mount & resize
  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const total = containerRef.current.scrollWidth / 2;
        setLoopWidth(total);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Animate motion value frame-by-frame
  useAnimationFrame((t, delta) => {
    if (!loopWidth) return;

    const moveBy = (SPEED * delta) / 1000;
    let currentX = x.get();

    currentX -= moveBy;

    if (Math.abs(currentX) >= loopWidth) {
      currentX = 0;
    }

    x.set(currentX);
  });

  return (
    <div className="lg:px-56 py-12 overflow-hidden">
      <h2 className="text-3xl font-bold text-red-950 pb-6 text-center">
        Testimonials
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={containerRef}
          className="flex gap-4 sm:gap-6"
          style={{ x }}
        >
          {items.map((t, i) => (
            <div
              key={i}
              className="shrink-0 w-[180px] sm:w-[220px] md:w-[250px] lg:w-[300px]" // responsive widths
            >
              <Testimonial {...t} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
