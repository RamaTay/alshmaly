import React, { useState } from 'react';
import { Award, Users, Globe, Calendar, MapPin, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
 
  const timeline = [
    { 
      year: '1999',
      title: 'Company Foundation',
      description: 'Al-Shamali was established in Idlib, Syria, with a vision to export premium Syrian agricultural products.'
    },
    {
      year: '2005',
      title: 'First International Export',
      description: 'Successfully exported our first shipment of freekeh and legumes to European markets.'
    },
    {
      year: '2010',
      title: 'Quality Certification',
      description: 'Obtained ISO certification and implemented modern Sortex cleaning technology.'
    },
    {
      year: '2015',
      title: 'Market Expansion',
      description: 'Expanded operations to serve over 20 countries across Europe, Asia, and the Americas.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched online platform and enhanced supply chain management systems.'
    },
    {
      year: '2024',
      title: 'Sustainable Future',
      description: 'Committed to sustainable farming practices and supporting local Syrian farmers.'
    }
  ];

  const exportCountries = [
    { name: 'Germany', exports: '2,500 tons/year', products: 'Freekeh, Lentils, Spices' },
    { name: 'France', exports: '1,800 tons/year', products: 'Olive Oil, Herbs, Nuts' },
    { name: 'United Kingdom', exports: '1,200 tons/year', products: 'Legumes, Dried Fruits' },
    { name: 'Netherlands', exports: '2,100 tons/year', products: 'Spices, Traditional Preserves' },
    { name: 'United States', exports: '3,200 tons/year', products: 'Premium Nuts, Freekeh' },
    { name: 'Canada', exports: '1,500 tons/year', products: 'Herbs, Spices, Oils' }
  ];

  const values = [
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in every product we export, ensuring authenticity and premium quality.'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Our customers are at the heart of everything we do. We build lasting partnerships based on trust and reliability.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'We connect Syrian agricultural heritage with global markets, bringing authentic flavors worldwide.'
    },
    {
      icon: CheckCircle,
      title: 'Sustainability',
      description: 'We are committed to sustainable farming practices that support local communities and the environment.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7]  pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-[#054239] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Al-Shamali</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              For over 25 years, we have been the bridge between Syrian agricultural heritage and global markets, 
              bringing authentic, premium-quality products to tables worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Vision and Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-[#054239] mb-6">Our Vision & Values</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                At Al-Shamali, we believe that quality speaks for itself. Our mission is to preserve and share 
                the rich agricultural heritage of Syria while building sustainable partnerships that benefit 
                farmers, traders, and consumers worldwide.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are committed to maintaining the highest standards of quality, authenticity, and customer 
                service in everything we do. Our products carry the essence of Syrian soil and the dedication 
                of generations of farmers.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800&h=600" 
                alt="Al-Shamali Team"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6  text-white p-6 rounded-2xl
                 style={{ backgroundImage: "url('https://i.postimg.cc/QxrnWQFg/snapedit-1752138153179.png')"">
                
                <p className="text-sm font-semibold">Established</p>
                <p className="text-2xl font-bold">1999</p>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-[#f7f7f7] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-[#054239] rounded-full flex items-center justify-center mb-6">
                  <value.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#054239] mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-[#F7F7F7]  border-b-2  border-t-2 border-b-[#b9a779] border-t-[#b9a779]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#054239] mb-4">Our Journey</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From humble beginnings to global reach, discover the milestones that shaped Al-Shamali
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#054239] hidden lg:block"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-[#f7f7f7] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <Calendar size={20} className="text-[#b9a779] mr-2" />
                        <span className="text-[#b9a779] font-bold text-lg">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#054239] mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden lg:block w-6 h-6 bg-[#054239] rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Export Countries Map */}
      <section className="py-20 bg-[#F7F7F7] ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#054239] mb-4">Global Reach</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We proudly export to over 30 countries worldwide, bringing Syrian agricultural excellence to global markets
            </p>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="bg-[#f7f7f7] rounded-2xl p-8 shadow-lg mb-12">
            <div className="relative bg-gray-100 rounded-xl h-96 flex items-center justify-center mb-8">
              <div className="text-center">
                <Globe size={64} className="text-[#b9a779] mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Interactive World Map</p>
                <p className="text-gray-500">Click on countries to see export details</p>
              </div>
            </div>

            {/* Export Countries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exportCountries.map((country, index) => (
                <div 
                  key={index}
                  className="bg-[#F7F7F7]  rounded-xl p-6 hover:bg-[#b9a779]/10 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCountry(country)}
                >
                  <div className="flex items-center mb-3">
                    <MapPin size={20} className="text-[#b9a779] mr-2" />
                    <h3 className="text-lg font-semibold text-[#054239]">{country.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Annual Exports: {country.exports}</p>
                  <p className="text-gray-500 text-sm">Main Products: {country.products}</p>
                </div>
              ))}
            </div>
          </div>

  </div>
      </section>
    </div>
  );
};

export default AboutPage;