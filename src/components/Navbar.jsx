import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, Heart, ShoppingBag, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import '../styles/components/navbar.css';

export const Navbar = () => {
  const { 
    currentPage, 
    navigateTo, 
    cart, 
    wishlist, 
    darkMode, 
    toggleDarkMode, 
    searchQuery, 
    setSearchQuery,
    setSelectedCategory
  } = useContext(AppContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigateTo('shop');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigateTo('shop');
  };

  const menuItems = [
    { name: 'Shop', page: 'shop' },
    { 
      name: 'Categories', 
      page: 'categories',
      mega: true 
    },
    { name: 'Gallery', page: 'gallery' },
    { name: 'Our Story', page: 'our-story' },
    { name: 'Contact', page: 'contact' }
  ];

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => navigateTo('home')}>
          <span className="navbar-brand-dot"></span>
          <span>Butter & Whisk</span>
        </div>

        {/* Desktop Menu */}
        <nav>
          <ul className="navbar-menu">
            {menuItems.map((item) => (
              <li 
                key={item.name} 
                className={`navbar-menu-item ${currentPage === item.page ? 'active' : ''}`}
              >
                <span 
                  className="navbar-menu-link" 
                  onClick={() => navigateTo(item.page)}
                >
                  {item.name} {item.mega && <ChevronDown size={12} style={{ marginLeft: 2 }} />}
                </span>

                {item.mega && (
                  <div className="navbar-megamenu">
                    <div className="megamenu-column">
                      <h4 className="megamenu-column-title">Signature Cakes</h4>
                      <ul className="megamenu-column-list">
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Birthday Cakes')}>Birthday Cakes</li>
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Wedding Cakes')}>Wedding Cakes</li>
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Cheesecakes')}>Cheesecakes</li>
                      </ul>
                    </div>
                    <div className="megamenu-column">
                      <h4 className="megamenu-column-title">French Pastries</h4>
                      <ul className="megamenu-column-list">
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Croissants')}>Croissants</li>
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Pastries')}>Croissants & Danishes</li>
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Macarons')}>Macarons Box</li>
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Tarts')}>Lemon & Fruit Tarts</li>
                      </ul>
                    </div>
                    <div className="megamenu-column">
                      <h4 className="megamenu-column-title">Sweet Treats</h4>
                      <ul className="megamenu-column-list">
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Cupcakes')}>Gourmet Cupcakes</li>
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Donuts')}>Sicilian Donuts</li>
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Cookies')}>Chewy Lava Cookies</li>
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Pies')}>Seasonal Custard Pies</li>
                      </ul>
                    </div>
                    <div className="megamenu-column">
                      <h4 className="megamenu-column-title">Daily Hearth</h4>
                      <ul className="megamenu-column-list">
                        <li className="megamenu-column-link" onClick={() => handleCategoryClick('Bread')}>Stone-Deck Sourdough</li>
                        <li className="megamenu-column-link" onClick={() => navigateTo('about-us')}>Our Baking Standards</li>
                        <li className="megamenu-column-link" onClick={() => navigateTo('gallery')}>Visual Art Gallery</li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Search, Theme, Cart, Wishlist, Mobile Ham */}
        <div className="navbar-actions">
          <form className="navbar-search-wrapper" onSubmit={handleSearchSubmit}>
            <Search size={16} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search bakery..." 
              className="navbar-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Theme Toggle */}
          <button 
            className="navbar-btn" 
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Wishlist */}
          <button 
            className="navbar-btn" 
            onClick={() => navigateTo('wishlist')}
            aria-label="View wishlist"
          >
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="navbar-btn-counter">{wishlist.length}</span>
            )}
          </button>

          {/* Cart */}
          <button 
            className="navbar-btn" 
            onClick={() => navigateTo('cart')}
            aria-label="View cart"
          >
            <ShoppingBag size={18} />
            {totalCartItems > 0 && (
              <span className="navbar-btn-counter">{totalCartItems}</span>
            )}
          </button>

          {/* Hamburger (Mobile) */}
          <button 
            className="navbar-btn navbar-hamburger" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
          <button 
            className="navbar-btn mobile-menu-close" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          <ul className="mobile-menu-list">
            {menuItems.map((item) => (
              <li key={item.name}>
                <span 
                  className="mobile-menu-link" 
                  onClick={() => {
                    navigateTo(item.page);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
