import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, User, Fish, Heart } from 'lucide-react';
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
import cartIcon from '@/assets/cart-icon.png'
import searchIcon from '@/assets/search-icon.png'

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
      <header className="bg-[linear-gradient(135deg,#2C5AA0_0%,#1E3A8A_100%)] text-white border-b border-border shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 space-x-2 space-x-reverse">
              <div className="bg-[#00D4FF] py-2 px-[10px] rounded-full">
                SM
               </div>
              <div className="">
                <span className="font-bold text-sm md:text-lg ">
                   SmkStation Market
                 </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-white hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex w-80 max-w-80 ml-8">
              <div className="relative w-full bg-transparent [&>input::placeholder]:text-[#FFFFFFB2]">
                 <img src={searchIcon} alt=" search Icon" className='absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ' />
                <Input
                  type="text"
                  placeholder={t('nav.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 pl-4 bg-[#FFFFFF33] border-none rounded-full focus:ring-0 focus:outline-none "
                />
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center md:space-x-4 space-x-reverse">
              <LanguageSwitcher />
              
              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Heart className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                   <img src={cartIcon} alt="cart icon" className='w-5 h-5' />
                  {cartItemsCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side={language === 'ar' ? 'left' : 'right'} 
                  className="w-[300px] sm:w-[400px]"
                >
                  <div className="flex flex-col space-y-4 mt-8">
                    {/* Mobile search */}
                    <div className="relative md:hidden">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder={t('nav.search')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4"
                      />
                    </div>

                    {/* Mobile navigation */}
                    <nav className="flex flex-col space-y-2">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile account actions */}
                    <div className="flex flex-col space-y-2 pt-4 border-t">
                      <Button variant="ghost" className="justify-start">
                        <User className="h-4 w-4 mr-2" />
                        {t('nav.account')}
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                      </Button>
                    </div>
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
