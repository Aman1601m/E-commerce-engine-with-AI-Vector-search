import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, HeartCrack } from 'lucide-react';
import { fetchWishlist, toggleWishlistItem } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { items, isLoading } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.discountPrice > 0 ? product.discountPrice : product.price,
      image: product.thumbnail || product.images[0],
      quantity: 1,
    }));
    toast.success(`${product.name} added to cart`);
  };

  const handleRemove = (productId) => {
    dispatch(toggleWishlistItem({ productId, isAdded: true }));
    toast.success('Removed from wishlist');
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--store-bg)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--store-text)' }}>Please Log In</h2>
        <p style={{ color: 'var(--store-text-light)', fontSize: '1.1rem', marginBottom: '2rem' }}>You need to be logged in to view your wishlist.</p>
        <Link to="/login">
          <button className="store-btn" style={{ padding: '1rem 2rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
            Login Now
          </button>
        </Link>
      </div>
    );
  }

  if (isLoading && items.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'var(--store-text-light)' }}>Loading wishlist...</h2>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--store-bg)' }}>
        <HeartCrack size={64} color="#d1d5db" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--store-text)' }}>Your Wishlist is Empty</h2>
        <p style={{ color: 'var(--store-text-light)', fontSize: '1.1rem', marginBottom: '2rem' }}>Save items you love to review them later.</p>
        <Link to="/">
          <button className="store-btn" style={{ padding: '1rem 2rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
            Discover Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '4rem 5%', backgroundColor: 'var(--store-bg)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--store-text)', marginBottom: '2rem' }}>My Wishlist ({items.length})</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {items.map(product => (
          <div key={product._id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '1rem' }}>
              <div style={{ width: '100%', height: '200px', backgroundColor: '#f8f9fa', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', marginBottom: '1rem' }}>
                <img src={product.thumbnail || product.images?.[0]} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>{product.name}</h3>
              <p style={{ color: 'var(--store-primary)', fontWeight: 800, margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                {formatPrice(product.discountPrice > 0 ? product.discountPrice : product.price)}
              </p>
            </Link>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
              <button 
                onClick={() => handleAddToCart(product)}
                style={{ flex: 1, padding: '0.75rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button 
                onClick={() => handleRemove(product._id)}
                style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                title="Remove from Wishlist"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
