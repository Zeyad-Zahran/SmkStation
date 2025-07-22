import React from 'react';
import { Fish, Shield, Truck, Heart, Star, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { language, t } = useLanguage();

  const values = [
    {
      icon: Fish,
      titleEn: 'Fresh Quality',
      titleAr: 'جودة طازجة',
      descEn: 'We source only the freshest seafood directly from trusted fishermen and suppliers.',
      descAr: 'نحن نحصل على أطزج المأكولات البحرية مباشرة من الصيادين والموردين الموثوقين.',
    },
    {
      icon: Shield,
      titleEn: 'Quality Guarantee',
      titleAr: 'ضمان الجودة',
      descEn: 'Every product goes through rigorous quality checks to ensure the highest standards.',
      descAr: 'كل منتج يخضع لفحوص جودة صارمة لضمان أعلى المعايير.',
    },
    {
      icon: Truck,
      titleEn: 'Fast Delivery',
      titleAr: 'توصيل سريع',
      descEn: 'We deliver fresh seafood to your doorstep within 24 hours of your order.',
      descAr: 'نوصل المأكولات البحرية الطازجة إلى باب منزلك خلال 24 ساعة من طلبك.',
    },
    {
      icon: Heart,
      titleEn: 'Customer Care',
      titleAr: 'رعاية العملاء',
      descEn: 'Our dedicated team is always ready to help and ensure your satisfaction.',
      descAr: 'فريقنا المخصص جاهز دائماً للمساعدة وضمان رضاك.',
    },
  ];

  const stats = [
    { number: '10,000+', labelEn: 'Happy Customers', labelAr: 'عميل سعيد' },
    { number: '50+', labelEn: 'Seafood Varieties', labelAr: 'نوع من المأكولات البحرية' },
    { number: '5', labelEn: 'Years Experience', labelAr: 'سنوات خبرة' },
    { number: '24/7', labelEn: 'Customer Support', labelAr: 'دعم العملاء' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          {language === 'en' ? 'About SmkStation' : 'عن SmkStation'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {language === 'en' 
            ? 'SmkStation is your trusted partner for premium seafood. We are passionate about bringing the ocean\'s finest treasures directly to your table with uncompromising quality and freshness.'
            : 'SmkStation هو شريكك الموثوق للمأكولات البحرية الفاخرة. نحن متحمسون لإحضار أفضل كنوز المحيط مباشرة إلى طاولتك بجودة ونضارة لا تقبل المساومة.'
          }
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="group hover:shadow-ocean transition-all duration-300">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              {language === 'en' ? 'Our Mission' : 'مهمتنا'}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'To provide the freshest, highest quality seafood while supporting sustainable fishing practices and delivering exceptional customer service.'
                : 'توفير أطزج وأعلى جودة من المأكولات البحرية مع دعم ممارسات الصيد المستدامة وتقديم خدمة عملاء استثنائية.'
              }
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-ocean transition-all duration-300">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              {language === 'en' ? 'Our Vision' : 'رؤيتنا'}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'To become the leading seafood marketplace in the region, known for quality, freshness, and customer satisfaction.'
                : 'أن نصبح السوق الرائد للمأكولات البحرية في المنطقة، معروفين بالجودة والنضارة ورضا العملاء.'
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'en' ? 'Our Values' : 'قيمنا'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="group hover:shadow-ocean transition-all duration-300 text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-3">
                  {language === 'en' ? value.titleEn : value.titleAr}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === 'en' ? value.descEn : value.descAr}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'en' ? 'Our Achievements' : 'إنجازاتنا'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {language === 'en' ? stat.labelEn : stat.labelAr}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">
          {language === 'en' ? 'Our Story' : 'قصتنا'}
        </h2>
        <div className="prose prose-lg mx-auto text-muted-foreground">
          <p className="mb-6 leading-relaxed">
            {language === 'en'
              ? 'Founded in 2019, SmkStation began as a small family business with a simple mission: to bring the freshest seafood from the coast to families across the region. What started as a local fish market has grown into a trusted online platform serving thousands of customers.'
              : 'تأسست SmkStation في عام 2019، بدأت كعمل عائلي صغير بمهمة بسيطة: إحضار أطزج المأكولات البحرية من الساحل إلى العائلات في جميع أنحاء المنطقة. ما بدأ كسوق سمك محلي نما ليصبح منصة إلكترونية موثوقة تخدم آلاف العملاء.'
            }
          </p>
          <p className="mb-6 leading-relaxed">
            {language === 'en'
              ? 'Our founder, Ahmad Al-Bahri, grew up in a fishing family and understood the importance of quality and freshness. This passion for excellence drives everything we do, from sourcing to delivery.'
              : 'مؤسسنا، أحمد البحري، نشأ في عائلة صيادين وفهم أهمية الجودة والنضارة. هذا الشغف بالتميز يقود كل ما نفعله، من التوريد إلى التوصيل.'
            }
          </p>
          <p className="leading-relaxed">
            {language === 'en'
              ? 'Today, we work with a network of certified fishermen and suppliers who share our commitment to sustainability and quality. Every product that reaches our customers represents our promise of freshness and excellence.'
              : 'اليوم، نعمل مع شبكة من الصيادين والموردين المعتمدين الذين يشاركوننا الالتزام بالاستدامة والجودة. كل منتج يصل إلى عملائنا يمثل وعدنا بالنضارة والتميز.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}