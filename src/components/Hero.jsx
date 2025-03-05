import React from "react";
import { SparklesCore } from "../Ui/Sparkles";
import { TypewriterEffectSmooth } from "../Ui/Type-Writer";
import { TextGenerateEffect } from "../Ui/TextGenerate";

export function SparklesPreview() {
  const words = [
    {
      text: "Where",
    },
    {
      text: "Design",
    },
    {
      text: "Meets",
    },
    {
      text: "Innovation",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source
          src="/Videos/river.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" style={{ zIndex: 1 }}></div>
      <div className="relative h-full w-full bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md px-4" style={{ zIndex: 2 }}>
        <TextGenerateEffect
          words="PixelCraft Studios"
          className="md:text-8xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20 mb-8 tracking-tight"
        />
        <div className="w-full h-20 relative">
          <div className="absolute inset-x-5 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-[90%] md:w-1/2 blur-sm" />
          <div className="absolute inset-x-5 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-[95%] md:w-3/4" />
          <div className="absolute inset-x-10 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-[85%] md:w-3/4 blur-sm" />
          <div className="absolute inset-x-10 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-[90%] md:w-3/4" />
        </div>
        
      </div>
    </div>
  );
}

export default SparklesPreview;
