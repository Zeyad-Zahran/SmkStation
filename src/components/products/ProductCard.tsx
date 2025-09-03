import React from 'react';
import { Heart, ShoppingCart, Star, Weight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import fish from '@/assets/fish.png'

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

  const name = language === 'en' ? name_en : name_ar;
  const description = language === 'en' ? description_en : description_ar;
  const hasDiscount = original_price && original_price > price;
  const discountPercentage = hasDiscount ? Math.round(((original_price - price) / original_price) * 100) : 0;

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
      title: language === 'en' ? 'Added to cart!' : 'تم الإضافة للسلة!',
      description: language === 'en'
        ? `${name} has been added to your cart.`
        : `تم إضافة ${name} إلى سلتك.`,
    });
  };

  return (
    <Card className="group product-card overflow-hidden h-full flex flex-col transition-all duration-300 shadow-md hover:shadow-lg rounded-2xl bg-white">
      {/* Top Image / Emoji Section */}
      <div className="bg-[#60A5FA]  rounded-2xl flex items-center justify-center h-40">
        {image_url ? (
          <img
            src={fish}
            alt={name}
            className="h-16 w-16 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        ) : (
          <span className="text-5xl">🐟</span>
        )}
      </div>

      {/* Bottom Content */}
      <CardContent className="bg-white flex-1 flex flex-col items-center text-center p-4">
        {/* Product Name */}
        <Link to={`/product/${id}`}>
          <h3 className="font-bold text-lg text-[#1E40AF] mb-1 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Description */}
        {description && (
          <p className="text-[#666666] text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between w-full mt-2">

        {/* Price */}
        <div className="text-green-600 font-bold text-lg mb-3">
          ${price}/kg
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!is_available}
          className="bg-[#1E3A8A] hover:bg-[#153E75] text-white rounded-full px-4 py-2 transition"
          size="sm"
        >
          {t('product.add_to_cart')}
        </Button>

        </div>

      </CardContent>
    </Card>

  );
};