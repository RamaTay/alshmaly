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
 
  return ( 
    <section className="py-2 bg-[#054239] border-b-1 border-b-[#b9a779] overflow-x-hidden w-full">
      <div className="w-full">
        <div className="flex animate-marquee whitespace-nowrap w-max">
          {[...features, ...features, ...features].map((feature, index) => (
            <div 
              key={index} 
              className="inline-flex items-center mx-8 text-[#edebe0] flex-shrink-0"
            >
              <div className="w-12 h-12 bg-[#edebe0] text-[#054239] rounded-full flex items-center justify-center">
                <feature.icon size={24} />
              </div>
              <span className="ml-4 text-xl font-semibold">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default MarqueeSection;