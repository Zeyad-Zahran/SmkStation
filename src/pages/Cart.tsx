import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { language, t } = useLanguage();
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  const deliveryFee = getTotalPrice() > 250 ? 0 : 15;
  const totalWithDelivery = getTotalPrice() + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground/50 mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t('cart.empty')}</h1>
            <p className="text-muted-foreground mb-6">{t('cart.empty_description')}</p>
          </div>
          <Link to="/">
            <Button size="lg" className="ripple-effect">
              {t('cart.continue_shopping')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 space-x-reverse mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{t('cart.title')}</h1>
          <p className="text-muted-foreground">
            {getTotalItems()} {t('cart.items')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <span className="text-2xl">🐟</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                    {item.weight_kg && (
                      <p className="text-sm text-muted-foreground">
                        {item.weight_kg} {t('product.kg')}
                      </p>
                    )}
                    <p className="text-lg font-bold text-primary">
                      {item.price.toFixed(2)} {t('common.currency')}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Total Price */}
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {(item.price * item.quantity).toFixed(2)} {t('common.currency')}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>{t('cart.order_summary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{t('cart.subtotal')}</span>
                <span className="font-medium">
                  {getTotalPrice().toFixed(2)} {t('common.currency')}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>{t('cart.delivery_fee')}</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600">{t('cart.free')}</span>
                  ) : (
                    `${deliveryFee.toFixed(2)} ${t('common.currency')}`
                  )}
                </span>
              </div>

              {deliveryFee > 0 && (
                <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                  {t('cart.free_delivery_note')} {(250 - getTotalPrice()).toFixed(2)} {t('common.currency')}
                </div>
              )}

              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>{t('cart.total')}</span>
                <span className="text-primary">
                  {totalWithDelivery.toFixed(2)} {t('common.currency')}
                </span>
              </div>

              <Button 
                size="lg" 
                className="w-full ripple-effect" 
                onClick={() => navigate('/checkout')}
              >
                {t('cart.proceed_checkout')}
              </Button>

              <Link to="/">
                <Button variant="outline" size="lg" className="w-full">
                  {t('cart.continue_shopping')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}