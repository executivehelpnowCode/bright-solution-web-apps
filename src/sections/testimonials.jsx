import { useRef, useLayoutEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import Testimonial from "../components/testimonial";
import { useTestimonials } from "../useTestimonials";

export default function Testimonials() {
  const SPEED = 40;
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [loopWidth, setLoopWidth] = useState(0);
  // State added to control the animation playback
  const [isPaused, setIsPaused] = useState(false); 

  // 1. Fetch data (Hook placed at the top)
  const testimonials = useTestimonials();

  // 2. Prepare items for infinite loop (handle null/empty state)
  // const items = testimonials ? [...testimonials, ...testimonials] : [];
  const items = testimonials || [];

  // 3. Measure container width for the loop (Hook placed at the top)
  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        // Loop width is half the total scroll width
        setLoopWidth(containerRef.current.scrollWidth / 2);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  // 4. Animation loop (Hook placed at the top)
  useAnimationFrame((_, delta) => {
    // Check: stop if paused or if loopWidth hasn't been calculated yet
    if (!loopWidth || isPaused) return; 

    const moveBy = (SPEED * delta) / 1000;
    let currentX = x.get() - moveBy;

    // Reset position when one full set of testimonials has scrolled past
    if (Math.abs(currentX) >= loopWidth) {
      currentX = 0;
    }

    x.set(currentX);
  });

  // --- CONDITIONAL RENDERS (Placed after all Hooks) ---

  // ✅ loading state
  if (testimonials === null) {
    return (
      <div className="lg:px-56 py-12 text-center">
        <p>Loading testimonials...</p>
      </div>
    );
  }

  // ✅ finished loading but no approved testimonials
  if (!testimonials.length) {
    return (
      <div className="lg:px-56 py-12 text-center">
        <p>No testimonials available.</p>
      </div>
    );
  }

  return (
    <div className="lg:px-56 py-12 overflow-hidden">
      <h2 className="text-3xl font-bold text-red-950 pb-6 text-center">
        Testimonials
      </h2>

      <div 
        className="relative w-full overflow-hidden"
        // Pause the animation when the user hovers over the container
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          ref={containerRef}
          className="flex gap-4 sm:gap-6"
          style={{ x }}
        >
          {items.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="shrink-0 w-[180px] sm:w-[220px] md:w-[250px] lg:w-[300px]"
            >
              <Testimonial {...t} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}