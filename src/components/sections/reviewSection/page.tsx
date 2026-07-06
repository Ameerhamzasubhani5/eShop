"use client";
import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselPrevious,
  // CarouselNext,
} from "@/components/ui/carousel";
import ReviewCard from "@/components/products/cards/reviewCard";
import {testimonials} from "@/types/index"


function Page() {
  const plugin = useRef(
    Autoplay({ delay: 10000, stopOnInteraction: false }) // 10s autoplay
  );

  return (
    <div className="w-full flex flex-col justify-center items-center max-w-6xl mx-auto py-8 sm:py-10 lg:py-12 mb-16 sm:mb-24 lg:mb-32 space-y-6 sm:space-y-8 lg:space-y-10 px-4 sm:px-8 lg:px-0">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 text-center">
        OUR HAPPY CUSTOMERS
      </h2>
      
      <Carousel 
        plugins={[plugin.current]} 
        className="w-full max-w-5xl"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <div className="w-full max-w-sm sm:max-w-md">
                <ReviewCard
                  comment={item.text}
                  customerName={item.name}
                  rating={item.rating}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        {/* <div className="hidden sm:flex">
          <CarouselPrevious className="relative translate-y-0 translate-x-0 left-4 top-0" />
          <CarouselNext className="relative translate-y-0 translate-x-0 right-4 top-0" />
        </div> */}
      </Carousel>
    </div>
  );
}

export default Page;
