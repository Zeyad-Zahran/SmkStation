import React from 'react';
import { ArrowRight, Truck, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

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
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with Ocean Gradient */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        {/* Wave Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-32 wave-animation opacity-30" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20 float-animation">
        <div className="text-6xl">🐟</div>
      </div>
      <div className="absolute top-40 right-16 opacity-20 float-animation" style={{ animationDelay: '2s' }}>
        <div className="text-4xl">🦐</div>
      </div>
      <div className="absolute bottom-32 left-16 opacity-20 float-animation" style={{ animationDelay: '4s' }}>
        <div className="text-5xl">🦀</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center text-white max-w-4xl mx-auto">
          {/* Hero Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('home.hero.title')}
          </h1>
          
          {/* Hero Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t('home.hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 ripple-effect"
              >
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/categories">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
              >
                {t('home.categories')}
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};