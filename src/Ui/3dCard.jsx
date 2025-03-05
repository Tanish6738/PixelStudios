import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../libs/utils";
import { GlowingEffect } from "./GlowingEffect";

export const CardContainer = ({
  children,
  title,
  content,
  className,
  containerClassName
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const rect = e.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: y * 10, y: x * 10 });
  };

  return (
    <div
      className={cn("relative group/pin z-50", containerClassName)}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}>
      <motion.div
        animate={rotation}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-100/10 to-neutral-400/10 dark:from-neutral-700/10 dark:to-neutral-900/10 rounded-3xl blur-2xl" />
        <div className="relative bg-white/80 dark:bg-black/80 rounded-3xl p-8 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className={cn("relative space-y-8", className)}>
            {title && (
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400">
                {title}
              </h3>
            )}
            <div className="space-y-6">
              {typeof children === 'string' ? (
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base">
                  {children}
                </p>
              ) : children}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const CardPerspective = ({ title, content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 right-0 pointer-events-none">
      <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 max-w-xs mx-auto shadow-xl">
        <h4 className="text-white font-semibold mb-2">{title}</h4>
        <p className="text-neutral-300 text-sm">{content}</p>
      </div>
    </motion.div>
  );
};

// Add this helper component for image grids
export const CardImageGrid = ({ images }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
        />
      ))}
    </div>
  );
};
