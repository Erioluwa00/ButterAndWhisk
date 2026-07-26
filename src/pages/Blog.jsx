import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { blogs } from '../data/blogs';
import { Breadcrumb } from '../components/Breadcrumb';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import '../styles/pages/blog.css';

export const Blog = () => {
  const { navigateTo } = useContext(AppContext);
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchWord, setSearchWord] = useState('');

  const tags = ['All', 'Technique', 'Bread', 'Design', 'Fermentation', 'Lamination'];

  const filteredBlogs = blogs.filter(post => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchWord.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchWord.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="blog-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'Journal', page: 'blog' }]} />

      <div className="blog-title-wrap">
        <h1 style={{ fontSize: 'var(--fs-5xl)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>The Baking Journal</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Insights, recipes, and detailed technique guides directly from our flour kitchens.</p>
      </div>

      {/* Toolbar Search / Tags */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 'var(--space-xl)' }}>
        <div className="gallery-filters" style={{ margin: 0 }}>
          {tags.map(tag => (
            <button
              key={tag}
              className={`gallery-filter-btn ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="navbar-search-wrapper" style={{ width: 250 }}>
          <Search size={16} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search journal..." 
            className="navbar-search-input"
            value={searchWord}
            onChange={e => setSearchWord(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="blog-grid">
          {filteredBlogs.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-image-wrap">
                <span style={{ fontSize: 'var(--fs-5xl)' }}>
                  {post.tags.includes('Bread') ? '🥖' : post.tags.includes('Technique') ? '🥐' : '🎂'}
                </span>
              </div>

              <div className="blog-card-info">
                <div className="blog-card-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <User size={12} /> {post.author}
                  </span>
                </div>

                <h3 
                  className="blog-card-title"
                  onClick={() => navigateTo('blog-details', { blogId: post.id })}
                >
                  {post.title}
                </h3>
                
                <p className="blog-card-excerpt">{post.excerpt}</p>

                <button 
                  className="blog-card-btn"
                  onClick={() => navigateTo('blog-details', { blogId: post.id })}
                >
                  Read Article <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="shop-no-results">
          <div className="shop-no-results-icon">📝🚫</div>
          <h3>No articles matched your search</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)', marginTop: 8 }}>
            Try searching for terms like "lamination", "starter", or "sugar".
          </p>
        </div>
      )}
    </div>
  );
};
