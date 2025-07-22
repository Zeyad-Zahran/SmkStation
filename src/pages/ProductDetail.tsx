import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Weight, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name_en: string;
  name_ar: string;
  description_en?: string;
  description_ar?: string;
  price: number;
  original_price?: number;
  image_url?: string;
  images?: string[];
  is_featured?: boolean;
  weight_kg?: number;
  category: string;
  is_available?: boolean;
  stock_quantity?: number;
  nutritional_info?: any;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: t('common.error'),
        description: t('product.not_found'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product || !product.is_available) return;
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: language === 'en' ? product.name_en : product.name_ar,
        price: product.price,
        image_url: product.image_url,
        weight_kg: product.weight_kg,
      });
    }

    toast({
      title: language === 'en' ? 'Added to cart!' : 'تم الإضافة للسلة!',
      description: language === 'en' 
        ? `${quantity}x ${product.name_en} added to your cart.`
        : `${quantity}x ${product.name_ar} تم إضافتها إلى سلتك.`,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('product.not_found')}</h1>
        <Button onClick={() => navigate('/')}>{t('common.back_home')}</Button>
      </div>
    );
  }

  const name = language === 'en' ? product.name_en : product.name_ar;
  const description = language === 'en' ? product.description_en : product.description_ar;
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercentage = hasDiscount ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;
  const images = product.images || (product.image_url ? [product.image_url] : []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 space-x-reverse mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
            {images.length > 0 ? (
              <img
                src={images[selectedImage]}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <div className="text-muted-foreground text-center">
                  <div className="text-6xl mb-4">🐟</div>
                  <span>No Image</span>
                </div>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.is_featured && (
                <Badge variant="default" className="bg-coral text-white">
                  {language === 'en' ? 'Featured' : 'مميز'}
                </Badge>
              )}
              {hasDiscount && (
                <Badge variant="destructive">
                  -{discountPercentage}%
                </Badge>
              )}
              {!product.is_available && (
                <Badge variant="secondary" className="bg-gray-500 text-white">
                  {t('product.out_of_stock')}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Image thumbnails */}
          {images.length > 1 && (
            <div className="flex space-x-2 space-x-reverse">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">
              {t(`category.${product.category}`)}
            </div>
            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            
            {/* Price */}
            <div className="flex items-center space-x-4 space-x-reverse mb-4">
              <span className="text-3xl font-bold text-primary">
                {product.price.toFixed(2)} {t('common.currency')}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.original_price!.toFixed(2)} {t('common.currency')}
                </span>
              )}
              {hasDiscount && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {t('product.save')} {(product.original_price! - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Weight */}
            {product.weight_kg && (
              <div className="flex items-center text-muted-foreground mb-4">
                <Weight className="h-4 w-4 mr-2" />
                {product.weight_kg} {t('product.kg')}
              </div>
            )}

            {/* Description */}
            {description && (
              <p className="text-muted-foreground leading-relaxed mb-6">
                {description}
              </p>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <label className="font-medium">{t('product.quantity')}:</label>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.is_available}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex space-x-4 space-x-reverse">
              <Button
                onClick={handleAddToCart}
                disabled={!product.is_available}
                className="flex-1 ripple-effect"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.is_available ? t('product.add_to_cart') : t('product.out_of_stock')}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">{t('features.free_delivery')}</h3>
                <p className="text-sm text-muted-foreground">{t('features.free_delivery_desc')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">{t('features.fresh_guarantee')}</h3>
                <p className="text-sm text-muted-foreground">{t('features.fresh_guarantee_desc')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">{t('features.premium_quality')}</h3>
                <p className="text-sm text-muted-foreground">{t('features.premium_quality_desc')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Nutritional Info */}
          {product.nutritional_info && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">{t('product.nutritional_info')}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(product.nutritional_info).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}