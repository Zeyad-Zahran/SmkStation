import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Search, Filter } from 'lucide-react';

interface Product {
  id: string;
  name_en: string;
  name_ar: string;
  description_en?: string;
  description_ar?: string;
  price: number;
  original_price?: number;
  image_url?: string;
  is_featured?: boolean;
  weight_kg?: number;
  category: string;
  is_available?: boolean;
}

export default function Products() {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter(product => {
      const name = language === 'en' ? product.name_en : product.name_ar;
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'name':
        default:
          const nameA = language === 'en' ? a.name_en : a.name_ar;
          const nameB = language === 'en' ? b.name_en : b.name_ar;
          return nameA.localeCompare(nameB);
      }
    });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{t('products.title')}</h1>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t('products.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder={t('products.category')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('products.all_categories')}</SelectItem>
              <SelectItem value="fish">{t('category.fish')}</SelectItem>
              <SelectItem value="shrimp">{t('category.shrimp')}</SelectItem>
              <SelectItem value="shellfish">{t('category.shellfish')}</SelectItem>
              <SelectItem value="meals">{t('category.meals')}</SelectItem>
              <SelectItem value="sides">{t('category.sides')}</SelectItem>
              <SelectItem value="special_offers">{t('category.special_offers')}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder={t('products.sort_by')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">{t('products.sort_name')}</SelectItem>
              <SelectItem value="price_low">{t('products.sort_price_low')}</SelectItem>
              <SelectItem value="price_high">{t('products.sort_price_high')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name_en={product.name_en}
            name_ar={product.name_ar}
            description_en={product.description_en}
            description_ar={product.description_ar}
            price={product.price}
            original_price={product.original_price}
            image_url={product.image_url}
            is_featured={product.is_featured}
            weight_kg={product.weight_kg}
            category={product.category}
            is_available={product.is_available}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">{t('products.no_results')}</h3>
          <p className="text-muted-foreground">{t('products.try_different_search')}</p>
        </div>
      )}
    </div>
  );
}