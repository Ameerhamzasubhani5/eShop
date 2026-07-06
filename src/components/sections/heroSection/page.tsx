import React from "react";
import Link from "next/link";
import Button from "@/components/customButton";
import Image from "next/image";
import star from "@/../public/images/star.png";
import versace from "@/../public/images/versace.png";
import Ck from "@/../public/images/Ck.png";
import GU from "@/../public/images/gucci.png";
import Za from "@/../public/images/zara.png";
import Pra from "@/../public/images/prada.png";

function index() {
  return (
    <div className="flex-col">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row w-full min-h-125 lg:min-h-165.75 justify-between items-center relative bg-image-home px-4 sm:px-8 lg:px-30 py-8 lg:py-0">
        {/* Left Content */}
        <div className="flex-col w-full lg:w-1/2 space-y-4 lg:space-y-6 text-center lg:text-left">
          {/* Explicit dark text: the hero photo background stays light in both themes */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </div>
          <div className="flex-col space-y-4 lg:space-y-6">
            <div className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </div>
            <div className="flex justify-center lg:justify-start">
              <Link href="/products">
                <Button className="w-48 lg:w-52 text-sm lg:text-base">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 py-6 lg:py-8">
            {/* Block 1 */}
            <div className="flex-col text-center lg:text-start space-y-1">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                200+
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                International Brands
              </p>
            </div>

            <div className="hidden sm:block w-px h-12 bg-gray-300" />

            {/* Block 2 */}
            <div className="flex-col text-center lg:text-start space-y-1">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                2,000+
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                High-Quality Products
              </p>
            </div>

            <div className="hidden sm:block w-px h-12 bg-gray-300" />

            {/* Block 3 */}
            <div className="flex-col text-center lg:text-start space-y-1">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                30,000+
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        {/* Right Content - Star Image */}
        <div className="flex w-full lg:w-1/2 justify-center lg:justify-end p-4 lg:p-20 relative">
          <Image
            src={star}
            alt="star"
            className="absolute top-15 left-20 w-12 h-12 sm:w-16 sm:h-16 lg:w-14 lg:h-14 animate-pulse"
          />

        </div>
      </div>

      {/* Brand Banner */}
      <div className="bg-black py-4 sm:py-6">
        <div className="flex flex-wrap justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-16 text-white px-4 sm:px-8 lg:px-15">
          <Image
            src={versace}
            alt="versace"
            className="h-8 sm:h-10 lg:h-12 w-24 sm:w-32 lg:w-44 object-contain"
          />
          <Image
            src={Za}
            alt="ZARA"
            className="h-8 sm:h-10 lg:h-12 w-24 sm:w-32 lg:w-44 object-contain"
          />
          <Image
            src={GU}
            alt="GUCCI"
            className="h-8 sm:h-10 lg:h-12 w-24 sm:w-32 lg:w-44 object-contain"
          />
          <Image
            src={Pra}
            alt="prada"
            className="h-8 sm:h-10 lg:h-12 w-24 sm:w-32 lg:w-44 object-contain"
          />
          <Image
            src={Ck}
            alt="Calvin Klein"
            className="h-8 sm:h-10 lg:h-12 w-24 sm:w-32 lg:w-44 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default index;
