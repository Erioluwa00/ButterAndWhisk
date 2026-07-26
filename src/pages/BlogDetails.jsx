import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { blogs } from '../data/blogs';
import { Breadcrumb } from '../components/Breadcrumb';
import { Calendar, User, Clock, ArrowLeft, Send } from 'lucide-react';
import '../styles/pages/blog.css';

export const BlogDetails = () => {
  const { activeBlogId, navigateTo, showToast } = useContext(AppContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  
  // Form states
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (!activeBlogId) return;
    const found = blogs.find(b => b.id === activeBlogId);
    setPost(found);
    setComments(found?.comments || []);
    setCommentName('');
    setCommentText('');
  }, [activeBlogId]);

  if (!post) {
    return (
      <div className="container" style={{ padding: 'var(--space-3xl) var(--space-md)', textAlign: 'center' }}>
        <h3>Loading Article...</h3>
      </div>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentName || !commentText) return;

    const newComment = {
      author: commentName,
      comment: commentText,
      date: 'Just now'
    };

    setComments(prev => [...prev, newComment]);
    showToast('Comment submitted for approval!', 'success');
    setCommentName('');
    setCommentText('');
  };

  return (
    <div className="blog-details-page container page-transition-wrapper">
      <Breadcrumb 
        paths={[
          { name: 'Journal', page: 'blog' },
          { name: post.title, page: 'blog-details', params: { blogId: post.id } }
        ]} 
      />

      <button 
        className="btn btn-secondary" 
        onClick={() => navigateTo('blog')}
        style={{ border: 'none', padding: 0, marginBottom: 'var(--space-md)' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-xs)' }}>
          <ArrowLeft size={14} /> Back to journal
        </span>
      </button>

      <article>
        {/* Header */}
        <header className="blog-details-header">
          <div className="blog-details-meta">
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={14} /> {post.date}</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={14} /> {post.author}</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} /> {post.readTime}</span>
          </div>
          <h1 className="blog-details-title">{post.title}</h1>
        </header>

        {/* Cover visualizer */}
        <div className="blog-details-cover-wrap">
          <span style={{ fontSize: '7rem' }}>
            {post.tags.includes('Bread') ? '🥖' : post.tags.includes('Technique') ? '🥐' : '🎂'}
          </span>
        </div>

        {/* Body Content */}
        <div className="blog-details-body">
          {/* Split paragraphs and format subtitles */}
          {post.content.split('\n\n').map((para, idx) => {
            const trimmed = para.trim();
            if (trimmed.startsWith('###')) {
              return <h3 key={idx}>{trimmed.replace('###', '')}</h3>;
            }
            return <p key={idx}>{trimmed}</p>;
          })}
        </div>

        {/* Tag row */}
        <div className="blog-details-tags">
          {post.tags.map((t, idx) => (
            <span key={idx} className="blog-tag">#{t}</span>
          ))}
        </div>
      </article>

      {/* Comments section */}
      <section style={{ marginTop: 'var(--space-3xl)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-3xl)' }}>Comments ({comments.length})</h3>
        
        <div className="details-reviews-list" style={{ marginTop: 'var(--space-md)' }}>
          {comments.length > 0 ? (
            comments.map((com, idx) => (
              <div key={idx} className="details-review-card" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginBottom: 4 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{com.author}</strong>
                  <span>{com.date}</span>
                </div>
                <p style={{ fontSize: 'var(--fs-sm)', fontStyle: 'italic', margin: 0 }}>"{com.comment}"</p>
              </div>
            ))
          ) : (
            <p style={{ fontStyle: 'italic', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>No comments have been posted. Be the first to share your thoughts!</p>
          )}
        </div>

        {/* Add comment Form */}
        <form className="details-review-form" onSubmit={handleCommentSubmit} style={{ marginTop: 'var(--space-xl)' }}>
          <h4>Join The Discussion</h4>
          <div className="contact-form-group">
            <label>Your Name</label>
            <input 
              type="text" 
              className="details-review-form-input" 
              value={commentName}
              onChange={e => setCommentName(e.target.value)}
              required
            />
          </div>
          <div className="contact-form-group">
            <label>Comment</label>
            <textarea 
              className="details-review-form-input details-review-form-textarea"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Send size={14} /> Submit Comment
          </button>
        </form>
      </section>
    </div>
  );
};
