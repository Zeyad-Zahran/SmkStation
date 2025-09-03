import React from "react";
import {
  Fish,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const quickLinks = [
    { href: "/about", label: t("footer.about") },
    { href: "/products", label: t("footer.products") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/offers", label: t("nav.offers") },
  ];

  const supportLinks = [
    { href: "/privacy", label: t("footer.privacy") },
    { href: "/terms", label: t("footer.terms") },
    { href: "/return-policy", label: t("footer.return") },
    { href: "/contact", label: t("footer.support") },
  ];

  return (
    <footer className="bg-ocean-deep text-white">
      {/* Newsletter Section */}
      <div className="bg-[linear-gradient(135deg,#1E40AF_0%,#1E3A8A_5000%,#1E40AF_10000%)] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              {t("footer.newsletter")}
            </h3>
            <p className="text-white/80 mb-6">{t("footer.newsletter_text")}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={
                  language === "en"
                    ? "Enter your email"
                    : "أدخل بريدك الإلكتروني"
                }
                className="bg-white font-normal text-sm text-foreground flex-1 rounded-[20px]"
              />
              <Button
                variant="secondary"
                className="bg-[linear-gradient(135deg,#00D4FF_0%,#0099CC_10000%)] text-common rounded-[20px] font-bold text-sm"
              >
                {t("footer.subscribe")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 bg-[linear-gradient(135deg,#1E293B_0%,#0F172A_10000%)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="bg-white p-2 rounded-lg mr-2">
                  <Fish className="h-6 w-6 text-primary " />
                </div>
                <div>
                  <span className="font-bold text-lg text-[#00D4FF]">
                    {language === "en" ? "SmkStation Market" : "سوق سمك ستيشن "}
                  </span>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {language === "en"
                  ? "Your trusted partner for fresh, premium seafood delivered daily to your doorstep."
                  : "شريكك الموثوق للمأكولات البحرية الطازجة والفاخرة التي توصل يومياً لباب منزلك."}
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 me-2" />
                  <span>+966 50 123 4567</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 me-2" />
                  <span>info@seabreezemarket.com</span>
                </div>
                <div className="flex items-centertext-sm">
                  <MapPin className="h-4 w-4 me-2" />
                  <span>
                    {language === "en"
                      ? "Riyadh, Saudi Arabia"
                      : "الرياض، المملكة العربية السعودية"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-[#00D4FF]">
                {language === "en" ? "Quick Links" : "روابط سريعة"}
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-white/80 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-[#00D4FF]">
                {t("footer.support")}
              </h4>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-white/80 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Working Hours & Social */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-[#00D4FF]">
                {language === "en" ? "Working Hours" : "ساعات العمل"}
              </h4>
              <p className="text-white/80 text-sm">
                {language === "en"
                  ? "Daily: 8:00 AM - 10:00 PM"
                  : "يومياً: 8:00 ص - 10:00 م"}
              </p>

              {/* Social Media */}
              <div className="space-y-2">
                <h5 className="font-medium text-[#00D4FF]">
                  {t("footer.follow")}
                </h5>
                <div className="flex space-x-2 space-x-reverse">
                  <p className="text-white/80 text-sm">
                    {language === "en"
                      ? "For latest offers and new products"
                      : "للحصول على أحدث عروض ومنتجات جديدة"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[linear-gradient(135deg,#1E293B_0%,#0F172A_10000%)]">
        <div className="flex justify-center">
          <span className="block h-px w-[70%] bg-common"></span>
        </div>
      </div>
      <div className=" bg-[linear-gradient(135deg,#1E293B_0%,#0F172A_10000%)]  py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              {t("footer.developed")} {t("footer.rights")}
            </p>
            <div className="flex items-center space-x-4 space-x-reverse text-sm">
              <span className="text-white/60">
                {language === "en"
                  ? "Made with ❤️ for seafood lovers"
                  : "صُنع بـ ❤️ لمحبي المأكولات البحرية"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
