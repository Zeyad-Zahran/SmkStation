import React, { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductCard } from "@/components/products/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Truck, Award, Clock } from 'lucide-react';

interface Product {
  id: string;
  name_en: string;
  name_ar: string;
  description_en?: string;
  description_ar?: string;
  price: number;
  original_price?: number;
  category: string;
  image_url?: string;
  is_featured?: boolean;
  weight_kg?: number;
  is_available?: boolean;
}

const Index = () => {
  const { t , language} = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_featured", true)
          .eq("is_available", true)
          .limit(6);

        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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
    <div className="min-h-screen">
      <HeroSection />

      {/* Features */}
      <div className="text-center w-4/5 max-w-7xl mx-auto my-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/10  backdrop-blur-sm rounded-xl p-6 border border-[#213375] hover:bg-white/20 transition-all duration-300"
            >
              <div className="  rounded-full w-16 h-16 bg-[#255BAF] flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg text-[#1E40AF] font-bold mb-2">{feature.title}</h3>
              <p className=" text-[#213375] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-16 bg-[#E2E8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#1E40AF] text-3xl md:text-4xl font-bold gradient-text mb-4">
              {t("home.featured")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of the finest seafood
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-96 bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
