import React from "react";
import { ArrowRight, Truck, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Clock,
      title: t("home.features.fresh"),
      description:
        language === "en"
          ? "Sourced daily from trusted fishermen\nto guarantee freshness and quality"
          : "مصدر يومياً من صيادين موثوقين\nلضمان الطازجة والجودة",
    },
    {
      icon: Truck,
      title: t("home.features.delivery"),
      description:
        language === "en"
          ? "Same day delivery available\nproducts arrive fresh to your doorstep"
          : "توصيل في نفس اليوم متاح\nتوصيل المنتجات الطازجة لباب منزلك",
    },
    {
      icon: Award,
      title: t("home.features.quality"),
      description:
        language === "en"
          ? "Guaranteed freshness and quality\nwith careful inspection of every piece"
          : "ضمان الطازجية والجودة\nمع مراقبة كاملة لكل قطعة",
    },
  ];

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      <div className="h-full w-full relative mx-auto flex flex-col">
        <div className="flex-[2] relative min-h-[calc(100vh-80px)] md:min-h-[420px]">
          <img
            src="fishcover.png"
            alt="fishcover"
            className="object-cover md:object-fill w-full h-full absolute md:bottom-[3px]"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 p-4 md:p-8 rounded-[20px] max-w-4xl w-[90%]">
            <h1 className="text-[#212D6E] text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight text-center">
              {t("home.hero.title")}
            </h1>
            <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 text-[#212D6E] font-semibold max-w-2xl mx-auto leading-relaxed text-center">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center my-6 md:my-8">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-essential rounded-[20px] text-[white] font-bold text-base hover:scale-105 px-4 py-2 w-full sm:w-auto"
                >
                  {t("home.hero.cta")}
                  <ArrowRight className="h-5 w-5 font-bold" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  size="lg"
                  className="bg-common rounded-[20px] text-essential font-bold text-base px-4 py-2 hover:scale-105 w-full sm:w-auto"
                >
                  {t("home.categories")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1] ">
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-sm rounded-xl p-6 border border-essential flex flex-col items-center justify-center w-fit mx-auto min-w-[300px]"
              >
                <div className="bg-essential rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-essential text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-essential text-sm whitespace-pre-line text-center font-normal">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
