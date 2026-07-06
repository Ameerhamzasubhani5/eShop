"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Check from "@/../public/images/check.png";

interface ReviewCardProps {
  customerName: string;
  comment: string; // e.g. 120
  rating: number; // e.g. 4.5
  className?: string;
}

function ReviewCard({
  customerName,
  rating,
  comment,
  className,
}: ReviewCardProps) {
  return (
    <div
      className={`w-full max-w-sm sm:max-w-md h-auto min-h-[200px] sm:min-h-[240px] p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 my-4 sm:my-6 lg:my-10 ${className}`}
    >
      {/* Rating */}
      <div className="flex items-center mt-1 sm:mt-2">
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => {
            const fullStars = Math.floor(rating);
            const isHalf = i === fullStars && rating % 1 >= 0.5;

            return (
              <Star
                key={i}
                size={16}
                className="sm:w-5 sm:h-5"
                fill={
                  i < fullStars
                    ? "#fbbf24" // full star
                    : isHalf
                    ? "url(#half-gradient)" // half star
                    : "none"
                }
                stroke={i <= fullStars || isHalf ? "#fbbf24" : "#d1d5db"}
              />
            );
          })}
        </div>

        {/* Gradient for half star fill */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="half-gradient">
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Customer Name and Verification */}
      <div className="flex items-center space-x-2 mt-3 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          {customerName}
        </h3>
        <Image
          src={Check}
          alt={"Verified Customer"}
          width={20}
          height={16}
          className="mt-1 sm:mt-2"
        />
      </div>

      {/* Comment */}
      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-4 sm:line-clamp-none">
        {comment}
      </p>
    </div>
  );
}

export default ReviewCard;
