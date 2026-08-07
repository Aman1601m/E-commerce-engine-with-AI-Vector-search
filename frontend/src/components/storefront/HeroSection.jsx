import React from 'react';
import { Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section style={{ display: 'flex', margin: '2rem 5%', height: '500px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
      
      {/* Left Content */}
      <div style={{ flex: 1, backgroundColor: 'var(--store-primary)', color: 'white', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Background decorative circles */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '400px', height: '400px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>

        <div style={{ zIndex: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem', backdropFilter: 'blur(10px)' }}>
            <Zap size={16} color="var(--store-secondary)" /> SUMMER MEGA SALE
          </span>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-1px' }}>
            Unleash Your <br/> <span style={{ color: 'var(--store-secondary)' }}>Style.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', maxWidth: '400px' }}>
            Get up to 60% off on top electronics, premium sneakers, and modern apparel. Limited time offer!
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ backgroundColor: 'var(--store-secondary)', color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(255, 87, 34, 0.4)' }} className="hover-lift">
              Shop Sale
            </button>
            <button style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid white', padding: '1rem 2.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'background-color 0.2s' }}>
              View Collection
            </button>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div style={{ flex: 1, position: 'relative' }}>
        <img 
          src="/assets/ecommerce_hero.png" 
          alt="E-commerce Sale" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

    </section>
  );
};

export default HeroSection;
