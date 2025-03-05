import { useState, useEffect } from "react";

const darkenColor = (hex, percent) => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const Folder = ({
  color = "#00d8ff",
  size = 1,
  items = [],
  className = "",
  title = "Documents",
  folderTexture = null, // New prop for folder background image
  cardTextures = [], // New prop for card background images
  cardStyles = [] // New prop for custom card styling
}) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1); // Add this state for carousel
  const [isClosing, setIsClosing] = useState(false); // Add new state for animation

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor("#ffffff", 0.1);
  const paper2 = darkenColor("#ffffff", 0.05);
  const paper3 = "#ffffff";

  // Preload images when component mounts
  useEffect(() => {
    const imagesToLoad = [folderTexture, ...cardTextures].filter(Boolean);
    
    if (imagesToLoad.length === 0) {
      setImagesLoaded(true);
      return;
    }
    
    let loadedCount = 0;
    
    imagesToLoad.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, [folderTexture, cardTextures]);

  useEffect(() => {
    if (fullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [fullScreen]);

  // Add window resize listener to handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      // Force re-render on resize to update responsive layouts
      setOpen(open);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  const handleClick = () => {
    if (!open) {
      setOpen(true);
      setTimeout(() => {
        setFullScreen(true);
      }, 300);
    } else {
      setIsClosing(true);
      setFullScreen(false);
      // Reset active index first
      setActiveIndex(1);
      
      // Sequence the closing animations
      setTimeout(() => {
        setOpen(false);
        setIsClosing(false);
      }, 400);
      
      // Reset offsets last
      setTimeout(() => {
        setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
      }, 500);
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open || fullScreen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e, index) => {
    if (fullScreen) return;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const handleCardClick = (e, index) => {
    e.stopPropagation();
    if (fullScreen) {
      setActiveIndex(index);
    }
  };

  const folderStyle = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
  };

  // Outer scale style
  const scaleStyle = fullScreen 
    ? { transform: 'none' } 
    : { transform: `scale(${size})` };

  const getOpenTransform = (index) => {
    if (fullScreen) {
      const isMobile = window.innerWidth < 640;
      const centerIndex = activeIndex;
      const diff = index - centerIndex;
      
      if (isMobile) {
        if (diff === 0) {
          return "translate(-50%, -50%) scale(0.95)";
        } else if (diff === -1) {
          return "translate(-140%, -50%) scale(0.75) rotateY(25deg)";
        } else if (diff === 1) {
          return "translate(40%, -50%) scale(0.75) rotateY(-25deg)";
        } else {
          return diff < 0 
            ? "translate(-180%, -50%) scale(0.6) rotateY(35deg)"
            : "translate(80%, -50%) scale(0.6) rotateY(-35deg)";
        }
      } else {
        if (diff === 0) {
          return "translate(-50%, -50%) scale(1.1)";
        } else if (diff === -1) {
          return "translate(-120%, -50%) scale(0.85) rotateY(25deg)";
        } else if (diff === 1) {
          return "translate(20%, -50%) scale(0.85) rotateY(-25deg)";
        } else if (diff < -1) {
          return "translate(-160%, -50%) scale(0.7) rotateY(35deg)";
        } else {
          return "translate(60%, -50%) scale(0.7) rotateY(-35deg)";
        }
      }
    } else {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        if (index === 0) return "translate(-90%, -40%) rotate(-15deg)";
        if (index === 1) return "translate(-10%, -40%) rotate(15deg)";
        if (index === 2) return "translate(-50%, -60%) rotate(5deg)";
      } else {
        if (index === 0) return "translate(-120%, -50%) rotate(-15deg)";
        if (index === 1) return "translate(10%, -50%) rotate(15deg)";
        if (index === 2) return "translate(-50%, -70%) rotate(5deg)";
      }
    }
    return "";
  };

  // Add responsive sizing for the folder
  const getFolderSize = () => {
    if (fullScreen) {
      return {
        width: window.innerWidth < 640 ? '95vw' : '90vw',
        height: window.innerWidth < 640 ? '70vh' : '65vh',
        maxWidth: '1200px',
        padding: window.innerWidth < 640 ? '0.5rem' : '2rem'
      };
    }
    return {
      width: window.innerWidth < 640 ? '80px' : '120px',
      height: window.innerWidth < 640 ? '64px' : '96px'
    };
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div 
      style={{
        ...scaleStyle,
        ...(fullScreen && {
          padding: window.innerWidth < 640 ? '1rem' : '2rem'
        })
      }} 
      className={`${className} ${
        fullScreen 
          ? 'fixed inset-0 flex items-center justify-center z-50 bg-black transition-all duration-300 ease-in-out'
          : ''
      } ${fullScreen ? 'bg-opacity-70' : 'bg-opacity-0'}`}
    >
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer ${!open ? "hover:-translate-y-2" : ""} ${fullScreen ? 'w-full h-full max-w-6xl mx-auto flex items-center justify-center' : ''}`}
        style={{
          ...folderStyle,
          transform: open && !fullScreen ? "translateY(-8px)" : undefined,
        }}
        onClick={handleClick}
      >
        {/* Paper label when closed */}
        {!open && (
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap shadow-md border border-gray-100 font-medium z-10">
            {title}
          </div>
        )}
        
        <div
          className={`relative rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] transition-all duration-300 ${fullScreen ? 'w-full h-[80vh] max-w-6xl' : 'w-[100px] h-[80px]'} overflow-hidden`}
          style={{ 
            backgroundColor: folderBackColor,
            backgroundImage: folderTexture ? `url(${folderTexture})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            ...getFolderSize()
          }}
        >
          <span
            className={`absolute z-0 bottom-[98%] left-0 rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0 transition-all duration-300 ${fullScreen ? 'w-[100px] h-[20px]' : 'w-[40px] h-[15px]'} overflow-hidden`}
            style={{ 
              backgroundColor: folderBackColor,
              backgroundImage: folderTexture ? `url(${folderTexture})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></span>
          
          {/* Folder shine effect */}
          {!open && (
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-transparent opacity-10 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"></div>
          )}
          
          {/* Render papers/cards */}
          {papers.map((item, i) => {
            let sizeClasses = "";
            
            if (fullScreen) {
              sizeClasses = "w-[30%] h-[70%]";
            } else {
              // Better sizing for closed state
              if (i === 0) sizeClasses = open ? "w-[70%] h-[80%]" : "w-[60%] h-[70%]";
              if (i === 1) sizeClasses = open ? "w-[80%] h-[80%]" : "w-[70%] h-[60%]";
              if (i === 2) sizeClasses = open ? "w-[90%] h-[80%]" : "w-[80%] h-[50%]";
            }

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            // Create a staggered effect for closed folder
            const closedOffset = i * 3;
            
            // Get custom card styles if available
            const customCardStyle = cardStyles[i] || {};
            
            // Get background texture for this card
            const cardTexture = cardTextures[i];
            
            return (
              <div
                key={i}
                onClick={(e) => handleCardClick(e, i)}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 transition-all duration-300 ease-in-out ${
                  fullScreen 
                    ? 'left-1/2 top-1/2 cursor-pointer'
                    : `bottom-[15%] left-1/2 ${!open 
                      ? `transform -translate-x-1/2 translate-y-[${5 + closedOffset}%] group-hover:translate-y-[${closedOffset}%]`
                      : "hover:scale-105"}`
                } ${sizeClasses} overflow-hidden`}
                style={{
                  ...(!open ? { transform: `translateY(${closedOffset}px)` } : { transform: transformStyle }),
                  backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                  backgroundImage: cardTexture ? `url(${cardTexture})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: "16px",
                  boxShadow: fullScreen 
                    ? activeIndex === i
                      ? "0 25px 60px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.1)"
                      : "0 15px 35px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.1)"
                    : open 
                      ? "0 5px 15px rgba(0,0,0,0.15), 0 1px 5px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.1)"
                      : "0 1px 3px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                  transition: `all ${isClosing ? '0.3s' : '0.4s'} cubic-bezier(0.4, 0, 0.2, 1)`,
                  filter: fullScreen && i !== activeIndex ? "brightness(0.7) saturate(0.8)" : "brightness(1)",
                  opacity: fullScreen && Math.abs(i - activeIndex) > 2 ? 0 : 1,
                  pointerEvents: isClosing ? 'none' : 'auto',
                  ...customCardStyle,
                }}
              >
                <div className={`w-full h-full ${open ? 'scale-100' : 'scale-95'} transition-transform duration-300`}>
                  {!open ? (
                    // Preview content
                    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden p-2 bg-gradient-to-br from-white/90 to-white/50">
                      <div className="w-[85%] h-1 bg-gray-200/50 rounded-full mb-2"></div>
                      <div className="w-[60%] h-1 bg-gray-200/50 rounded-full"></div>
                    </div>
                  ) : (
                    // Expanded content
                    <div className="relative w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md">
                      {item}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Add carousel controls */}
          {fullScreen && !isClosing && (
            <>
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 bg-white/80 rounded-full p-2 sm:p-3 shadow-lg hover:bg-white transition-all ${
                  activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex === items.length - 1}
                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 bg-white/80 rounded-full p-2 sm:p-3 shadow-lg hover:bg-white transition-all ${
                  activeIndex === items.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Pagination indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === idx ? 'bg-blue-600 w-4' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Folder front face with improved hover effect */}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? "group-hover:[transform:skew(15deg)_scaleY(0.6)]" : ""
            } ${fullScreen ? "opacity-10" : ""} overflow-hidden`}
            style={{
              backgroundColor: color,
              backgroundImage: folderTexture ? `url(${folderTexture})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: "5px 10px 10px 10px",
              ...(open && !fullScreen && { transform: "skew(15deg) scaleY(0.6)" }),
              ...(fullScreen && { transform: "skew(15deg) scaleY(0.3)" }),
            }}
          >
            {/* Folder pattern */}
            {!open && (
              <div className="absolute inset-0 opacity-5">
                <div className="absolute left-1/2 top-1/2 w-[20px] h-[20px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"></div>
                {/* Add some additional patterns */}
                <div className="absolute left-[20%] top-[30%] w-[8px] h-[8px] rounded-full border border-white"></div>
                <div className="absolute left-[75%] top-[60%] w-[8px] h-[8px] rounded-full border border-white"></div>
              </div>
            )}
          </div>
          
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? "group-hover:[transform:skew(-15deg)_scaleY(0.6)]" : ""
            } ${fullScreen ? "opacity-10" : ""} overflow-hidden`}
            style={{
              backgroundColor: color,
              backgroundImage: folderTexture ? `url(${folderTexture})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: "5px 10px 10px 10px",
              ...(open && !fullScreen && { transform: "skew(-15deg) scaleY(0.6)" }),
              ...(fullScreen && { transform: "skew(-15deg) scaleY(0.3)" }),
            }}
          ></div>
          
          {fullScreen && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsClosing(true);
                setFullScreen(false);
                setActiveIndex(1);
                setTimeout(() => {
                  setOpen(false);
                  setIsClosing(false);
                }, 400);
              }}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 z-50 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-200"
              style={{
                pointerEvents: isClosing ? 'none' : 'auto'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Folder;