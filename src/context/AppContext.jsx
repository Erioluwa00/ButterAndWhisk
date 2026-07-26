import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeProductId, setActiveProductId] = useState(null);
  const [activeBlogId, setActiveBlogId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load initial settings
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      showToast('Dark elegance activated', 'info');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      showToast('Creamy light theme activated', 'info');
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const navigateTo = (page, params = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
    if (params.productId) {
      setActiveProductId(params.productId);
      addToRecentlyViewed(params.productId);
    }
    if (params.blogId) {
      setActiveBlogId(params.blogId);
    }
    if (params.category) {
      setSelectedCategory(params.category);
    }
  };

  const toggleWishlist = (productId) => {
    let msg = '';
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      msg = 'Removed from wishlist';
    } else {
      setWishlist(prev => [...prev, productId]);
      msg = 'Added to wishlist';
    }
    showToast(msg, 'success');
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        showToast(`Updated ${product.name} quantity in cart`, 'success');
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      showToast(`Added ${product.name} to cart`, 'success');
      return [...prevCart, { product, quantity }];
    });
  };

  const updateCartQty = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.product.id === productId);
      if (item) {
        showToast(`Removed ${item.product.name} from cart`, 'info');
      }
      return prevCart.filter(item => item.product.id !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const addToRecentlyViewed = (productId) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 6);
    });
  };

  const applyCoupon = (code) => {
    const uppercaseCode = code.toUpperCase();
    if (uppercaseCode === 'SWEET10') {
      setCouponCode(uppercaseCode);
      setDiscountPercent(10);
      showToast('Coupon "SWEET10" applied! 10% off', 'success');
      return true;
    } else if (uppercaseCode === 'BUTTER20') {
      setCouponCode(uppercaseCode);
      setDiscountPercent(20);
      showToast('Coupon "BUTTER20" applied! 20% off', 'success');
      return true;
    } else {
      showToast('Invalid coupon code', 'error');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        activeProductId,
        activeBlogId,
        darkMode,
        wishlist,
        cart,
        recentlyViewed,
        toast,
        quickViewProduct,
        couponCode,
        discountPercent,
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        toggleDarkMode,
        showToast,
        navigateTo,
        toggleWishlist,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        applyCoupon,
        setQuickViewProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
