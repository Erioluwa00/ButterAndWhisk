import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Skeleton } from '../components/Skeleton';
import '../styles/pages/shop.css';

export const Shop = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useContext(AppContext);
  const [maxPrice, setMaxPrice] = useState(350);
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(false);

  // Trigger brief skeletons when filters change for luxury feedback
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  const categoriesList = [
    'All',
    'Birthday Cakes',
    'Wedding Cakes',
    'Cupcakes',
    'Donuts',
    'Cookies',
    'Croissants',
    'Bread',
    'Pastries',
    'Pies',
    'Tarts',
    'Macarons',
    'Cheesecakes'
  ];

  // Filtering
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'featured') {
      if (a.badge === 'Best Seller') return -1;
      if (b.badge === 'Best Seller') return 1;
      return 0;
    }
    return 0;
  });

  // Count items per category helper
  const getCategoryCount = (cat) => {
    if (cat === 'All') return products.length;
    return products.filter(p => p.category === cat).length;
  };

  return (
    <div className="shop-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'Shop', page: 'shop' }]} />
      
      <div className="shop-title-wrap">
        <h1 className="shop-title">The Pastry Vault</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Explore our range of fresh, stone-baked culinary creations.</p>
      </div>

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h4 className="filter-title">Pastry Categories</h4>
            <ul className="filter-categories-list">
              {categoriesList.map(cat => (
                <li key={cat}>
                  <button 
                    className={`filter-category-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>{cat}</span>
                    <span className="filter-category-count">{getCategoryCount(cat)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">Price Ceiling</h4>
            <input 
              type="range" 
              min="5" 
              max="350" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-range-slider"
            />
            <div className="price-range-label">
              <span>Min: $5</span>
              <span>Max: ${maxPrice}</span>
            </div>
          </div>
        </aside>

        {/* Mobile Filters Collapsible Row */}
        <div className="shop-mobile-filters">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="shop-sort-select"
            style={{ flexGrow: 1 }}
          >
            {categoriesList.map(cat => (
              <option key={cat} value={cat}>{cat} ({getCategoryCount(cat)})</option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="shop-sort-select"
          >
            <option value="featured">Best Sellers</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Main Shop Content Area */}
        <div>
          {/* Toolbar */}
          <div className="shop-toolbar">
            <div>
              Showing {sortedProducts.length} results of {products.length} pastries
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="navbar-menu">
              <span>Sort By:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="shop-sort-select"
              >
                <option value="featured">Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Grid & Fallback */}
          {loading ? (
            <Skeleton type="product" count={6} />
          ) : sortedProducts.length > 0 ? (
            <div className="shop-grid">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="shop-no-results">
              <div className="shop-no-results-icon">🥐🚫</div>
              <h3>No baking sheets matched your parameters</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)', marginTop: 8 }}>
                Try relaxing your price filters or searching for other premium pastries.
              </p>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setMaxPrice(350);
                }}
                style={{ marginTop: 16 }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
