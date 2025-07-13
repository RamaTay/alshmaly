import React, { useRef, useEffect } from 'react';
import { useMotionValue, useAnimation } from 'framer-motion';
import { Leaf, Award, Users, Clock, HandHeart } from 'lucide-react';

const MarqueeSection = () => {
  const features = [
    { icon: Leaf, text: '100% Natural' },
    { icon: Award, text: 'Global Quality Standards' },
    { icon: Clock, text: '25+ Years of Expertise' },
    { icon: Users, text: 'Customer Satisfaction First' },
    { icon: HandHeart, text: 'Ongoing Trader Support' },
  ];

  const duplicatedFeatures = [...features, ...features];
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const isHovered = useRef(false);
  const animationRef = useRef(null);
  const featureWidth = 300; // عرض كل عنصر
  const duration = 30; // مدة الدورة الكاملة بالثواني

  const animate = () => {
    if (!isHovered.current) {
      const currentX = x.get();
      const newX = currentX - 1; // حركة ثابتة لليسار
      
      if (Math.abs(newX) >= featureWidth * features.length) {
        x.set(0);
      } else {
        x.set(newX);
      }
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const handleMouseEnter = () => {
    isHovered.current = true;
    controls.start({ opacity: 0.8 });
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    controls.start({ opacity: 1 });
    animate();
  };

  return (
    <section 
      className="py-4 bg-[#F7F7F7] border-b-2 border-b-[#edebe0] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={containerRef}
        className="flex"
        style={{ 
          x,
          width: `${featureWidth * duplicatedFeatures.length}px`,
        }}
      >
        {duplicatedFeatures.map((feature, index) => (
          <div
            key={`feature-${index}`}
            className="flex-shrink-0 mx-6 flex items-center"
            style={{ width: `${featureWidth}px` }}
          >
            <div className="w-12 h-12 bg-[#054239] text-white rounded-full flex items-center justify-center">
              <feature.icon size={24} />
            </div>
            <span className="ml-4 text-xl font-semibold text-[#054239]">
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;