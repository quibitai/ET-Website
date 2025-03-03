import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CRTEffectProps {
  children: React.ReactNode;
  active?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

const CRTEffect: React.FC<CRTEffectProps> = ({ 
  children, 
  active = true,
  intensity = 'medium'
}) => {
  const [noisePosition, setNoisePosition] = useState({ x: 0, y: 0 });
  const [glitchTrigger, setGlitchTrigger] = useState(0);
  const [flickerTrigger, setFlickerTrigger] = useState(0);
  const [trackingOffset, setTrackingOffset] = useState(0);
  
  // Determine effect intensity values
  const intensityValues = {
    low: {
      noiseOpacity: 0.03,
      scanlineOpacity: 0.1,
      glitchFrequency: 5000,
      glitchDuration: 100,
      flickerIntensity: 0.02,
      trackingIntensity: 0.5
    },
    medium: {
      noiseOpacity: 0.05,
      scanlineOpacity: 0.15,
      glitchFrequency: 3000,
      glitchDuration: 150,
      flickerIntensity: 0.04,
      trackingIntensity: 1
    },
    high: {
      noiseOpacity: 0.08,
      scanlineOpacity: 0.25,
      glitchFrequency: 2000,
      glitchDuration: 200,
      flickerIntensity: 0.07,
      trackingIntensity: 2
    }
  };
  
  const settings = intensityValues[intensity];
  
  // Move noise pattern for continuous effect
  useEffect(() => {
    if (!active) return;
    
    const noiseInterval = setInterval(() => {
      setNoisePosition({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }, 50);
    
    return () => clearInterval(noiseInterval);
  }, [active]);
  
  // Random glitches
  useEffect(() => {
    if (!active) return;
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchTrigger(prev => prev + 1);
        
        // Reset glitch after a short duration
        setTimeout(() => {
          setGlitchTrigger(prev => prev + 1);
        }, settings.glitchDuration);
      }
    }, settings.glitchFrequency);
    
    return () => clearInterval(glitchInterval);
  }, [active, settings.glitchFrequency, settings.glitchDuration]);
  
  // VHS tracking effect
  useEffect(() => {
    if (!active) return;
    
    const trackingInterval = setInterval(() => {
      // Randomly trigger tracking issues
      if (Math.random() > 0.95) {
        const offset = (Math.random() * 2 - 1) * settings.trackingIntensity;
        setTrackingOffset(offset);
        
        // Reset tracking after a short period
        setTimeout(() => {
          setTrackingOffset(0);
        }, 200 + Math.random() * 400);
      }
    }, 1000);
    
    return () => clearInterval(trackingInterval);
  }, [active, settings.trackingIntensity]);
  
  // Screen flicker effect
  useEffect(() => {
    if (!active) return;
    
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.97) {
        setFlickerTrigger(prev => prev + 1);
      }
    }, 500);
    
    return () => clearInterval(flickerInterval);
  }, [active]);
  
  if (!active) return <>{children}</>;
  
  // SVG for static noise pattern
  const noiseSvg = `
    <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
      <filter id='noise'>
        <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#noise)' opacity='0.3'/>
    </svg>
  `;
  
  // SVG for scanlines
  const scanlinesSvg = `
    <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <pattern id='scanlines' width='1' height='4' patternUnits='userSpaceOnUse'>
          <rect x='0' y='0' width='1' height='2' fill='rgba(0,0,0,${settings.scanlineOpacity})'/>
          <rect x='0' y='2' width='1' height='2' fill='transparent'/>
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill='url(#scanlines)'/>
    </svg>
  `;
  
  return (
    <div className="relative">
      {/* Main content */}
      <motion.div
        className="relative z-10"
        animate={{ 
          opacity: flickerTrigger % 2 === 0 ? [1, 1 - Math.random() * settings.flickerIntensity, 1] : 1,
          y: trackingOffset,
          x: glitchTrigger % 2 === 0 ? [-1, 1, 0, -2, 0] : [0]
        }}
        transition={{ 
          duration: 0.2,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
      
      {/* CRT Scanlines */}
      <div 
        className="pointer-events-none absolute inset-0 z-20" 
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(scanlinesSvg)}")`,
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Noise overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-30 opacity-60"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`,
          backgroundPosition: `${noisePosition.x}% ${noisePosition.y}%`,
          opacity: settings.noiseOpacity,
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* RGB split effect when glitching */}
      {glitchTrigger % 2 === 0 && (
        <>
          <div 
            className="pointer-events-none absolute inset-0 z-20 opacity-20"
            style={{
              boxShadow: 'inset 0 0 30px rgba(0,0,255,0.5)',
              transform: 'translateX(1px)'
            }}
          />
          <div 
            className="pointer-events-none absolute inset-0 z-20 opacity-20"
            style={{
              boxShadow: 'inset 0 0 30px rgba(255,0,0,0.5)',
              transform: 'translateX(-1px)'
            }}
          />
        </>
      )}
      
      {/* Subtle color distortion based on glitch state */}
      <div 
        className="pointer-events-none absolute inset-0 z-20 opacity-10"
        style={{
          background: `linear-gradient(90deg, rgba(255,0,0,0.1), rgba(0,255,0,0.1), rgba(0,0,255,0.1))`,
          backgroundSize: '6px 100%',
          mixBlendMode: 'color'
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="pointer-events-none absolute inset-0 z-20 opacity-70"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.4)',
          borderRadius: '5px'
        }}
      />
    </div>
  );
};

export default CRTEffect; 