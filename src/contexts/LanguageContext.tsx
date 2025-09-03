import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Comprehensive translations for the seafood marketplace
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.categories": "Categories",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.offers": "Special Offers",
    "nav.cart": "Cart",
    "nav.account": "Account",
    "nav.search": "Search products...",
    "nav.language": "العربية",

    // Home page
    "home.hero.title": "Fresh Seafood Delivered Daily",
    "home.hero.subtitle":
      "Premium quality fish and seafood from the finest sources",
    "home.hero.cta": "Shop Now",
    "home.features.fresh": "Daily Fresh Catch",
    "home.features.delivery": "Fast Delivery",
    "home.features.quality": "Premium Quality",
    "home.featured": "Featured Products",
    "home.categories": "Shop by Category",
    "home.offers": "Special Offers",
    "home.testimonials": "What Our Customers Say",
    "home.featured_subtitle":
      "Discover our handpicked selection of the finest seafood",
    // Categories
    "category.fish": "Fish",
    "category.shrimp": "Shrimp & Prawns",
    "category.shellfish": "Shellfish & Mollusks",
    "category.meals": "Ready Meals",
    "category.sides": "Side Dishes",
    "category.special_offers": "Special Offers",
    "category.view_all": "View All",

    // Products
    "product.add_to_cart": "Add to Cart",
    "product.out_of_stock": "Out of Stock",
    "product.weight": "Weight",
    "product.price": "Price",
    "product.original_price": "Original Price",
    "product.save": "Save",
    "product.description": "Description",
    "product.preparation_time": "Preparation Time",
    "product.minutes": "minutes",
    "product.kg": "kg",
    "product.per_kg": "per kg",

    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.empty_subtitle": "Add some delicious seafood to get started",
    "cart.continue_shopping": "Continue Shopping",
    "cart.item": "Item",
    "cart.quantity": "Quantity",
    "cart.price": "Price",
    "cart.total": "Total",
    "cart.subtotal": "Subtotal",
    "cart.delivery": "Delivery",
    "cart.discount": "Discount",
    "cart.final_total": "Final Total",
    "cart.checkout": "Proceed to Checkout",
    "cart.remove": "Remove",
    "cart.update": "Update",
    "cart.free_delivery": "Free Delivery",
    "cart.free_delivery_note": "Free delivery on orders over 250 SAR",

    // Checkout
    "checkout.title": "Checkout",
    "checkout.personal_info": "Personal Information",
    "checkout.delivery_info": "Delivery Information",
    "checkout.order_summary": "Order Summary",
    "checkout.payment": "Payment Method",
    "checkout.cash_on_delivery": "Cash on Delivery",
    "checkout.place_order": "Place Order",
    "checkout.processing": "Processing...",
    "checkout.name": "Full Name",
    "checkout.email": "Email Address",
    "checkout.phone": "Phone Number",
    "checkout.address": "Delivery Address",
    "checkout.city": "City",
    "checkout.notes": "Order Notes (Optional)",
    "checkout.delivery_date": "Preferred Delivery Date",
    "checkout.delivery_time": "Preferred Time Slot",
    "checkout.morning": "Morning (9AM - 12PM)",
    "checkout.afternoon": "Afternoon (12PM - 4PM)",
    "checkout.evening": "Evening (4PM - 8PM)",

    // Order confirmation
    "order.success": "Order Placed Successfully!",
    "order.success_message":
      "Thank you for your order. We will contact you soon to confirm delivery details.",
    "order.number": "Order Number",
    "order.total": "Order Total",
    "order.status": "Status",
    "order.pending": "Pending Confirmation",
    "order.confirmed": "Confirmed",
    "order.preparing": "Preparing",
    "order.ready": "Ready for Delivery",
    "order.delivered": "Delivered",
    "order.cancelled": "Cancelled",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with our team",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.phone": "Your Phone",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.error": "Failed to send message. Please try again.",
    "contact.info": "Contact Information",
    "contact.address": "Address",
    "contact.working_hours": "Working Hours",

    // About
    "about.title": "About SeaBreeze Market",
    "about.subtitle": "Your trusted partner for premium seafood",
    "about.description":
      "We are passionate about bringing you the freshest, highest quality seafood from trusted sources. Our commitment to excellence and customer satisfaction has made us the preferred choice for seafood lovers.",
    "about.mission": "Our Mission",
    "about.mission_text":
      "To provide fresh, sustainable, and premium quality seafood with exceptional service and fast delivery.",
    "about.vision": "Our Vision",
    "about.vision_text":
      "To become the leading online seafood marketplace, connecting customers with the finest marine products.",
    "about.values": "Our Values",
    "about.quality": "Quality First",
    "about.freshness": "Always Fresh",
    "about.sustainability": "Sustainable Sourcing",
    "about.service": "Exceptional Service",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.try_again": "Try Again",
    "common.close": "Close",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.confirm": "Confirm",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.currency": "SAR",
    "common.select": "Select",
    "common.optional": "Optional",
    "common.required": "Required",

    // Footer
    "footer.about": "About Us",
    "footer.products": "Products",
    "footer.support": "Customer Support",
    "footer.follow": "Follow Us",
    "footer.newsletter": "Newsletter",
    "footer.newsletter_text":
      "Subscribe to get updates on new products and offers",
    "footer.subscribe": "Subscribe",
    "footer.rights": "All rights reserved ©",
    "footer.developed": "Developed By Zeyad Zahran In 2025.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.return": "Return Policy",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.products": "المنتجات",
    "nav.categories": "الأقسام",
    "nav.about": "من نحن",
    "nav.contact": "تواصل معنا",
    "nav.offers": "العروض الخاصة",
    "nav.cart": "السلة",
    "nav.account": "الحساب",
    "nav.search": "البحث عن المنتجات...",
    "nav.language": "English",

    // Home page
    "home.hero.title": "مأكولات بحرية طازجة توصل يومياً",
    "home.hero.subtitle": "جودة فائقة من أسماك ومأكولات بحرية من أفضل المصادر",
    "home.hero.cta": "تسوق الآن",
    "home.features.fresh": "صيد طازج يومياً",
    "home.features.delivery": "توصيل سريع",
    "home.features.quality": "جودة فاخرة",
    "home.featured_subtitle": "اكتشف تحديث أفضل المنتجات البحرية الطازجة",
    "home.featured": "المنتجات المميزة",
    "home.categories": "تسوق حسب القسم",
    "home.offers": "العروض الخاصة",
    "home.testimonials": "آراء عملائنا",

    // Categories
    "category.fish": "الأسماك",
    "category.shrimp": "الجمبري والربيان",
    "category.shellfish": "الرخويات والصدفيات",
    "category.meals": "الوجبات الجاهزة",
    "category.sides": "الأطباق الجانبية",
    "category.special_offers": "العروض الخاصة",
    "category.view_all": "عرض الكل",

    // Products
    "product.add_to_cart": "أضف للسلة",
    "product.out_of_stock": "نفذ المخزون",
    "product.weight": "الوزن",
    "product.price": "السعر",
    "product.original_price": "السعر الأصلي",
    "product.save": "وفر",
    "product.description": "الوصف",
    "product.preparation_time": "وقت التحضير",
    "product.minutes": "دقيقة",
    "product.kg": "كيلو",
    "product.per_kg": "للكيلو",

    // Cart
    "cart.title": "سلة التسوق",
    "cart.empty": "سلتك فارغة",
    "cart.empty_subtitle": "أضف بعض المأكولات البحرية اللذيذة للبدء",
    "cart.continue_shopping": "متابعة التسوق",
    "cart.item": "المنتج",
    "cart.quantity": "الكمية",
    "cart.price": "السعر",
    "cart.total": "المجموع",
    "cart.subtotal": "المجموع الفرعي",
    "cart.delivery": "التوصيل",
    "cart.discount": "الخصم",
    "cart.final_total": "المجموع النهائي",
    "cart.checkout": "إتمام الطلب",
    "cart.remove": "إزالة",
    "cart.update": "تحديث",
    "cart.free_delivery": "توصيل مجاني",
    "cart.free_delivery_note": "توصيل مجاني للطلبات أكثر من 250 ريال",

    // Checkout
    "checkout.title": "إتمام الطلب",
    "checkout.personal_info": "المعلومات الشخصية",
    "checkout.delivery_info": "معلومات التوصيل",
    "checkout.order_summary": "ملخص الطلب",
    "checkout.payment": "طريقة الدفع",
    "checkout.cash_on_delivery": "الدفع عند الاستلام",
    "checkout.place_order": "تأكيد الطلب",
    "checkout.processing": "جاري المعالجة...",
    "checkout.name": "الاسم الكامل",
    "checkout.email": "البريد الإلكتروني",
    "checkout.phone": "رقم الهاتف",
    "checkout.address": "عنوان التوصيل",
    "checkout.city": "المدينة",
    "checkout.notes": "ملاحظات الطلب (اختياري)",
    "checkout.delivery_date": "تاريخ التوصيل المفضل",
    "checkout.delivery_time": "الوقت المفضل",
    "checkout.morning": "صباحاً (9 ص - 12 ظ)",
    "checkout.afternoon": "بعد الظهر (12 ظ - 4 م)",
    "checkout.evening": "مساءً (4 م - 8 م)",

    // Order confirmation
    "order.success": "تم تأكيد الطلب بنجاح!",
    "order.success_message":
      "شكراً لك على طلبك. سنتواصل معك قريباً لتأكيد تفاصيل التوصيل.",
    "order.number": "رقم الطلب",
    "order.total": "مجموع الطلب",
    "order.status": "الحالة",
    "order.pending": "في انتظار التأكيد",
    "order.confirmed": "مؤكد",
    "order.preparing": "قيد التحضير",
    "order.ready": "جاهز للتوصيل",
    "order.delivered": "تم التوصيل",
    "order.cancelled": "ملغي",

    // Contact
    "contact.title": "تواصل معنا",
    "contact.subtitle": "تواصل مع فريقنا",
    "contact.name": "اسمك",
    "contact.email": "بريدك الإلكتروني",
    "contact.phone": "رقم هاتفك",
    "contact.subject": "الموضوع",
    "contact.message": "الرسالة",
    "contact.send": "إرسال الرسالة",
    "contact.sending": "جاري الإرسال...",
    "contact.success": "تم إرسال الرسالة بنجاح!",
    "contact.error": "فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.",
    "contact.info": "معلومات التواصل",
    "contact.address": "العنوان",
    "contact.working_hours": "ساعات العمل",

    // About
    "about.title": "حول سوق نسيم البحر",
    "about.subtitle": "شريكك الموثوق للمأكولات البحرية الفاخرة",
    "about.description":
      "نحن شغوفون بتقديم أطازج وأعلى جودة من المأكولات البحرية من مصادر موثوقة. التزامنا بالتميز ورضا العملاء جعلنا الخيار المفضل لمحبي المأكولات البحرية.",
    "about.mission": "رسالتنا",
    "about.mission_text":
      "تقديم مأكولات بحرية طازجة ومستدامة وعالية الجودة مع خدمة استثنائية وتوصيل سريع.",
    "about.vision": "رؤيتنا",
    "about.vision_text":
      "أن نصبح السوق الإلكتروني الرائد للمأكولات البحرية، نربط العملاء بأفضل المنتجات البحرية.",
    "about.values": "قيمنا",
    "about.quality": "الجودة أولاً",
    "about.freshness": "طازج دائماً",
    "about.sustainability": "مصادر مستدامة",
    "about.service": "خدمة استثنائية",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.try_again": "حاول مرة أخرى",
    "common.close": "إغلاق",
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.edit": "تعديل",
    "common.delete": "حذف",
    "common.confirm": "تأكيد",
    "common.back": "رجوع",
    "common.next": "التالي",
    "common.previous": "السابق",
    "common.search": "بحث",
    "common.filter": "تصفية",
    "common.sort": "ترتيب",
    "common.currency": "ريال",
    "common.select": "اختر",
    "common.optional": "اختياري",
    "common.required": "مطلوب",

    // Footer
    "footer.about": "من نحن",
    "footer.products": "المنتجات",
    "footer.support": "دعم العملاء",
    "footer.follow": "تابعنا",
    "footer.newsletter": "النشرة الإخبارية",
    "footer.newsletter_text":
      "اشترك للحصول على تحديثات المنتجات والعروض الجديدة",
    "footer.subscribe": "اشتراك",
    "footer.rights": "جميع الحقوق محفوظة ©",
    "footer.developed": "طور بواسطة زياد زهران 2025",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.return": "سياسة الإرجاع",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
    dir: language === "ar" ? ("rtl" as const) : ("ltr" as const),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
