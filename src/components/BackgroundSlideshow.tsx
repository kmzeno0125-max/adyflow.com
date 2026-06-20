import { useState, useEffect } from 'react'

interface BackgroundSlideshowProps {
  images: string[]
  interval?: number
}

export default function BackgroundSlideshow({ images, interval = 5000 }: BackgroundSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => {
        let bgPosition = 'center';
        if (index === 0) bgPosition = 'center 40%';
        if (index === 1) bgPosition = 'center 60%';
        if (index === 2) bgPosition = 'center 45%';

        return (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{
              opacity: currentIndex === index ? 1 : 0,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: bgPosition,
              filter: 'blur(1px)',
              transform: 'scale(1.05)',
            }}
          />
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-purple-950/65 to-slate-950/70"></div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full filter blur-[128px] animate-pulse" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full filter blur-[128px] animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>
    </div>
  )
}
