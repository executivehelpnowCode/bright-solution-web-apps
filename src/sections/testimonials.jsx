import React from "react";
import Testimonial from "../components/testimonial";
import { userTestimonials } from "../ constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  return (
    <div className="lg:px-56 py-12">
      <h2 className="text-3xl font-bold text-red-950 pb-6">Testimonials</h2>

      <div className="relative flex items-center gap-14">
        <div className="">
          <ChevronLeft
            size={48}
            className={`transition-all duration-500 cursor-pointer text-red-950`}
          />
        </div>
        <div className="flex gap-4">
          {userTestimonials?.map((testimonial) => {
            return (
              <Testimonial
                key={testimonial.id}
                name={testimonial.name}
                rating={testimonial.rating}
                avatar={testimonial.avatar}
                message={testimonial.message}
              />
            );
          })}
        </div>
        <div>
          <ChevronRight
            size={48}
            className={`transition-all duration-500 cursor-pointer text-red-950`}
          />
        </div>
      </div>
    </div>
  );
}
