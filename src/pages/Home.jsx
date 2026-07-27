import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FlourParticles } from '../components/FlourParticles';
import { DrippingIcing } from '../components/DrippingIcing';
import { ProductVisualizer } from '../components/ProductVisualizer';
import { Award, ShieldCheck, Heart, Leaf, Star, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/pages/home.css';
import { gsap } from 'gsap';


export const Home = () => {
  const { navigateTo, addToCart } = useContext(AppContext);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const triggerRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  // Detect mobile viewports
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP Entrance Animations for Room 1
  useEffect(() => {
    gsap.fromTo('.story-room-eyebrow', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo('.story-room-title', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.2, ease: 'power3.out' }
    );
    gsap.fromTo('.story-room-desc', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: 'power3.out' }
    );
    gsap.fromTo('.story-room-visual-wrap', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 0.4, ease: 'back.out(1.2)' }
    );
  }, []);


  // Storytelling Scenes Config
  const scenes = [
    {
      bg: 'var(--bg-scene-1)',
      eyebrow: 'Chapter I • Dusk & Cocoa',
      title: 'Le Grand Chocolat',
      desc: 'A triple-layered Belgian dark chocolate cake, enveloped in a rich velvet ganache. Topped with wild blackberries, a hint of sea salt, and delicate sheets of edible 24k gold leaf. Pure, dark indulgence.',
      visualType: 'layered-cake',
      color: '#3d251e',
      floaters: ['/chocolate_cake.png', '/chocolate_cake.png', '/chocolate_cake.png'],
      particleSpeed: 0.5,
      particleColor: '78, 52, 46'
    },
    {
      bg: 'var(--bg-scene-2)',
      eyebrow: 'Chapter II • Roses & Velvet',
      title: 'Blush Velvet Rose',
      desc: 'Delicate beetroot-infused pink velvet cupcakes, baked to a pillowy crumb. Crowned with a high swirl of organic rosewater buttercream frosting, dusted with crystallised rose petals. Elegant, sweet poetry.',
      visualType: 'cupcake',
      color: '#ffcdd2',
      floaters: ['/blush_cupcake.png', '/blush_cupcake.png', '/blush_cupcake.png'],
      particleSpeed: 0.3,
      particleColor: '201, 107, 74'
    },
    {
      bg: 'var(--bg-scene-3)',
      eyebrow: 'Chapter III • The Eighty-One Laminations',
      title: 'The Golden Lamination',
      desc: 'Our signature sourdough croissant, laminated eighty-one times with rich French AOP butter. Shatteringly crisp golden sheets outside, revealing a warm, buttery, honeycomb-layered interior. Freshly baked at sunrise.',
      visualType: 'croissant',
      color: '#e0a96d',
      floaters: ['/golden_croissant.png', '/golden_croissant.png', '/golden_croissant.png'],
      particleSpeed: 0.8,
      steam: true,
      particleColor: '78, 52, 46'
    },
    {
      bg: 'var(--bg-scene-4)',
      eyebrow: 'Chapter IV • Smoked Lava',
      title: 'Smoked Sea Salt Lava',
      desc: 'Brown-butter cookie dough packed with molten dark chocolate chunks that ooze with every bite. Toasted with mineral-rich flakes of Maldon sea salt for a smoky, sweet contrast. A comforting classic.',
      visualType: 'cookie',
      color: '#5d4037',
      floaters: ['/sea_salt_cookie.png', '/sea_salt_cookie.png', '/sea_salt_cookie.png'],
      particleSpeed: 0.4,
      crumbs: true,
      particleColor: '250, 247, 242'
    },
    {
      bg: 'var(--bg-scene-5)',
      eyebrow: 'Chapter V • Brunch Glories',
      title: 'Gilded Pistachio Ring',
      desc: 'A wild-fermented yeast-risen brioche donut, dipped in a rich glaze of Sicilian green pistachio cream. Adorned with crushed roasted pistachios and a delicate dusting of gold flakes. Fried to golden perfection.',
      visualType: 'donut',
      color: '#aed581',
      floaters: ['/pistachio_donut.png', '/pistachio_donut.png', '/pistachio_donut.png'],
      particleSpeed: 0.6,
      rotate: true,
      particleColor: '78, 52, 46'
    }
  ];

  // Calculate scroll progress in real-time
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const storyTop = rect.top + window.scrollY;
      const scrollPosition = window.scrollY - storyTop;
      const totalScrollHeight = rect.height - windowHeight;
      
      if (totalScrollHeight <= 0) return;
      
      const scrollPercent = Math.max(0, Math.min(1, scrollPosition / totalScrollHeight));
      const progress = scrollPercent * 4;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeScene = Math.max(0, Math.min(4, Math.round(scrollProgress)));

  const interpolateColor = (color1, color2, factor) => {
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getInterpolatedBg = () => {
    const hexColors = ['#FAF7F2', '#FFF0F2', '#E8D78B', '#4E342E', '#E2ECDE'];
    const idx = Math.floor(scrollProgress);
    const factor = scrollProgress - idx;
    
    if (idx >= 4) return hexColors[4];
    return interpolateColor(hexColors[idx], hexColors[idx + 1], factor);
  };

  const featuredBestsellers = products.slice(0, 4);

  const reviews = [
    {
      text: "The Basque Burnt Amber is a revelation. I have had burnt cheesecakes in San Sebastian, and Butter & Whisk matches them layer for layer. The wobble in the center is absolutely hypnotic.",
      author: "Nathalie R. • Connoisseur"
    },
    {
      text: "The Golden Lamination is a masterpiece. The crunch of the 81 buttery layers is music to my ears. I order a basket every Saturday morning without fail.",
      author: "Jean-Pierre • Pastry Critic"
    },
    {
      text: "Le Grand Chocolat was the absolute highlight of our anniversary. The 24k gold leaf details are breathtaking, and the dark ganache is rich yet perfectly balanced.",
      author: "Clara V. • Art Collector"
    },
    {
      text: "Their custom wedding cake consultation was so intimate and detailed. The Elderflower Eucalyptus cake was a floral dream come true.",
      author: "Eleanor & Julian • Newlyweds"
    }
  ];

  return (
    <div className="home-page page-transition-wrapper">
      {/* Storytelling Pinned Room (Scene 1 to 5) */}
      <div ref={containerRef} style={{ position: 'relative', height: '630vh', marginTop: 'calc(-1 * var(--header-height))' }}>
        <div 
          className="story-room-container" 
          style={{ 
            backgroundColor: scenes[activeScene]?.bg || 'var(--bg-scene-1)',
            color: activeScene === 3 ? 'var(--color-ivory)' : 'var(--color-cocoa)'
          }}
        >
          <FlourParticles count={70} speedFactor={scenes[activeScene].particleSpeed} color={scenes[activeScene].particleColor} />

          <div className="story-room-inner">
            {/* Copy Column */}
            <div key={activeScene} className="story-room-copy fade-in-slide-up">
              <p className="story-room-eyebrow" style={{ color: activeScene === 3 ? 'var(--color-butter)' : 'var(--color-terracotta)' }}>
                {scenes[activeScene].eyebrow}
              </p>
              <h2 className="story-room-title" style={{ color: activeScene === 3 ? '#fff' : 'inherit' }}>
                {scenes[activeScene].title}
              </h2>
              <p className="story-room-desc">
                {scenes[activeScene].desc}
              </p>
              <button 
                className="btn btn-primary" 
                style={{ 
                  backgroundColor: activeScene === 3 ? 'var(--color-butter)' : 'var(--color-cocoa)',
                  color: activeScene === 3 ? 'var(--color-cocoa)' : 'var(--color-ivory)',
                  borderColor: activeScene === 3 ? 'var(--color-butter)' : 'var(--color-cocoa)'
                }}
                onClick={() => navigateTo('shop')}
              >
                Order Scene Item
              </button>
            </div>

            {/* Visualizer Column */}
            <div className="story-room-visual-wrap" style={{ position: 'relative' }}>
              {scenes.map((scene, idx) => {
                const diff = scrollProgress - idx;
                if (Math.abs(diff) > 1.2) return null;
                
                const opacity = Math.max(0, 1 - Math.abs(diff));
                const scale = Math.max(0.7, 1 - Math.abs(diff) * 0.3);
                const spinDirection = idx % 2 === 0 ? -1 : 1;
                const rotate = diff * 45 * spinDirection; // Softer comfort rotation
                const imageSize = isMobile ? 240 : 520;
                const translateY = diff * (isMobile ? -30 : -160); // Parallax vertical separation
                
                return (
                  <div 
                    key={idx}
                    style={{ 
                      position: 'absolute',
                      width: imageSize,
                      height: imageSize,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: opacity,
                      transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                      pointerEvents: opacity > 0.5 ? 'auto' : 'none'
                    }}
                  >
                    <div className="story-room-image-float" style={{ width: '100%', height: '100%' }}>
                      <ProductVisualizer 
                        type={scene.visualType} 
                        size={imageSize} 
                        isStoryRoom={true}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floaters decoration */}
          <div className="story-room-floaters">
            <img 
              src={scenes[activeScene].floaters[0]} 
              alt="floater" 
              style={{ 
                position: 'absolute', 
                top: '10%', 
                left: '80%', 
                width: '60px', 
                height: '60px', 
                objectFit: 'cover', 
                borderRadius: '50%', 
                boxShadow: 'var(--shadow-md)',
                border: '2px solid var(--color-ivory)',
                transform: `translateY(${activeScene * -15}px) rotate(${activeScene * 12}deg)`,
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' 
              }} 
            />
            <img 
              src={scenes[activeScene].floaters[1]} 
              alt="floater" 
              style={{ 
                position: 'absolute', 
                top: '60%', 
                left: '5%', 
                width: '70px', 
                height: '70px', 
                objectFit: 'cover', 
                borderRadius: '50%', 
                boxShadow: 'var(--shadow-md)',
                border: '2px solid var(--color-ivory)',
                transform: `translateY(${activeScene * 20}px) rotate(${activeScene * -18}deg)`,
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' 
              }} 
            />
            <img 
              src={scenes[activeScene].floaters[2]} 
              alt="floater" 
              style={{ 
                position: 'absolute', 
                top: '80%', 
                left: '75%', 
                width: '50px', 
                height: '50px', 
                objectFit: 'cover', 
                borderRadius: '50%', 
                boxShadow: 'var(--shadow-md)',
                border: '2px solid var(--color-ivory)',
                transform: `translateY(${activeScene * -8}px) rotate(${activeScene * 6}deg)`,
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' 
              }} 
            />
          </div>

          {/* Steam Effect (Scene 3 - Croissants) */}
          {scenes[activeScene].steam && (
            <div className="steam-emitter">
              <div className="steam-cloud" style={{ animationDelay: '0s' }} />
              <div className="steam-cloud" style={{ animationDelay: '0.8s' }} />
              <div className="steam-cloud" style={{ animationDelay: '1.6s' }} />
            </div>
          )}

          {/* Cookie Crumbs Effect (Scene 4 - Cookies) */}
          {scenes[activeScene].crumbs && (
            <>
              <div className="cookie-crumb" style={{ top: '20%', left: '40%', animationDelay: '0s' }} />
              <div className="cookie-crumb" style={{ top: '30%', left: '70%', animationDelay: '1s' }} />
              <div className="cookie-crumb" style={{ top: '15%', left: '20%', animationDelay: '2s' }} />
            </>
          )}

          {/* Indicators */}
          <div className="story-room-markers">
            {scenes.map((_, idx) => (
              <span 
                key={idx} 
                className={activeScene === idx ? 'active' : ''} 
                onClick={() => {
                  triggerRefs[idx].current?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label={`Go to scene ${idx + 1}`}
              />
            ))}
          </div>
          
          <DrippingIcing color="var(--bg-primary)" position="bottom" />
        </div>

        {/* Scroll Triggers */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <div ref={triggerRefs[0]} className="story-room-trigger" style={{ height: '120vh' }} data-scene-index="0" />
          <div ref={triggerRefs[1]} className="story-room-trigger" style={{ height: '120vh' }} data-scene-index="1" />
          <div ref={triggerRefs[2]} className="story-room-trigger" style={{ height: '120vh' }} data-scene-index="2" />
          <div ref={triggerRefs[3]} className="story-room-trigger" style={{ height: '120vh' }} data-scene-index="3" />
          <div ref={triggerRefs[4]} className="story-room-trigger" style={{ height: '120vh' }} data-scene-index="4" />
        </div>
      </div>

      {/* 3. Freshly Baked Today Dynamic Marquee */}
      <section className="freshly-baked-marquee">
        <div className="footer-marquee" style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}>
          <div className="footer-marquee-track" style={{ animationDuration: '18s' }}>
            <span className="footer-marquee-text" style={{ fontSize: 'var(--fs-2xl)', color: 'var(--color-cocoa)', opacity: 0.9 }}>
              Fresh Sourdough Ready at 07:00 • Flaky Croissants Laminating Now • Hot Cardamom Buns out of the Oven • Custom Wedding Orders Booking for September
            </span>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (Editorial Principles) */}
      <section style={{ padding: 'var(--space-3xl) 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="shop-title-wrap">
            <p className="hero-eyebrow">our standards</p>
            <h2 className="shop-title">Principles of Butter & Whisk</h2>
            <p style={{ maxWidth: 500, margin: '0 auto' }}>We refuse short-cuts. We treat baking as a meticulous science and a fine culinary art.</p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <Award size={36} color="var(--color-terracotta)" style={{ marginBottom: 16 }} />
              <h3>81 Layers of Butter</h3>
              <p style={{ fontSize: 'var(--fs-sm)' }}>We use double-lamination folding techniques with French AOP butter for premium elasticity.</p>
            </div>
            <div className="process-card">
              <Leaf size={36} color="var(--color-olive)" style={{ marginBottom: 16 }} />
              <h3>Stone Ground Grains</h3>
              <p style={{ fontSize: 'var(--fs-sm)' }}>Our organic heirloom flours are cold-milled by stone decks, preserving vital nutrients.</p>
            </div>
            <div className="process-card">
              <ShieldCheck size={36} color="var(--color-cocoa)" style={{ marginBottom: 16 }} />
              <h3>Wild Ferments</h3>
              <p style={{ fontSize: 'var(--fs-sm)' }}>Our wild starter culture (Arthur) has fermented loaves for over half a century, easing digestion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Best Sellers */}
      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div className="shop-title-wrap">
            <p className="hero-eyebrow">curated collections</p>
            <h2 className="shop-title">Our Best Sellers</h2>
            <p style={{ maxWidth: 500, margin: '0 auto' }}>Curated selections loved by our daily visitors. Freshly baked every day.</p>
          </div>

          <div className="shop-grid">
            {featuredBestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <button className="btn btn-primary" onClick={() => navigateTo('shop')}>
              View Full Menu <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Custom Cake Section (Scene 6) */}
      <section className="container" style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="custom-cake-home">
          <div className="container custom-cake-grid">
            <div>
              <p className="hero-eyebrow" style={{ color: 'var(--color-butter)' }}>bespoke design</p>
              <h2 style={{ fontSize: 'var(--fs-4xl)', color: '#fff', fontFamily: 'var(--font-display)' }}>
                Bespoke Luxury Cakes
              </h2>
              <p style={{ color: 'rgba(250, 247, 242, 0.7)', fontSize: 'var(--fs-md)', lineHeight: 1.7 }}>
                Collaborate with our head designers to sculpt the perfect centerpiece for your wedding, 
                gala, or private milestone. We offer full consultations, tastings, and on-site assembly.
              </p>
              <button 
                className="btn btn-accent" 
                style={{ marginTop: 'var(--space-md)' }}
                onClick={() => navigateTo('contact')}
              >
                Request consultation
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div 
                className="bespoke-arch-frame"
                style={{ 
                  width: '280px', 
                  height: '340px', 
                  borderRadius: '140px 140px 24px 24px', 
                  overflow: 'hidden', 
                  border: '2px solid rgba(232, 215, 139, 0.3)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
                  backgroundColor: 'rgba(78, 52, 46, 0.5)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease'
                }}
              >
                <ProductVisualizer type="wedding-cake" size="100%" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. The Ordering Experience */}
      <section style={{ padding: 'var(--space-3xl) 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="shop-title-wrap">
            <p className="hero-eyebrow">simple & seamless</p>
            <h2 className="shop-title">The Ordering Experience</h2>
            <p style={{ maxWidth: 500, margin: '0 auto' }}>How to secure your freshly baked luxury pastries in four simple steps.</p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-card-step">01</div>
              <h3>Bespoke Selection</h3>
              <p style={{ fontSize: 'var(--fs-sm)' }}>Browse our curated digital collection of cakes, tarts, and hot morning bakes.</p>
            </div>
            <div className="process-card">
              <div className="process-card-step">02</div>
              <h3>Baked to Order</h3>
              <p style={{ fontSize: 'var(--fs-sm)' }}>Our master artisans bake your selected pastries fresh in the early morning hours.</p>
            </div>
            <div className="process-card">
              <div className="process-card-step">03</div>
              <h3>Luxury Packaging</h3>
              <p style={{ fontSize: 'var(--fs-sm)' }}>Pastries are hand-packed in temperature-controlled, gold-foiled presentation boxes.</p>
            </div>
            <div className="process-card">
              <div className="process-card-step">04</div>
              <h3>Same-Day Delivery</h3>
              <p style={{ fontSize: 'var(--fs-sm)' }}>Enjoy your pastries delivered warm to your doorstep, home, or private event venue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Meet Our Bakers */}
      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div className="shop-title-wrap">
            <p className="hero-eyebrow">master artisans</p>
            <h2 className="shop-title">Meet Our Bakers</h2>
            <p style={{ maxWidth: 500, margin: '0 auto' }}>Meet the dedicated craftsmen working through the night to bake your fresh morning slices.</p>
          </div>

          <div className="bakers-grid">
            <div className="baker-card">
              <div className="baker-avatar">
                <img src="/baker_louis.png" alt="Chef Louis Laurent" />
              </div>
              <h3>Chef Louis Laurent</h3>
              <p style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-terracotta)', fontWeight: 'bold' }}>Head of Pastry</p>
              <p style={{ fontSize: 'var(--fs-sm)', marginTop: '8px' }}>Trained in Paris under Michelin-starred masters. Expert in croissant laminations.</p>
            </div>
            <div className="baker-card">
              <div className="baker-avatar">
                <img src="/baker_silas.png" alt="Silas Thorne" />
              </div>
              <h3>Silas Thorne</h3>
              <p style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-terracotta)', fontWeight: 'bold' }}>Head Baker</p>
              <p style={{ fontSize: 'var(--fs-sm)', marginTop: '8px' }}>Arthur’s primary caretaker. Silas has managed sourdough ferments for 20 years.</p>
            </div>
            <div className="baker-card">
              <div className="baker-avatar">
                <img src="/baker_amara.png" alt="Amara Vance" />
              </div>
              <h3>Amara Vance</h3>
              <p style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-terracotta)', fontWeight: 'bold' }}>Creative Cake Designer</p>
              <p style={{ fontSize: 'var(--fs-sm)', marginTop: '8px' }}>Sculpts sugar gum roses that fool botanical gardens. Expert in edible gilding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Customer Reviews Testimonial Slider */}
      <section style={{ padding: 'var(--space-3xl) 0', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: 850, position: 'relative' }}>
          <div className="shop-title-wrap">
            <p className="hero-eyebrow">tales of taste</p>
            <h2 className="shop-title">Customer Chronicles</h2>
          </div>

          <div style={{ position: 'relative', minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 40px' }}>
            {/* Left Prev Button */}
            <button 
              onClick={() => setActiveReview(prev => (prev === 0 ? reviews.length - 1 : prev - 1))}
              style={{
                position: 'absolute',
                left: '-40px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-cocoa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px'
              }}
              aria-label="Previous review"
            >
              <ChevronLeft size={36} />
            </button>

            {/* Review Card Layout */}
            <div style={{ width: '100%', textAlign: 'center' }}>
              {reviews.map((rev, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: activeReview === idx ? 'block' : 'none',
                    opacity: activeReview === idx ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    fontStyle: 'italic',
                    fontSize: 'var(--fs-xl)',
                    color: 'var(--text-primary)',
                    lineHeight: 1.8
                  }}
                >
                  "{rev.text}"
                  <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-terracotta)', marginTop: 24, fontStyle: 'normal', letterSpacing: '0.08em' }}>
                    {rev.author}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Next Button */}
            <button 
              onClick={() => setActiveReview(prev => (prev === reviews.length - 1 ? 0 : prev + 1))}
              style={{
                position: 'absolute',
                right: '-40px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-cocoa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px'
              }}
              aria-label="Next review"
            >
              <ChevronRight size={36} />
            </button>
          </div>

          {/* Slider Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '28px' }}>
            {reviews.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveReview(idx)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: activeReview === idx ? 'var(--color-terracotta)' : 'transparent',
                  border: activeReview === idx ? '2px solid var(--color-terracotta)' : '2px solid var(--color-cocoa)',
                  opacity: activeReview === idx ? 1 : 0.3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Instagram Gallery */}
      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div className="shop-title-wrap">
            <p className="hero-eyebrow">social diary</p>
            <h2 className="shop-title">#ButterAndWhisk</h2>
            <p style={{ maxWidth: 500, margin: '0 auto' }}>Tag us in your morning coffee and baking pairings. We love sharing your stories.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
            {[
              { label: 'Layering cakes', img: '/chocolate_cake.png' },
              { label: 'Morning flouring', img: '/sourdough_bread.png' },
              { label: 'Oven blister', img: '/basque_cheesecake.png' },
              { label: 'Molten cookie core', img: '/sea_salt_cookie.png' },
              { label: 'Golden lamination', img: '/golden_croissant.png' }
            ].map((insta, idx) => (
              <div key={idx} className="baker-card" style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, overflow: 'hidden', position: 'relative' }}>
                <img src={insta.img} alt={insta.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(78, 52, 46, 0.8)', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 'var(--fs-sm)', textTransform: 'uppercase', fontWeight: 'bold', transition: 'var(--transition-fast)', zIndex: 10 }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0}>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> {insta.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Newsletter Card */}
      <section className="container" style={{ padding: 'var(--space-3xl) 0' }}>
        <div 
          style={{ 
            backgroundColor: 'var(--color-butter)', 
            padding: 'var(--space-3xl) var(--space-md)', 
            borderRadius: 'var(--radius-lg)', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-sm)'
          }}
        >
          <Sparkles size={36} color="var(--color-cocoa)" />
          <h2 style={{ fontSize: 'var(--fs-4xl)', fontFamily: 'var(--font-display)', margin: 0 }}>Join The Connoisseur Club</h2>
          <p style={{ maxWidth: 450, color: 'var(--color-cocoa)', opacity: 0.8 }}>
            Unlock exclusive pastry collections, holiday pre-ordering windows, and private tasting invitations.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, width: '100%', maxWidth: 400 }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{ padding: '12px 20px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-color)', backgroundColor: 'var(--color-ivory)', width: '100%', outline: 'none' }}
            />
            <button className="btn btn-primary" onClick={() => navigateTo('shop')}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};
