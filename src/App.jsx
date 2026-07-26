import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { Toast } from './components/Toast';
import { BackToTop } from './components/BackToTop';

// Page Imports
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Categories } from './pages/Categories';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { AboutUs } from './pages/AboutUs';
import { OurStory } from './pages/OurStory';
import { Gallery } from './pages/Gallery';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

const AppContent = () => {
  const { currentPage } = useContext(AppContext);

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product-details':
        return <ProductDetails />;
      case 'categories':
        return <Categories />;
      case 'wishlist':
        return <Wishlist />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'order-success':
        return <OrderSuccess />;
      case 'about-us':
        return <AboutUs />;
      case 'our-story':
        return <OurStory />;
      case 'gallery':
        return <Gallery />;
      case 'testimonials':
        return <Testimonials />;
      case 'contact':
        return <Contact />;
      case '404':
      default:
        return <NotFound />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        {renderActivePage()}
      </main>
      <Footer />
      
      {/* Absolute Overlays */}
      <QuickViewModal />
      <Toast />
      <BackToTop />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
