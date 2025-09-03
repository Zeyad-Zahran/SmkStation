import React from 'react';
import { ArrowRight, Truck, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();

 
  return (
    <section className=" bg-hero-bg bg-cover bg-center relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with Ocean Gradient */}
      {/* <div className="absolute inset-0 ">
        <div className="absolute inset-0 bg-black/20" />
         <div className="absolute bottom-0 left-0 right-0 h-32 wave-animation opacity-30" />
      </div> */}

      {/* Floating Elements */}
      {/* <div className="absolute top-20 left-10 opacity-20 float-animation">
        <div className="text-6xl">🐟</div>
      </div>
      <div className="absolute top-40 right-16 opacity-20 float-animation" style={{ animationDelay: '2s' }}>
        <div className="text-4xl">🦐</div>
      </div>
      <div className="absolute bottom-32 left-16 opacity-20 float-animation" style={{ animationDelay: '4s' }}>
        <div className="text-5xl">🦀</div>
      </div> */}

      {/* Main Content */} 

      <div className="bg-[#FFFFFF8A] w-11/12 mx-auto relative z-10 rounded-[20px] px-5 md:px-16  py-8">
        <div className="text-center   md:w-full max-w-4xl mx-auto">
          {/* Hero Title */}
          <h1 className="text-3xl md:text-5xl   text-[#212D6E] font-bold mb-6 leading-tight">
            {t('home.hero.title')}
          </h1>
          
          {/* Hero Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-[#212D6E] font-semibold max-w-2xl mx-auto leading-relaxed">
            {t('home.hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-[#255BAF] text-white hover:bg-white hover:text-[#255BAF] rounded-full text-lg px-8 py-6 ripple-effect"
              >
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/categories">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-primary hover:bg-white hover:text-primary rounded-full text-lg px-8 py-6"
              >
                {t('home.categories')}
              </Button>
            </Link>
          </div> 
        </div>
      </div>
    </section>
  );
};