import React from "react";
import { Globe } from "lucide-react";
import { Button } from "./button";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="language-switch font-medium"
    >
      {t("nav.language")}
    </Button>
  );
};
