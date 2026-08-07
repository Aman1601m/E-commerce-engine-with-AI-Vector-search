import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, ArrowLeft, Truck, ShieldCheck, Clock } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data.data);
      } catch (error) {
        console.error("Failed to fetch product details", error);
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product._id,
        name: product.name,
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        image: product.thumbnail
      }));
      toast.success(`${product.name} added to cart!`, { icon: '🛒' });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  if (loading) {
    return <div style={{ padding: '4rem 5%', textAlign: 'center', minHeight: '60vh', color: 'var(--store-text)' }}>Loading product details...</div>;
  }

  if (!product) {
    return (
      <div style={{ padding: '4rem 5%', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--store-text)' }}>Product Not Found</h2>
        <button onClick={() => navigate(-1)} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Go Back
        </button>
      </div>
    );
  }

  const currentPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

  return (
    <div style={{ padding: '4rem 5%', backgroundColor: 'var(--store-bg)', minHeight: '100vh' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--store-text-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '2rem', fontSize: '1rem', fontWeight: 600 }}>
        <ArrowLeft size={20} /> Back to Products
      </button>

      <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', backgroundColor: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        
        {/* Left: Product Image */}
        <div style={{ flex: '1 1 400px', backgroundColor: '#f8f9fa', borderRadius: '12px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {product.discountPrice > 0 && (
            <span style={{ position: 'absolute', top: '2rem', left: '2rem', backgroundColor: 'var(--store-secondary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Sale
            </span>
          )}
          <img src={product.thumbnail} alt={product.name} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        </div>

        {/* Right: Product Details */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: 'var(--store-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            {product.brand}
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--store-text)', marginBottom: '1rem', lineHeight: 1.2 }}>
            {product.name}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b' }}>
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{product.averageRating}</span>
            <span style={{ color: 'var(--store-text-light)' }}>({product.totalReviews} reviews)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--store-primary)', lineHeight: 1 }}>
              {formatPrice(currentPrice)}
            </span>
            {product.discountPrice > 0 && (
              <span style={{ fontSize: '1.25rem', color: 'var(--store-text-light)', textDecoration: 'line-through', fontWeight: 600, marginBottom: '4px' }}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p style={{ color: 'var(--store-text-light)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <button 
              onClick={handleAddToCart}
              style={{ flex: 1, backgroundColor: 'var(--store-secondary)', color: 'white', border: 'none', padding: '1.25rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s' }}
              className="hover-lift"
            >
              <ShoppingCart size={22} /> Add to Cart
            </button>
          </div>

          {/* Features */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderTop: '1px solid #eaeaea', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--store-text)' }}>
              <div style={{ backgroundColor: '#e0e7ff', padding: '0.75rem', borderRadius: '50%', color: 'var(--store-primary)' }}><Truck size={24} /></div>
              <div>
                <h4 style={{ margin: 0, fontWeight: 700 }}>Free Shipping</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--store-text-light)' }}>On orders over ₹5000</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--store-text)' }}>
              <div style={{ backgroundColor: '#e0e7ff', padding: '0.75rem', borderRadius: '50%', color: 'var(--store-primary)' }}><ShieldCheck size={24} /></div>
              <div>
                <h4 style={{ margin: 0, fontWeight: 700 }}>2 Year Warranty</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--store-text-light)' }}>100% Genuine</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--store-text)' }}>
              <div style={{ backgroundColor: '#e0e7ff', padding: '0.75rem', borderRadius: '50%', color: 'var(--store-primary)' }}><Clock size={24} /></div>
              <div>
                <h4 style={{ margin: 0, fontWeight: 700 }}>24/7 Support</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--store-text-light)' }}>Always here for you</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
