import React from 'react';
import { Fish, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
    { href: '/offers', label: 'Special Offers' },
  ];

  const supportLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/return-policy', label: 'Return Policy' },
    { href: '/support', label: 'Customer Support' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer>
      {/* Newsletter Section */}
<div className="bg-gradient-to-r from-[#1E40AF] via-[#1E3A8A] to-[#1E40AF] py-7 border-b-2 border-white">
  <div className="container mx-auto px-4">
    <div className="max-w-2xl mx-auto text-center">
      <h3 className="text-[32px] font-bold text-white mb-1">Newsletter</h3>

      <p className="text-[16px] font-normal text-white/90 mb-6">
        Subscribe to get updates on new products and offers
      </p>

      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          className="w-[306px] h-[40px] bg-white text-gray-900 rounded-full px-5 border-0 
                     text-[14px] font-normal placeholder:text-[#999]"
        />
        <Button
          style={{
            background: "linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)",
          }}
          className="w-[120px] h-[40px] text-[14px] text-white rounded-full hover:opacity-90"
        >
          Subscribe
        </Button>
      </div>
    </div>
  </div>
</div>



  {/* Main Footer */}
<div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
  <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
      
      {/* Company Info */}
      <div className="lg:col-span-1 space-y-4 mr-6">
        <div className="flex items-center space-x-2">
          <div
            className="flex items-center justify-center 
                       w-[42.57px] h-[30px] rounded-full
                       bg-[#00D4FF] 
                       text-white font-bold text-sm"
          >
            SM
          </div>
          <span className="font-bold text-xl text-[#00D4FF]">
            SmkStation Market
          </span>
        </div>
        <p className="text-white/80 text-[12px] leading-relaxed">
          Your trusted partner for fresh, premium seafood delivered daily to your doorstep.
        </p>
        
        {/* Contact Info */}
        <div className="space-y-2 text-white/80">
          <div className="flex items-center space-x-2 text-[12px]">
            <Phone className="h-4 w-4" />
            <span>+966 50 123 4567</span>
          </div>
          <div className="flex items-center space-x-2 text-[12px]">
            <Mail className="h-4 w-4" />
            <span>info@smkstationmarket.com</span>
          </div>
          <div className="flex items-center space-x-2 text-[12px]">
            <MapPin className="h-4 w-4" />
            <span>Riyadh, Saudi Arabia</span>
          </div>
        </div>
      </div>

      {/* Links + Support + Social */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ml-20">
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[#00D4FF] text-[18px] font-bold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-white/80 hover:text-white transition-colors text-[12px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h4 className="text-[#00D4FF] text-[18px] font-bold">Customer Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-white/80 hover:text-white transition-colors text-[12px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours & Social */}
          <div className="space-y-4">
            <div className="space-y-4 mb-7">
              <h4 className="text-[#00D4FF] text-[18px] font-bold">Working Hours</h4>
              <p className="text-white/80 text-[12px]">
                Daily: 8:00 AM - 10:00 PM
              </p>
            </div>
            
            {/* Follow Us */}
            <div className="space-y-1 mt-3">
              <h4 className="text-[#00D4FF] text-[18px] font-bold">Follow Us</h4>
              <p className="text-white/80 text-[12px]">
                For latest offers and new products
              </p>
              
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  {/* Divider */}
  <div className="flex justify-center">
<div className="h-[1px] w-[68.75rem] bg-white mx-auto"></div>
  </div>

  {/* Bottom Bar */}
  <div className="py-5 text-center ">
    <p className="text-[12px] text-white/60" >
   
      © Developed by Zeyad Zahran in 2025. All rights reserved.
    </p>
    <p className="text-[12px] text-white/60 mt-1 mb-5" >
      Made with ❤ for seafood lovers
    </p>
  </div>
</div>

    </footer>
  );
};