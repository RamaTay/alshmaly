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

  // نكرر العناصر 4 مرات لضمان التغطية الكاملة
  const repeatedFeatures = [...features, ...features, ...features, ...features];
 
  return ( 
    <section className="py-2 bg-[#F7F7F7] border-b-2 border-b-[#edebe0] overflow-hidden w-full">
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {repeatedFeatures.map((feature, index) => (
            <div 
              key={`first-${index}`} 
              className="inline-flex items-center mx-8 text-[#054239] flex-shrink-0"
            > 
              <div className="w-12 h-12 text-[#054239] rounded-full flex items-center justify-center">
                <feature.icon size={24} />
              </div>
              <span className="ml-4 text-xl font-semibold">{feature.text}</span>
            </div>
          ))}
        </div>
        
        {/* نسخة ثانية متطابقة للانسياب المستمر */}
        <div className="flex animate-marquee2 absolute top-0 whitespace-nowrap">
          {repeatedFeatures.map((feature, index) => (
            <div 
              key={`second-${index}`} 
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
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default MarqueeSection;