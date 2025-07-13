import React from 'react';
import { Leaf, Award, Users, Clock, HandHeart } from 'lucide-react';

const MarqueeSection = () => {
  const features = [
    { icon: Leaf, text: '100% Natural' },
    { icon: Award, text: 'Global Quality Standards' },
    { icon: Clock, text: '25+ Years of Expertise' },
    { icon: Users, text: 'Customer Satisfaction First' },
    { icon: HandHeart, text: 'Ongoing Trader Support' },
  ];

  // نكرر العناصر لضمان التغطية الكافية
  const repeatedFeatures = [...features, ...features, ...features];
 
  return ( 
    <section className="py-2 bg-[#F7F7F7] border-b-2 border-b-[#edebe0] overflow-hidden w-full">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap w-[200%]">
          {repeatedFeatures.map((feature, index) => (
            <div 
              key={`marquee-item-${index}`} 
              className="inline-flex items-center mx-8 text-[#054239] flex-shrink-0"
            > 
              <div className="w-12 h-12 text-[#054239] rounded-full flex items-center justify-center">
                <feature.icon size={24} />
              </div>
              <span className="ml-4 text-xl font-semibold">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default MarqueeSection;