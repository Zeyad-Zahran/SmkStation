import React from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { useForm as useFormspree } from '@formspree/react';

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { language, t } = useLanguage();
  const [formspreeState, handleFormspreeSubmit] = useFormspree("mgvewbgd");
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone || '');
    formData.append('subject', data.subject);
    formData.append('message', data.message);
    
    await handleFormspreeSubmit(formData);
    
    toast({
      title: language === 'en' ? 'Message sent!' : 'تم الإرسال!',
      description: language === 'en' ? 'We will get back to you soon.' : 'سنرد عليك قريباً.',
    });
    
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            {language === 'en' ? 'Contact Us' : 'تواصل معنا'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === 'en' 
              ? 'We are here to help you with any questions or concerns.'
              : 'نحن هنا لمساعدتك في أي أسئلة أو استفسارات.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('contact.phone')}</h3>
                    <p className="text-muted-foreground">+966 50 123 4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('contact.email')}</h3>
                    <p className="text-muted-foreground">info@smkstation.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('contact.hours')}</h3>
                    <p className="text-muted-foreground">24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.send_message')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t('contact.name')} *</Label>
                      <Input
                        id="name"
                        {...register('name', { required: t('contact.name_required') })}
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">{t('contact.email')} *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email', { required: t('contact.email_required') })}
                      />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">{t('contact.phone')}</Label>
                      <Input id="phone" {...register('phone')} />
                    </div>
                    <div>
                      <Label htmlFor="subject">{t('contact.subject')} *</Label>
                      <Input
                        id="subject"
                        {...register('subject', { required: t('contact.subject_required') })}
                      />
                      {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">{t('contact.message')} *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      {...register('message', { required: t('contact.message_required') })}
                    />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" size="lg" className="w-full ripple-effect">
                    {t('contact.send')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}