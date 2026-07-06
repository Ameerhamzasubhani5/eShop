import React from "react";
import Image from "next/image";
import Link from "next/link";
const dressStyles = [
  {
    name: "Casual",
    image: "/images/casual.png"
  },
  {
    name: "Formal",
    image: "/images/formal.png"
  },
  {
    name: "Party",
    image: "/images/party.png"
  },
  {
    name: "Gym",
    image: "/images/gym.png"
  },
];
function index() {
  
  return (
    <div className=" flex flex-col justify-center items-center bg-gray-50 rounded-2xl p-10 max-w-4xl mx-auto shadow-sm space-y-8">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
      BROWSE BY DRESS STYLE
    </div>
    <div className="grid grid-cols-2 gap-4">
      {dressStyles.map((style) => (
        <Link
          key={style.name}
          href={`/products?search=${encodeURIComponent(style.name)}`}
          className="relative rounded-xl overflow-hidden group cursor-pointer"
        >
          <Image
            src={style.image}
            alt={style.name}
            width={400}
            height={192}
            className="w-full h-48  transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-3 left-4 text-white text-lg font-semibold drop-shadow-lg">
            {style.name}
          </div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
        </Link>
      ))}
    </div>
  </div>
  );
}

export default index;
