import React from "react";
import { Heart, ShoppingCart, Star, Weight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name_en: string;
  name_ar: string;
  description_en?: string;
  description_ar?: string;
  price: number;
  original_price?: number;
  image_url?: string;
  is_featured?: boolean;
  weight_kg?: number;
  category: string;
  is_available?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name_en,
  name_ar,
  description_en,
  description_ar,
  price,
  original_price,
  image_url,
  is_featured,
  weight_kg,
  category,
  is_available = true,
}) => {
  const { language, t } = useLanguage();
  const { addItem } = useCart();

  const name = language === "en" ? name_en : name_ar;
  const description = language === "en" ? description_en : description_ar;
  const hasDiscount = original_price && original_price > price;
  const discountPercentage = hasDiscount
    ? Math.round(((original_price - price) / original_price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!is_available) return;

    addItem({
      id,
      name,
      price,
      image_url,
      weight_kg,
    });

    toast({
      title: language === "en" ? "Added to cart!" : "تم الإضافة للسلة!",
      description:
        language === "en"
          ? `${name} has been added to your cart.`
          : `تم إضافة ${name} إلى سلتك.`,
    });
  };
  console.log(image_url);

  return (
    <Card className="group product-card overflow-hidden w-[350px] flex flex-col transition-all duration-300 hover:shadow-ocean rounded-2xl">
      <CardContent className=" flex-1 flex flex-col p-0">
        <div className="relative overflow-hidden">
          {/* Product Image */}

          <div className=" relative h-[140px] bg-[linear-gradient(135deg,#60A5FA_0%,#3B82F6_10000%)] overflow-hidden rounded-b-2xl">
            {image_url ? (
              <img
                src={image_url}
                alt={name}
                className="w-10 h-10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <div className="text-muted-foreground text-center">
                  <div className="text-4xl mb-2">🐟</div>
                  <span className="text-sm">No Image</span>
                </div>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        {/* Product Name */}
        <Link to={`/product/${id}`}>
          <h3 className="text-essential text-center font-bold text-lg my-2 line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Description */}
        {description && (
          <p className="text-sm text-center text-muted-foreground mb-3 line-clamp-2 flex-1">
            {description}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex space-x-2 space-x-reverse w-full justify-between items-center">
          {weight_kg && (
            <div className="text-base font-bold text-[#059669] text-muted-foreground">
              {/* <Weight className="h-4 w-4 mr-1" /> */}${weight_kg}/
              {t("product.kg")}
            </div>
          )}
          <Button
            onClick={handleAddToCart}
            disabled={!is_available}
            className="bg-essential px-4 py-0 rounded-3xl font-bold text-xs"
            variant={is_available ? "default" : "secondary"}
          >
            {is_available
              ? t("product.add_to_cart")
              : t("product.out_of_stock")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
