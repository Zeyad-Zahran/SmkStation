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
    <footer className="bg-ocean-deep text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-ocean py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">{t('footer.newsletter')}</h3>
            <p className="text-white/80 mb-6">{t('footer.newsletter_text')}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                className="bg-white text-foreground flex-1"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="bg-white p-2 rounded-lg">
                  <Fish className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="font-bold text-lg">
                    {language === 'en' ? 'SmkStation Market' : 'سوق سمك ستيشن '}
                  </span>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {language === 'en' 
                  ? 'Your trusted partner for fresh, premium seafood delivered daily to your doorstep.'
                  : 'شريكك الموثوق للمأكولات البحرية الطازجة والفاخرة التي توصل يومياً لباب منزلك.'
                }
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+966 50 123 4567</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm">
                  <Mail className="h-4 w-4" />
                  <span>info@seabreezemarket.com</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {language === 'en' 
                      ? 'Riyadh, Saudi Arabia' 
                      : 'الرياض، المملكة العربية السعودية'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">
                {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      to={link.href} 
                      className="text-white/80 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">{t('footer.support')}</h4>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      to={link.href} 
                      className="text-white/80 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Working Hours & Social */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">
                {language === 'en' ? 'Working Hours' : 'ساعات العمل'}
              </h4>
              <p className="text-white/80 text-sm">
                {language === 'en' 
                  ? 'Daily: 8:00 AM - 10:00 PM' 
                  : 'يومياً: 8:00 ص - 10:00 م'
                }
              </p>
              
              {/* Social Media */}
              <div className="space-y-2">
                <h5 className="font-medium">{t('footer.follow')}</h5>
                <div className="flex space-x-2 space-x-reverse">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © Developed By Zeyad Zahran In 2025. {t('footer.rights')}
            </p>
            <div className="flex items-center space-x-4 space-x-reverse text-sm">
              <span className="text-white/60">
                {language === 'en' 
                  ? 'Made with ❤️ for seafood lovers' 
                  : 'صُنع بـ ❤️ لمحبي المأكولات البحرية'
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
