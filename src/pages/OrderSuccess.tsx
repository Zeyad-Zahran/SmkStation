import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function OrderSuccess() {
  const location = useLocation();
  const { language, t } = useLanguage();
  const { orderNumber, customerName } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 mx-auto text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            {language === 'en' ? 'Order Placed Successfully!' : 'تم تقديم الطلب بنجاح!'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === 'en' 
              ? `Thank you ${customerName || ''}, your order has been received.`
              : `شكراً لك ${customerName || ''}، تم استلام طلبك.`
            }
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('order.details')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderNumber && (
              <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
                <span className="font-medium">{t('order.number')}:</span>
                <span className="text-lg font-bold text-primary">#{orderNumber}</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-3 space-x-reverse p-3 border rounded-lg">
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{t('order.status')}</p>
                  <p className="text-muted-foreground">{t('order.pending')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse p-3 border rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{t('order.contact')}</p>
                  <p className="text-muted-foreground">+966 50 123 4567</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('order.next_steps')}</CardTitle>
          </CardHeader>
          <CardContent className="text-right">
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  1
                </div>
                <p>{t('order.step_1')}</p>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  2
                </div>
                <p>{t('order.step_2')}</p>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  3
                </div>
                <p>{t('order.step_3')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="ripple-effect">
              {t('order.continue_shopping')}
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              {t('order.contact_us')}
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
          <p className="font-medium mb-2">{t('order.important_note')}</p>
          <p>{t('order.confirmation_info')}</p>
        </div>
      </div>
    </div>
  );
}