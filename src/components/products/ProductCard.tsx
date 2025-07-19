import React from 'react';
import { Heart, ShoppingCart, Star, Weight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

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
    <Card className="group product-card overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-ocean">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 overflow-hidden">
          {image_url ? (
            <img
              src={image_url}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
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

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {is_featured && (
            <Badge variant="default" className="bg-coral text-white">
              {language === 'en' ? 'Featured' : 'مميز'}
            </Badge>
          )}
          {hasDiscount && (
            <Badge variant="destructive">
              -{discountPercentage}%
            </Badge>
          )}
          {!is_available && (
            <Badge variant="secondary" className="bg-gray-500 text-white">
              {t('product.out_of_stock')}
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={handleAddToCart}
            disabled={!is_available}
            className="w-full bg-primary/90 hover:bg-primary text-white"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {t('product.add_to_cart')}
          </Button>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Category */}
        <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
          {t(`category.${category}`)}
        </div>

        {/* Product Name */}
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
            {description}
          </p>
        )}

        {/* Weight */}
        {weight_kg && (
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Weight className="h-4 w-4 mr-1" />
            {weight_kg} {t('product.kg')}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-lg font-bold text-primary">
              {price.toFixed(2)} {t('common.currency')}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {original_price!.toFixed(2)} {t('common.currency')}
              </span>
            )}
          </div>
          
          {hasDiscount && (
            <Badge variant="outline" className="text-green-600 border-green-600">
              {t('product.save')} {(original_price! - price).toFixed(2)}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex space-x-2 space-x-reverse w-full">
          <Button
            onClick={handleAddToCart}
            disabled={!is_available}
            className="flex-1 ripple-effect"
            variant={is_available ? "default" : "secondary"}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {is_available ? t('product.add_to_cart') : t('product.out_of_stock')}
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};