"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  rating: number; // e.g. 4.5
  price: number;
  oldPrice?: number | null; // e.g. 120
  discount?: string | null;
}

function ProductCards({ image, title, rating, price, oldPrice, discount }: ProductCardProps) {
  return (
    <div className="w-full max-w-68 p-2 sm:p-4 group cursor-pointer">
      {/* Product Image */}
      <div className="w-full h-40 sm:h-48 lg:h-56 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
        <Image
          src={image}
          width={300}
          height={300}
          alt={title}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Title */}
      <h3 className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-gray-900 transition-colors">
        {title}
      </h3>

      {/* Rating */}
      <div className="flex items-center mt-1 sm:mt-2">
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => {
            const fullStars = Math.floor(rating);
            const isHalf = i === fullStars && rating % 1 >= 0.5;

            return (
              <Star
                key={i}
                size={12}
                className="sm:w-4 sm:h-4"
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
        <span className="ml-1 text-xs text-gray-500">
          {rating.toFixed(1)}/5
        </span>

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

      {/* Price */}
      <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3">
        <p className="text-sm sm:text-lg font-bold text-gray-900">${price}</p>

        {oldPrice && (
          <p className="text-sm sm:text-lg text-gray-400 line-through">${oldPrice}</p>
        )}
        
        {discount && (
          <p className="text-xs sm:text-sm bg-[#FF3333]/10 rounded-full px-2 sm:px-3 text-[#FF3333] text-center py-1 font-medium">
            -{discount}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCards;
