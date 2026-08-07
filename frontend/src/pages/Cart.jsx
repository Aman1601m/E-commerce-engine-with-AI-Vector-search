import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Cart = () => {
  const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart);
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      return;
    }
    
    setIsCheckingOut(true);
    try {
      const orderData = {
        orderItems: items.map(item => ({
          product: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        shippingAddress: {
          address: "123 Main St",
          city: "Mumbai",
          postalCode: "400001",
          country: "India"
        },
        paymentMethod: "CashOnDelivery",
        itemsPrice: totalPrice,
        taxPrice: totalPrice * 0.18,
        shippingPrice: 500,
        totalPrice: totalPrice + (totalPrice * 0.18) + 500
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.post('http://localhost:5000/api/orders', orderData, config);
      
      setOrderPlaced(true);
      dispatch(clearCart());
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (orderPlaced) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--store-bg)' }}>
        <CheckCircle size={64} color="var(--store-secondary)" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--store-text)' }}>Order Confirmed!</h2>
        <p style={{ color: 'var(--store-text-light)', fontSize: '1.1rem', marginBottom: '2rem' }}>Thank you for shopping with Nexus.</p>
        <Link to="/">
          <button className="store-btn" style={{ padding: '1rem 2rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--store-bg)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--store-text)' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--store-text-light)', fontSize: '1.1rem', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
        <Link to="/">
          <button className="store-btn" style={{ padding: '1rem 2rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '4rem 5%', backgroundColor: 'var(--store-bg)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--store-text)', marginBottom: '2rem' }}>Shopping Cart ({totalQuantity})</h1>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Cart Items */}
        <div style={{ flex: '1 1 600px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #eaeaea' }}>
                <div style={{ width: '100px', height: '100px', backgroundColor: '#f8f9fa', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
                  <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>{item.name}</h3>
                  <p style={{ color: 'var(--store-primary)', fontWeight: 800, margin: '0 0 1rem 0' }}>{formatPrice(item.price)}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--store-text-light)' }}>Qty: {item.quantity}</span>
                    <button onClick={() => dispatch(removeFromCart(item.id))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>
                  {formatPrice(item.totalPrice)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ flex: '1 1 350px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1.5rem 0' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--store-text-light)' }}>
              <span>Subtotal</span>
              <span style={{ color: 'var(--store-text)', fontWeight: 600 }}>{formatPrice(totalPrice)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--store-text-light)' }}>
              <span>Tax (18%)</span>
              <span style={{ color: 'var(--store-text)', fontWeight: 600 }}>{formatPrice(totalPrice * 0.18)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--store-text-light)' }}>
              <span>Shipping</span>
              <span style={{ color: 'var(--store-text)', fontWeight: 600 }}>{formatPrice(500)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderTop: '1px solid #eaeaea', paddingTop: '1.5rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>Total</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--store-primary)' }}>
                {formatPrice(totalPrice + (totalPrice * 0.18) + 500)}
              </span>
            </div>

            <button 
              onClick={handleCheckout} 
              disabled={isCheckingOut}
              style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--store-secondary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 700, cursor: isCheckingOut ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isCheckingOut ? 0.7 : 1, transition: 'transform 0.2s' }}
              className="hover-lift"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'} <ArrowRight size={20} />
            </button>
            {!isAuthenticated && (
              <p style={{ textAlign: 'center', color: '#ef4444', fontSize: '0.85rem', marginTop: '1rem', fontWeight: 600 }}>You must be logged in to checkout.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
