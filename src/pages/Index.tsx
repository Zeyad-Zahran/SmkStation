import React, { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductCard } from "@/components/products/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

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
  const { t } = useLanguage();
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

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-essential mb-4">
              {t("home.featured")}
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto ">
              {t("home.featured_subtitle")}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[275px] bg-muted animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-x-10 justify-items-center">
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
