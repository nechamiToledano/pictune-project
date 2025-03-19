"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/70 z-10"></div>
        <img
          src="/bg.png" // Replace with your actual image path
          alt="Background"
          className="w-full h-full object-cover brightness-110 contrast-125 shadow-2xl backdrop-brightness-125"
        />
      </div>

      <div className="container mx-auto px-4 z-10 pt-10 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Transform Your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-400">
                Music
                </span>{" "}
                Into{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-400">
                  Images
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Pictune uses advanced AI to create unique soundscapes from your images. Experience the harmony of visual
                art and sound in a whole new way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white border-0 h-12 px-8 text-lg">
                  Get Started Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 h-12 px-8 text-lg">
                  See How It Works
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
