import React from 'react';
import HeroSection from '../components/storefront/HeroSection';
import FeaturedCategories from '../components/storefront/FeaturedCategories';
import ProductGrid from '../components/storefront/ProductGrid';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedCategories />
      <ProductGrid />
    </div>
  );
};

export default Home;
