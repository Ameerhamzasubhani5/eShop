import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import email from "@/../public/images/email.png";
import fb from "@/../public/images/fb.png";
import x from "@/../public/images/x.png";
import insta from "@/../public/images/insta.png";
import visa from "@/../public/images/visa.png";
import masterCard from "@/../public/images/masterCard.png";
import paypal from "@/../public/images/paypal.png";
import applePay from "@/../public/images/applePay.png";
import googlePay from "@/../public/images/googlePay.png";

function index() {
  return (
    <footer className="relative flex justify-center bg-[#F0F0F0] space-y-7 text-gray-700 min-h-[400px] sm:min-h-[499px]">
      {/* Newsletter Section */}
      <div className="absolute w-[90%] max-w-6xl h-auto sm:h-[200px]  rounded-2xl sm:rounded-4xl bg-black text-white px-6 sm:px-8 lg:px-12 py-8 sm:py-10 flex flex-col lg:flex-row justify-between items-center -top-12 sm:-top-16 lg:-top-24 space-y-6 lg:space-y-0">
        {/* Newsletter Section */}
        <div className="w-full bg-black text-white space-x-2 sm:space-x-4 py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm sm:text-4xl font-bold text-center sm:text-left">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </div>

          <div className="flex flex-row sm:flex-col items-center gap-3 w-full sm:w-auto max-w-sm">
            <div className="relative flex-1">
              <Image
                src={email}
                alt="email"
                width={16}
                height={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-9 pr-3 py-2 rounded-full text-black bg-white text-xs sm:text-sm focus:outline-none"
              />
            </div>
            <button className="bg-white text-black px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex-col space-y-8 sm:space-y-12 lg:space-y-16 p-4 sm:p-6 lg:p-12">
        {/* Main Footer */}
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 pt-32 sm:pt-36 lg:pt-40 flex flex-col sm:flex-row justify-between gap-8 lg:gap-12">
          {/* Logo & Info */}
          <div className="max-w-[248px] text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">SHOP.CO</h3>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              We have clothes that suit your style and which you are proud to
              wear. From women to men.
            </p>
            <div className="flex gap-3 mt-4 justify-center sm:justify-start">
              <Image
                src={x}
                width={20}
                height={20}
                alt="x"
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <Image
                src={fb}
                width={20}
                height={20}
                alt="fb"
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <Image
                src={insta}
                width={20}
                height={20}
                alt="insta"
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {/* Company */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">
                COMPANY
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Career
                  </a>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">HELP</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Customer Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Delivery Details
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">FAQ</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Manage Deliveries
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Payments
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">
                RESOURCES
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Free eBooks
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Development Tutorial
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    How to - Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    YouTube Playlist
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-gray-300 py-4 sm:py-6 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto space-y-4 sm:space-y-0">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex gap-2 sm:gap-1 flex-wrap justify-center">
            <Image
              src={visa}
              width={40}
              height={50}
              alt="visa"
              className="h-8 w-auto"
            />
            <Image
              src={masterCard}
              width={50}
              height={50}
              alt="masterCard"
              className="h-8 w-auto"
            />
            <Image
              src={paypal}
              width={50}
              height={50}
              alt="paypal"
              className="h-8 w-auto"
            />
            <Image
              src={applePay}
              width={50}
              height={50}
              alt="applePay"
              className="h-8 w-auto"
            />
            <Image
              src={googlePay}
              width={50}
              height={50}
              alt="googlePay"
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default index;
