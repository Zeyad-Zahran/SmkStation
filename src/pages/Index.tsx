import React, { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { Button } from "@/components/ui/button";
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

/* ---------------------------
   ProductCard Component
-----------------------------*/
const ProductCard: React.FC<Product & { index?: number }> = ({
  name_en,
  description_en,
  price,
  weight_kg,
  index = 0,
}) => {
  const emojis = ["🐟", "🐠", "🦞", "🦀", "🐙", "🦐"];

  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 w-[280px] h-[229px] mx-auto">
      {/* Top Section */}
      <div
        className="flex items-center justify-center w-[280px] h-[120px] flex-shrink-0 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
        }}
      >
        <span style={{ fontSize: "2.5rem" }}>
          {emojis[index % emojis.length]}
        </span>
      </div>

      {/* Bottom Section */}
      <div className="px-4 py-3 bg-white">
        <h3
          className="mb-1 text-center"
          style={{
            color: "#1E40AF",
            fontSize: "1rem",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          {name_en}
        </h3>
        <p
          className="mb-3 text-center truncate"
          style={{
            color: "#666",
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: "1.3",
          }}
        >
          {description_en || "Fresh premium quality"}
        </p>

        <div className="flex items-center justify-between">
          <span
            style={{
              color: "#059669",
              fontSize: "0.9rem",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            ${price}/{weight_kg ? `${weight_kg}kg` : "kg"}
          </span>

          <Button
  className="bg-[#1E40AF] hover:bg-[#1639A0] text-white rounded-full 
             w-[90px] h-[25px] text-[11px] font-bold leading-none flex items-center justify-center"
>
  Add to Cart
</Button>

        </div>
      </div>
    </div>
  );
};

/* ---------------------------
   Index Component (Home Page)
-----------------------------*/
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
      <section className="py-16" style={{ backgroundColor: "#E2E8F0" }}>
        <div className="container mx-auto px-1 sm:px-2">
          <div className="text-center mb-12">
            <h2
              className="mb-4"
              style={{
                color: "#1E40AF",
                fontSize: "36px",
                fontWeight: 700,
                lineHeight: "normal",
              }}
            >
              Featured Products
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{
                color: "#666",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Discover our handpicked selection of the finest seafood
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[229px] w-[280px] bg-gray-200 animate-pulse rounded-2xl mx-auto"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[54px] gap-x-[220px] max-w-6xl mx-auto">
              {featuredProducts.map((product, i) => (
                <ProductCard key={product.id} index={i} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
