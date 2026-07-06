"use client";
// import { Navbar } from "@/components/Nav/page";
import HeroSection from "@/components/sections/heroSection/page"
import NewArrivalSection from "@/components/sections/newArrivalSection/page"
import TopSellingSection from '@/components/sections/topSellingSection/page'
import BrowseByStyle from "@/components/sections/categorySection/page"
import ReviewSection from '@/components/sections/reviewSection/page';
// import Footer from "@/components/footer/page";

export default function Home() {
  return (
      <main className="w-full max-w-7xl mx-auto min-h-screen">
        <HeroSection/>
        <NewArrivalSection/>
        <TopSellingSection/>
        <BrowseByStyle/>
        <ReviewSection/>
      </main>
  );
}
