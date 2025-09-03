import React, { useState } from 'react';
import { Search, ShoppingCart, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Heart } from "lucide-react";

export const Header: React.FC = () => {
  const { t, language } = useLanguage();
  const { getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.products') },
    { href: '/categories', label: t('nav.categories') },
    { href: '/offers', label: t('nav.offers') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const cartItemsCount = getTotalItems();

  return (
    <>
      {/* Main header */}
      <header className="bg-gradient-to-r from-[#2C5AA0] to-[#1E3A8A] sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
             <div className="flex items-center py-3 px-5 mr-2  justify-center rounded-full w-9 h-9 text-white font-bold text-sm bg-[#00D4FF]">
  SM
</div>

              <span className="text-[18px] font-bold text-white">
                SmkStation Market
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 ml-20">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-[13px] text-white font-normal hover:opacity-80 transition-opacity"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

         {/* Search Bar */}
<div className="hidden md:flex flex-1 max-w-md mx-6 ml-20">
  <div className="relative w-[240px]">
    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-white/70" />
    <Input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pr-9 pl-3 h-8 text-[12px] rounded-full 
                 bg-white/20 text-white 
                 placeholder:text-white/70 
                 placeholder:font-normal 
                 placeholder:leading-normal 
                 font-inter border-none 
                 focus:ring-2 focus:ring-white/30"
    />
  </div>
</div>


            {/* Right Side (Cart + Language + Mobile Menu) */}
           <div className="flex items-center gap-4 flex-row-reverse">
  

 

  {/* Cart (سلة المشتريات) */}
  <Link to="/cart">
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative text-white hover:bg-white/10 h-9 w-9"
    >
      <ShoppingCart className="h-5 w-5" />
      {cartItemsCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500"
        >
          {cartItemsCount}
        </Badge>
      )}
    </Button>
  </Link>
   {/* Wishlist (قلب) */}
  <Button 
    variant="ghost" 
    size="icon" 
    className="text-white hover:bg-white/10 h-9 w-9"
  >
    <Heart className="h-5 w-5" />
  </Button>
{/* Language Switcher */}
  <LanguageSwitcher />
  {/* Mobile Menu */}
  <Sheet>
    <SheetTrigger asChild>
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden text-white h-9 w-9"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent 
      side={language === 'ar' ? 'left' : 'right'} 
      className="w-[300px] sm:w-[400px] bg-gradient-to-r from-[#2C5AA0] to-[#1E3A8A] text-white border-none"
    >
      <div className="flex flex-col space-y-4 mt-8">
        {/* Mobile Search */}
        <div className="relative md:hidden">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 rounded-full bg-white/20 text-white placeholder-white/70 border-none"
          />
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </SheetContent>
  </Sheet>
</div>

          </div>
        </div>
      </header>
    </>
  );
};
