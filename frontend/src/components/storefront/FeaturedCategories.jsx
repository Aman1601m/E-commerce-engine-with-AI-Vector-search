import React from 'react';

const categories = [
  { id: 1, name: 'Sneakers', image: '/assets/sneaker.png', color: '#ffe4e6' },
  { id: 2, name: 'Watches', image: '/assets/watch.png', color: '#e0e7ff' },
  { id: 3, name: 'Headphones', image: '/assets/ecommerce_hero.png', color: '#fef3c7' },
  { id: 4, name: 'Laptops', image: '/assets/watch.png', color: '#dcfce7' },
  { id: 5, name: 'Gaming', image: '/assets/sneaker.png', color: '#f3e8ff' },
  { id: 6, name: 'Cameras', image: '/assets/ecommerce_hero.png', color: '#ffedd5' },
];

const FeaturedCategories = () => {
  return (
    <section style={{ padding: '3rem 5%', backgroundColor: 'white' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--store-text)', marginBottom: '2rem' }}>Shop by Category</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        {categories.map((cat) => (
          <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer', minWidth: '120px' }} className="hover-lift">
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid transparent', transition: 'border 0.3s' }} onMouseOver={(e) => e.currentTarget.style.border = '2px solid var(--store-primary)'} onMouseOut={(e) => e.currentTarget.style.border = '2px solid transparent'}>
              <img src={cat.image} alt={cat.name} style={{ width: '80%', height: '80%', objectFit: 'contain', transition: 'transform 0.3s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <span style={{ fontWeight: 600, color: 'var(--store-text)', fontSize: '0.95rem' }}>{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
