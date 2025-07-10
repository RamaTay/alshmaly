import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { ContactAPI } from '../lib/api/contact';

const ContactPage = () => {
  // بيانات الفورم
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // refs للبطاقة والخريطة
  const cardRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // حالة قيمة top للبطاقة sticky
  const [cardTop, setCardTop] = useState(96); // نبدأ ب 96px (top-24)

  const stickyTopOffset = 96; // 24 * 4px

  // تحديث قيمة top بناء على التمرير والمواضع
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current || !mapRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();
      const mapRect = mapRef.current.getBoundingClientRect();

      const cardHeight = cardRect.height;
      const mapHeight = mapRect.height;

      const scrollTop = window.scrollY || window.pageYOffset;

      // نقطة التوقف العليا للبطاقة
      const cardInitialTop = cardRef.current.offsetTop;

      // النقطة التي يجب أن تتوقف عندها البطاقة (أسفل الخريطة)
      const maxTop = mapRef.current.offsetTop + mapHeight - cardHeight - stickyTopOffset;

      if (scrollTop + stickyTopOffset > maxTop) {
        // إذا تعدى التمرير الحد الأقصى، نثبت البطاقة عند الحد الأقصى (أسفل الماب)
        setCardTop(maxTop - scrollTop);
      } else if (scrollTop > cardInitialTop - stickyTopOffset) {
        // في منتصف التمرير: sticky ثابت
        setCardTop(stickyTopOffset);
      } else {
        // فوق بداية البطاقة: البطاقة في مكانها الطبيعي
        setCardTop(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // نفذ أول مرة

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // دوال تغيير البيانات وإرسال الفورم (مثل السابق)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setSubmitMessage('');

      await ContactAPI.submitContactMessage(formData);

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      setSubmitMessage('Thank you for your message! We will get back to you soon.');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-[#054239] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Ready to start your journey with premium Syrian agricultural products? 
              Get in touch with our team today.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information Card */}
            <div className="lg:col-span-1">
              <div
                ref={cardRef}
                className="bg-white rounded-2xl p-8 shadow-lg"
                style={{ position: 'sticky', top: cardTop }}
              >
                <h2 className="text-2xl font-bold text-[#054239] mb-8">Get in Touch</h2>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#b9a779] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#054239] mb-1">Address</h3>
                      <p className="text-gray-600">
                        Industrial Zone<br />
                        Idlib, Syria
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#b9a779] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#054239] mb-1">Phone</h3>
                      <p className="text-gray-600">+963 XXX XXX XXX</p>
                      <p className="text-gray-600">+963 XXX XXX XXX</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#b9a779] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#054239] mb-1">Email</h3>
                      <p className="text-gray-600">info@al-shamali.com</p>
                      <p className="text-gray-600">sales@al-shamali.com</p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#b9a779] rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#054239] mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Sunday - Thursday: 8:00 AM - 6:00 PM<br />
                        Friday: 8:00 AM - 12:00 PM<br />
                        Saturday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="mt-8 space-y-3">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center">
                    <MessageCircle size={20} className="mr-2" />
                    WhatsApp Chat
                  </button>
                  <button className="w-full bg-[#b9a779] hover:bg-[#054239] text-white py-3 px-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center">
                    <Phone size={20} className="mr-2" />
                    Call Now
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form and Map */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-[#054239] mb-8">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitMessage && (
                    <div className={`p-4 rounded-lg ${
                      submitMessage.includes('Thank you') 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {submitMessage}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b9a779] focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b9a779] focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b9a779] focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b9a779] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a subject</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="bulk-order">Bulk Order</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="quality-question">Quality Question</option>
                        <option value="shipping">Shipping & Logistics</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b9a779] focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your requirements, questions, or how we can help you..."
                    ></textarea>
                  </div>


                  
                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#b9a779] hover:bg-[#054239] text-white py-4 px-6 rounded-full font-semibold transition-all duration-300 flex items-center justify-center group"
                  >
                    <Send size={20} className="mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Map */}
              <div
                ref={mapRef}
                className="bg-white rounded-2xl p-8 shadow-lg min-h-[400px]"
              >
                <h2 className="text-2xl font-bold text-[#054239] mb-6">Our Location</h2>
                <div className="relative bg-gray-100 rounded-xl h-96 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.42107968468141!3d37.77492927975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sIdlib%2C%20Syria!5e0!3m2!1sen!2sus!4v1635959542123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  ></iframe>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-600 text-sm">
                    <strong>Note:</strong> For international clients, we provide comprehensive shipping and logistics support. 
                    Our team will coordinate with you to ensure smooth delivery to your location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (يمكنك إضافتها كما تريد) */}
    </div>
  );
};

export default ContactPage;
