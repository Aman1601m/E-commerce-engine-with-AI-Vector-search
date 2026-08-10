import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Heart, Search as SearchIcon, ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlistItem } from '../store/wishlistSlice';
import toast from 'react-hot-toast';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        if (!query) {
          setProducts([]);
          setLoading(false);
          return;
        }
        
        // Ensure backend endpoint supports ?q=query
        const { data } = await axios.get(`http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`);
        
        // Handle cases where data.data is the array, or data.products is the array based on backend structure
        const results = data.data || data.products || [];
        setProducts(results);
      } catch (error) {
        console.error('Search failed', error);
        toast.error('Failed to fetch search results');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.discountPrice > 0 ? product.discountPrice : product.price,
      image: product.thumbnail || product.images?.[0],
      quantity: 1,
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

  return (
    <div style={{ padding: '3rem 5%', backgroundColor: 'var(--store-bg)', minHeight: '100vh' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={20} color="#4b5563" />
        </button>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--store-text)' }}>
          Search Results for <span style={{ color: 'var(--store-primary)' }}>"{query}"</span>
        </h1>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div className="loader" style={{ width: '40px', height: '40px', border: '4px solid #f3f4f6', borderTop: '4px solid var(--store-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ color: '#6b7280', fontWeight: 600 }}>Searching our catalog...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <SearchIcon size={64} color="#d1d5db" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--store-text)', marginBottom: '1rem' }}>No results found</h2>
          <p style={{ color: 'var(--store-text-light)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            We couldn't find any products matching "{query}". Try checking your spelling or using more general terms.
          </p>
          <button onClick={() => navigate('/')} style={{ padding: '0.75rem 2rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>
      ) : (
        <div>
          <p style={{ color: '#6b7280', marginBottom: '2rem', fontWeight: 600 }}>Found {products.length} {products.length === 1 ? 'product' : 'products'}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {products.map((product) => (
              <div 
                key={product._id} 
                onClick={() => handleCardClick(product._id)}
                style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', padding: '1.5rem', cursor: 'pointer', position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease, boxShadow 0.3s ease' }}
                className="hover-lift"
              >
                {product.discountPrice > 0 && (
                  <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', backgroundColor: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, zIndex: 1 }}>
                    SALE
                  </div>
                )}

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

                <div style={{ color: 'var(--store-text-light)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {product.category}
                </div>
                
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--store-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    {product.discountPrice > 0 ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--store-primary)' }}>{formatPrice(product.discountPrice)}</span>
                        <span style={{ fontSize: '0.9rem', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 600 }}>{formatPrice(product.price)}</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--store-primary)' }}>{formatPrice(product.price)}</span>
                    )}
                  </div>
                  
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--store-secondary)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
                    className="hover-scale"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
