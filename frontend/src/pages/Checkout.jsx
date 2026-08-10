import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { saveShippingAddress, savePaymentMethod, clearCart } from '../store/cartSlice';
import { CheckCircle, Truck, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { items, totalPrice, shippingAddress, paymentMethod } = useSelector((state) => state.cart);
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  
  // Step 1: Address Form State
  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });

  // Step 3: Order Status State
  const [orderInfo, setOrderInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
    } else if (items.length === 0 && step < 3) {
      navigate('/cart');
    }
  }, [isAuthenticated, items.length, navigate, step]);

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
    const selected = user.addresses[index];
    setAddressForm({
      street: selected.street,
      city: selected.city,
      state: selected.state,
      zipCode: selected.zipCode,
      country: selected.country,
    });
  };

  const handleNextStep1 = (e) => {
    e.preventDefault();
    if (!addressForm.street || !addressForm.city || !addressForm.zipCode) {
      toast.error('Please fill in all address fields');
      return;
    }
    dispatch(saveShippingAddress(addressForm));
    setStep(2);
  };

  const handleNextStep2 = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    handlePlaceOrder();
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      const orderData = {
        orderItems: items.map(item => ({
          product: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        shippingAddress: addressForm,
        paymentMethod: paymentMethod || "CashOnDelivery",
        itemsPrice: totalPrice,
        taxPrice: totalPrice * 0.18,
        shippingPrice: 500,
        totalPrice: totalPrice + (totalPrice * 0.18) + 500
      };

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const { data } = await axios.post('http://localhost:5000/api/orders', orderData, config);
      
      setOrderInfo(data.data); // data.data is the order object from backend
      dispatch(clearCart());
      setStep(3);
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  const renderStepper = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: step >= 1 ? 'var(--store-primary)' : '#9ca3af' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: step >= 1 ? 'var(--store-primary)' : '#f3f4f6', color: step >= 1 ? 'white' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '0.5rem' }}><Truck size={20} /></div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Shipping</span>
        </div>
        <div style={{ flex: 1, height: '2px', backgroundColor: step >= 2 ? 'var(--store-primary)' : '#e5e7eb', margin: '0 1rem', transform: 'translateY(-10px)' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: step >= 2 ? 'var(--store-primary)' : '#9ca3af' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: step >= 2 ? 'var(--store-primary)' : '#f3f4f6', color: step >= 2 ? 'white' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '0.5rem' }}><CreditCard size={20} /></div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Payment</span>
        </div>
        <div style={{ flex: 1, height: '2px', backgroundColor: step >= 3 ? 'var(--store-primary)' : '#e5e7eb', margin: '0 1rem', transform: 'translateY(-10px)' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: step >= 3 ? 'var(--store-primary)' : '#9ca3af' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: step >= 3 ? 'var(--store-primary)' : '#f3f4f6', color: step >= 3 ? 'white' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '0.5rem' }}><CheckCircle size={20} /></div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Status</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '3rem 5%', backgroundColor: 'var(--store-bg)', minHeight: '100vh' }}>
      
      {renderStepper()}

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ flex: '1 1 600px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            
            {/* STEP 1: ADDRESS */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--store-text)' }}>1. Shipping Address</h2>
                
                {user?.addresses?.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#4b5563', marginBottom: '1rem' }}>Select a saved address:</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                      {user.addresses.map((address, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleAddressSelect(idx)}
                          style={{ border: selectedAddressIndex === idx ? '2px solid var(--store-primary)' : '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem', cursor: 'pointer', backgroundColor: selectedAddressIndex === idx ? '#f5f3ff' : 'white', transition: 'all 0.2s' }}
                        >
                          <p style={{ margin: '0 0 0.25rem 0', fontWeight: 700, fontSize: '0.9rem' }}>{user.firstName} {user.lastName}</p>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>{address.street}, {address.city}, {address.state} {address.zipCode}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#4b5563', marginBottom: '1rem', borderTop: user?.addresses?.length > 0 ? '1px solid #eaeaea' : 'none', paddingTop: user?.addresses?.length > 0 ? '1.5rem' : 0 }}>
                  {user?.addresses?.length > 0 ? 'Or enter a new address:' : 'Enter shipping details:'}
                </p>

                <form onSubmit={handleNextStep1}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4b5563' }}>Name</label>
                      <input type="text" value={`${user?.firstName || ''} ${user?.lastName || ''}`} disabled style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: '#f3f4f6' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4b5563' }}>Phone</label>
                      <input type="text" value={user?.phone || 'Not provided'} disabled style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: '#f3f4f6' }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4b5563' }}>Street Address</label>
                    <input type="text" value={addressForm.street} onChange={(e) => setAddressForm({...addressForm, street: e.target.value})} required placeholder="123 Main St, Apartment 4B" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4b5563' }}>City</label>
                      <input type="text" value={addressForm.city} onChange={(e) => setAddressForm({...addressForm, city: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4b5563' }}>State</label>
                      <input type="text" value={addressForm.state} onChange={(e) => setAddressForm({...addressForm, state: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4b5563' }}>Zip Code</label>
                      <input type="text" value={addressForm.zipCode} onChange={(e) => setAddressForm({...addressForm, zipCode: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                    </div>
                  </div>

                  <button type="submit" style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    Continue to Payment <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2: PAYMENT */}
            {step === 2 && (
              <div>
                <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1.5rem', fontWeight: 600 }}>
                  <ArrowLeft size={16} /> Back to Address
                </button>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--store-text)' }}>2. Payment Options</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  <div 
                    onClick={() => dispatch(savePaymentMethod('CashOnDelivery'))}
                    style={{ border: paymentMethod === 'CashOnDelivery' ? '2px solid var(--store-primary)' : '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: paymentMethod === 'CashOnDelivery' ? '#f5f3ff' : 'white' }}
                  >
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: paymentMethod === 'CashOnDelivery' ? '6px solid var(--store-primary)' : '2px solid #d1d5db' }}></div>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Cash on Delivery (COD)</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>Pay with cash upon delivery.</p>
                    </div>
                  </div>

                  <div 
                    style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.5, cursor: 'not-allowed' }}
                  >
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #d1d5db' }}></div>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Credit / Debit Card</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>Card payments are temporarily disabled.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleNextStep2} 
                  disabled={isProcessing}
                  style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--store-secondary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: isProcessing ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isProcessing ? 0.7 : 1 }}
                >
                  {isProcessing ? 'Processing Order...' : 'Place Order'} <CheckCircle size={18} />
                </button>
              </div>
            )}

            {/* STEP 3: CONFIRMATION */}
            {step === 3 && orderInfo && (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle size={80} color="#10b981" style={{ margin: '0 auto 1.5rem auto' }} />
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--store-text)', marginBottom: '0.5rem' }}>Order Placed!</h2>
                <p style={{ color: 'var(--store-text-light)', fontSize: '1.1rem', marginBottom: '2rem' }}>Your order has been successfully processed.</p>
                
                <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #e5e7eb', display: 'inline-block', textAlign: 'left', minWidth: '300px' }}>
                  <p style={{ margin: '0 0 0.75rem 0', color: '#6b7280' }}>Order ID: <span style={{ fontWeight: 800, color: 'var(--store-text)', marginLeft: '0.5rem' }}>{orderInfo._id}</span></p>
                  <p style={{ margin: '0 0 0.75rem 0', color: '#6b7280' }}>Status: <span style={{ fontWeight: 700, backgroundColor: '#e0e7ff', color: '#3730a3', padding: '4px 10px', borderRadius: '20px', marginLeft: '0.5rem', fontSize: '0.85rem' }}>{orderInfo.status || 'Processing'}</span></p>
                  <p style={{ margin: '0', color: '#6b7280' }}>Total Amount: <span style={{ fontWeight: 800, color: 'var(--store-text)', marginLeft: '0.5rem' }}>{formatPrice(orderInfo.totalPrice)}</span></p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <Link to="/account">
                    <button style={{ padding: '1rem 2rem', backgroundColor: 'white', color: 'var(--store-text)', border: '2px solid #e5e7eb', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Track Order</button>
                  </Link>
                  <Link to="/">
                    <button style={{ padding: '1rem 2rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Continue Shopping</button>
                  </Link>
                </div>
              </div>
            )}
            
          </div>
        </div>

        {/* ORDER SUMMARY (Sidebar) */}
        {step < 3 && (
          <div style={{ flex: '1 1 350px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1.5rem 0', borderBottom: '1px solid #eaeaea', paddingBottom: '1rem' }}>Order Summary</h3>
              
              <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: '#f8f9fa', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={item.image} alt={item.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{formatPrice(item.totalPrice)}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--store-text-light)', fontSize: '0.9rem' }}>
                <span>Subtotal</span>
                <span style={{ color: 'var(--store-text)', fontWeight: 600 }}>{formatPrice(totalPrice)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--store-text-light)', fontSize: '0.9rem' }}>
                <span>Tax (18%)</span>
                <span style={{ color: 'var(--store-text)', fontWeight: 600 }}>{formatPrice(totalPrice * 0.18)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--store-text-light)', fontSize: '0.9rem' }}>
                <span>Shipping</span>
                <span style={{ color: 'var(--store-text)', fontWeight: 600 }}>{formatPrice(500)}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eaeaea', paddingTop: '1.5rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>Total</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--store-primary)' }}>
                  {formatPrice(totalPrice + (totalPrice * 0.18) + 500)}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Checkout;
