"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../libs/utils";
import { Lens } from "./Lens";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
  const [cardHover, setCardHover] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10", className)}>
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="relative group block p-2 h-full w-full"
          animate={{
            opacity: hoveredIndex === null || hoveredIndex === idx ? 1 : 0.6,
            filter: hoveredIndex === null || hoveredIndex === idx ? "blur(0px)" : "blur(2px)",
          }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }} />
            )}
          </AnimatePresence>
          <Lens
            hovering={cardHover === idx}
            setHovering={(hover) => setCardHover(hover ? idx : null)}
            zoomFactor={1.3}
            lensSize={200}
          >
            <Card 
              image={item.image} 
              isHovered={hoveredIndex === idx}
            >
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </Lens>
        </motion.div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  image,
  isHovered
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}>
      <div className="relative z-50">
        {image && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
            <img
              src={image}
              alt="Card image"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        )}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children
}) => {
  return (
    (<h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>)
  );
};
export const CardDescription = ({
  className,
  children
}) => {
  return (
    (<p
      className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>)
  );
};
