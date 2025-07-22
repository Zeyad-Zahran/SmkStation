import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, CreditCard, Truck, MapPin, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useForm as useFormspree } from '@formspree/react';

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: 'cash_on_delivery' | 'bank_transfer';
  deliveryTimeSlot: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { items, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formspreeState, handleFormspreeSubmit] = useFormspree("mgvewbgd");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutForm>({
    defaultValues: {
      paymentMethod: 'cash_on_delivery',
      deliveryTimeSlot: 'morning',
    },
  });

  const deliveryFee = getTotalPrice() > 250 ? 0 : 15;
  const totalWithDelivery = getTotalPrice() + deliveryFee;

  const onSubmit = async (data: CheckoutForm) => {
    if (items.length === 0) {
      toast({
        title: t('common.error'),
        description: t('cart.empty'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Create customer
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
        })
        .select()
        .single();

      if (customerError) throw customerError;

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: `ORD${Date.now()}`,
          customer_name: data.name,
          customer_email: data.email,
          customer_phone: data.phone,
          customer_address: data.address,
          total_amount: totalWithDelivery,
          delivery_fee: deliveryFee,
          payment_method: data.paymentMethod,
          delivery_time_slot: data.deliveryTimeSlot,
          notes: data.notes,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Send email via Formspree
      const emailData = {
        orderNumber: orderData.order_number,
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        customerAddress: data.address,
        items: items.map(item => `${item.name} - ${item.quantity}x - ${(item.price * item.quantity).toFixed(2)} ${t('common.currency')}`).join('\n'),
        totalAmount: totalWithDelivery.toFixed(2),
        paymentMethod: data.paymentMethod,
        deliveryTimeSlot: data.deliveryTimeSlot,
        notes: data.notes || 'لا توجد ملاحظات',
      };

      // Submit to Formspree
      const formData = new FormData();
      formData.append('orderNumber', emailData.orderNumber);
      formData.append('customerName', emailData.customerName);
      formData.append('customerEmail', emailData.customerEmail);
      formData.append('customerPhone', emailData.customerPhone);
      formData.append('customerAddress', emailData.customerAddress);
      formData.append('items', emailData.items);
      formData.append('totalAmount', emailData.totalAmount);
      formData.append('paymentMethod', emailData.paymentMethod);
      formData.append('deliveryTimeSlot', emailData.deliveryTimeSlot);
      formData.append('notes', emailData.notes);
      
      await handleFormspreeSubmit(formData);

      // Clear cart and redirect
      clearCart();
      
      toast({
        title: language === 'en' ? 'Order placed successfully!' : 'تم تقديم الطلب بنجاح!',
        description: language === 'en' 
          ? `Your order #${orderData.order_number} has been received.`
          : `تم استلام طلبك رقم #${orderData.order_number}.`,
      });

      navigate('/order-success', { 
        state: { 
          orderNumber: orderData.order_number,
          customerName: data.name 
        }
      });

    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: t('common.error'),
        description: language === 'en' 
          ? 'Failed to place order. Please try again.'
          : 'فشل في تقديم الطلب. يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('cart.empty')}</h1>
        <Button onClick={() => navigate('/')}>{t('cart.continue_shopping')}</Button>
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
          onClick={() => navigate('/cart')}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>
        <h1 className="text-3xl font-bold">{t('checkout.title')}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {t('checkout.customer_info')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t('checkout.full_name')} *</Label>
                    <Input
                      id="name"
                      {...register('name', { required: t('checkout.name_required') })}
                      placeholder={t('checkout.name_placeholder')}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">{t('checkout.phone')} *</Label>
                    <Input
                      id="phone"
                      {...register('phone', { required: t('checkout.phone_required') })}
                      placeholder={t('checkout.phone_placeholder')}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">{t('checkout.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder={t('checkout.email_placeholder')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {t('checkout.delivery_info')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">{t('checkout.address')} *</Label>
                  <Textarea
                    id="address"
                    {...register('address', { required: t('checkout.address_required') })}
                    placeholder={t('checkout.address_placeholder')}
                    rows={3}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="city">{t('checkout.city')} *</Label>
                  <Input
                    id="city"
                    {...register('city', { required: t('checkout.city_required') })}
                    placeholder={t('checkout.city_placeholder')}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <Label>{t('checkout.delivery_time')}</Label>
                  <RadioGroup
                    value={watch('deliveryTimeSlot')}
                    onValueChange={(value) => register('deliveryTimeSlot').onChange({ target: { value } })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="morning" id="morning" />
                      <Label htmlFor="morning">{t('checkout.morning')}</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="afternoon" id="afternoon" />
                      <Label htmlFor="afternoon">{t('checkout.afternoon')}</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="evening" id="evening" />
                      <Label htmlFor="evening">{t('checkout.evening')}</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  {t('checkout.payment_method')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={watch('paymentMethod')}
                  onValueChange={(value) => register('paymentMethod').onChange({ target: { value } })}
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="cash_on_delivery" id="cash" />
                    <Label htmlFor="cash">{t('checkout.cash_on_delivery')}</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="bank_transfer" id="transfer" />
                    <Label htmlFor="transfer">{t('checkout.bank_transfer')}</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>{t('checkout.notes')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  {...register('notes')}
                  placeholder={t('checkout.notes_placeholder')}
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>{t('checkout.order_summary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity}x {item.price.toFixed(2)} {t('common.currency')}
                        </p>
                      </div>
                      <p className="font-medium">
                        {(item.price * item.quantity).toFixed(2)} {t('common.currency')}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span>{getTotalPrice().toFixed(2)} {t('common.currency')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{t('cart.delivery_fee')}</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">{t('cart.free')}</span>
                    ) : (
                      `${deliveryFee.toFixed(2)} ${t('common.currency')}`
                    )}
                  </span>
                </div>

                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>{t('cart.total')}</span>
                  <span className="text-primary">
                    {totalWithDelivery.toFixed(2)} {t('common.currency')}
                  </span>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full ripple-effect"
                  disabled={loading}
                >
                  {loading ? t('checkout.placing_order') : t('checkout.place_order')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}