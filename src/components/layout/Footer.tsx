import React from 'react';
import { Fish, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const quickLinks = [
    { href: '/about', label: t('footer.about') },
    { href: '/products', label: t('footer.products') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/offers', label: t('nav.offers') },
  ];

  const supportLinks = [
    { href: '/privacy', label: t('footer.privacy') },
    { href: '/terms', label: t('footer.terms') },
    { href: '/return-policy', label: t('footer.return') },
    { href: '/contact', label: t('footer.support') },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-ocean-deep text-white ">
      {/* Newsletter Section */}
      <div className="bg-Newsletter-bg py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">{t('footer.newsletter')}</h3>
            <p className="text-white/80 mb-6">{t('footer.newsletter_text')}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                className="bg-white text-foreground flex-1 rounded-full py-2 px-4"
              />
              <Button variant="secondary" className="bg-[#00D4FF] text-white rounded-full">
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0F1B2D] text-white ">
        <div className="w-11/12 mx-auto">

          {/* Main Footer Content */}
          <div className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

                {/* Company Info */}
                <div className="md:col-span-2 space-y-4">
                  <Link to="/" className="flex items-center gap-2 space-x-2 space-x-reverse">
                    <div className="bg-[#00D4FF] py-2 px-[10px] rounded-full">
                      SM
                    </div>
                    <div className="">
                      <span className="font-bold text-lg text-[#00D4FF]">
                        SmkStation Market
                      </span>
                    </div>
                  </Link>
                  <div className="">

                    <div>

                      <p className="text-white/70 text-sm max-w-80 leading-relaxed mt-1">
                        {language === 'en'
                          ? 'Your trusted partner for fresh, premium seafood delivered daily to your doorstep.'
                          : 'شريكك الموثوق للمأكولات البحرية الطازجة والفاخرة التي توصل يومياً لباب منزلك.'}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-4 space-y-2 text-white/70 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-[#00D4FF]" />
                      <span>+966 50 123 4567</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-[#00D4FF]" />
                      <span>info@smkstationmarket.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-[#00D4FF]" />
                      <span>
                        {language === 'en'
                          ? 'Riyadh, Saudi Arabia'
                          : 'الرياض، المملكة العربية السعودية'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold text-[#00D4FF] mb-4">
                    {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
                  </h4>
                  <ul className="space-y-2">
                    {quickLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Customer Support */}
                <div>
                  <h4 className="font-semibold text-[#00D4FF] mb-4">{t('footer.support')}</h4>
                  <ul className="space-y-2">
                    {supportLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Working Hours */}
                <div>
                  <h4 className="font-semibold text-[#00D4FF] mb-4">
                    {language === 'en' ? 'Working Hours' : 'ساعات العمل'}
                  </h4>
                  <p className="text-white/70 text-sm mb-4">
                    {language === 'en'
                      ? 'Daily: 8:00 AM - 10:00 PM'
                      : 'يومياً: 8:00 ص - 10:00 م'}
                  </p>
                  <div>
                    <h5 className="font-semibold text-[#00D4FF]">{t('footer.follow')}</h5>
                    <p className='text-white/70 text-sm'>For latest offers and new products</p>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white h-px w-3/4 mx-auto mt-9"></div>

          {/* Bottom Bar */}
          <div className="py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-col justify-between items-center text-center md:text-left space-y-3 md:space-y-0">
                <p className="text-white/60 text-sm">
                  &copy;  Developed by Zeyad Zahran in 2025. {t('footer.rights')}
                </p>
                <span className="text-white/60 text-sm">
                  {language === 'en'
                    ? 'Made with \u2665 for seafood lovers'
                    : 'صُنع بـ \u2665 لمحبي المأكولات البحرية'}
                </span>

              </div>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
};
