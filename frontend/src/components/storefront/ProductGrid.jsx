import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Check, Heart } from 'lucide-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlistItem } from '../../store/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data.products || []); 
      } catch (error) {
        console.error("Failed to fetch products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.thumbnail
    }));
    toast.success(`${product.name} added to cart!`, { icon: '🛒' });
  };

  const handleToggleWishlist = (e, product) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please login to save items to your wishlist');
      return;
    }
    const isAdded = wishlistItems.some(item => item._id === product._id);
    dispatch(toggleWishlistItem({ productId: product._id, isAdded }));
    
    if (isAdded) {
      toast.success('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  if (loading) {
    return <div style={{ padding: '3rem 5%', textAlign: 'center', color: 'var(--store-text)' }}>Loading amazing products...</div>;
  }

  return (
    <section style={{ padding: '3rem 5% 6rem 5%', backgroundColor: 'var(--store-bg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--store-text)', margin: 0 }}>Recommended for You</h2>
        <button style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>View All</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {products.map((product) => (
          <div key={product._id} onClick={() => handleCardClick(product._id)} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1rem', border: '1px solid #eaeaea', position: 'relative', transition: 'box-shadow 0.3s', cursor: 'pointer' }} className="hover-lift">
            
            {/* Tags */}
            {product.discountPrice > 0 && (
              <span style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: 'var(--store-secondary)', color: 'white', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', padding: '4px 8px', borderRadius: '4px', zIndex: 10 }}>
                Sale
              </span>
            )}

            {/* Image */}
            <div 
              style={{ width: '100%', height: '220px', backgroundColor: '#f8f9fa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', marginBottom: '1.25rem', position: 'relative', overflow: 'hidden' }}
            >
              <img 
                src={product.thumbnail || product.images?.[0]} 
                alt={product.name} 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                className="product-img"
              />
              
              {/* Wishlist Heart Overlay */}
              <button 
                onClick={(e) => handleToggleWishlist(e, product)}
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 2 }}
              >
                <Heart 
                  size={18} 
                  color={wishlistItems?.some(item => item._id === product._id) ? '#ef4444' : '#6b7280'} 
                  fill={wishlistItems?.some(item => item._id === product._id) ? '#ef4444' : 'none'} 
                />
              </button>
            </div>

            {/* Content */}
            <div>
              <p style={{ color: 'var(--store-text-light)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{product.brand}</p>
              <h3 style={{ color: 'var(--store-text)', fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{product.averageRating}</span>
                <span style={{ color: 'var(--store-text-light)', fontSize: '0.8rem' }}>({product.totalReviews})</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ color: 'var(--store-primary)', fontWeight: 800, fontSize: '1.25rem' }}>
                    {formatPrice(product.discountPrice > 0 ? product.discountPrice : product.price)}
                  </div>
                  {product.discountPrice > 0 && (
                    <div style={{ color: 'var(--store-text-light)', textDecoration: 'line-through', fontSize: '0.8rem' }}>
                      {formatPrice(product.price)}
                    </div>
                  )}
                </div>
                <button onClick={(e) => handleAddToCart(e, product)} style={{ backgroundColor: 'var(--store-bg)', border: 'none', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--store-primary)'; e.currentTarget.children[0].style.color = 'white'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--store-bg)'; e.currentTarget.children[0].style.color = 'var(--store-primary)'; }}>
                  <ShoppingCart size={18} color="var(--store-primary)" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
