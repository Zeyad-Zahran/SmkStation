import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Truck, Award, Clock } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
const features = [
    {
      icon: Clock,
      title: t('home.features.fresh'),
      description: language === 'en' ? 'Sourced daily from trusted fishermen' : 'مصدر يومياً من صيادين موثوقين',
    },
    {
      icon: Truck,
      title: t('home.features.delivery'),
      description: language === 'en' ? 'Same day delivery available' : 'توصيل في نفس اليوم متاح',
    },
    {
      icon: Award,
      title: t('home.features.quality'),
      description: language === 'en' ? 'Guaranteed freshness and quality' : 'ضمان الطازجية والجودة',
    },
  ];
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[562px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/hero.jpg"
            alt="Seafood"
            className="w-full h-full object-cover object-top"
            style={{ objectPosition: '40% 0%' }}
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.54)',
              borderRadius: '1.25rem',
              padding: '1.94356rem 3.31475rem 3.375rem 3.375rem',
            }}
          >
            {/* Hero Title */}
            <h1 
              className="font-bold mb-4"
              style={{
                color: '#212D6E',
                fontSize: '3rem',
                lineHeight: 'normal'
              }}
            >
              {t('home.hero.title')}
            </h1>

            {/* Hero Subtitle */}
            <p 
              className="mb-12"
              style={{
                color: '#212D6E',
                fontSize: '1.375rem',
                fontWeight: 600,
                lineHeight: 'normal'
              }}
            >
              {t('home.hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button
                  className="text-white font-medium"
                  style={{
                    backgroundColor: '#255BAF',
                    borderRadius: '1.25rem',
                    padding: '0.75rem 1.25rem',
                    height: '2.8125rem'
                  }}
                >
                  {t('home.hero.cta')}
                  <ArrowRight className="mt-1 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  className="font-medium"
                  style={{
                    backgroundColor: '#FFF',
                    color: '#255BAF',
                    borderRadius: '1.25rem',
                    padding: '0.75rem 1.25rem',
                    height: '2.8125rem'
                  }}
                >
                  {t('home.categories')}
                </Button>
              </Link>
             
            </div>
            
          </div>
          
        </div>
        
      </section>
      {/* Features */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8  justify-items-center pt-20  pb-20 bg-white">
  {features.map((feature, index) => (
  <div 
  key={index} 
  className="w-[300px] h-[180px] bg-white rounded-xl flex flex-col items-center justify-center text-center p-6 border border-[#213375] hover:shadow-lg transition-all duration-300"
>
      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#1E40AF] mb-4">
        <feature.icon className="h-8 w-8 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-[18px] font-bold text-[#1E40AF] mb-2">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-[14px] text-[#213375;] leading-relaxed">
        {feature.description}
      </p>
    </div>
  ))}
</div>

    </>
  );
};