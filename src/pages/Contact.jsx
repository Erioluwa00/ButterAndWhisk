import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import '../styles/pages/contact.css';

export const Contact = () => {
  const { showToast } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !msg) return;

    showToast(`Thank you, ${name}! Our team will contact you shortly.`, 'success');
    setName('');
    setEmail('');
    setSubject('');
    setMsg('');
  };

  return (
    <div className="contact-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'Contact', page: 'contact' }]} />

      <div className="contact-title-wrap">
        <h1 style={{ fontSize: 'var(--fs-5xl)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Consultations & Contact</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Get in touch for custom wedding commissions, catering inquiries, or general support.</p>
      </div>

      <div className="contact-grid">
        {/* Info Column & Map */}
        <div className="contact-info-column">
          <div className="contact-card-item">
            <div className="contact-card-icon">
              <MapPin size={20} />
            </div>
            <div className="contact-card-detail">
              <h3>The Baking Room</h3>
              <p>108 Wheatflour Way, Suite B, London, UK</p>
            </div>
          </div>

          <div className="contact-card-item">
            <div className="contact-card-icon">
              <Phone size={20} />
            </div>
            <div className="contact-card-detail">
              <h3>Telephone</h3>
              <p>+44 20 7946 0958</p>
            </div>
          </div>

          <div className="contact-card-item">
            <div className="contact-card-icon">
              <Mail size={20} />
            </div>
            <div className="contact-card-detail">
              <h3>Electronic Mail</h3>
              <p>bakers@butterandwhisk.com</p>
            </div>
          </div>

          <div className="contact-card-item">
            <div className="contact-card-icon">
              <Clock size={20} />
            </div>
            <div className="contact-card-detail">
              <h3>Baking Hours</h3>
              <p>Tuesday — Saturday: 07:00 — 16:00</p>
              <p style={{ opacity: 0.6, fontSize: 'var(--fs-xs)' }}>Closed Sunday and Monday for fermentation rest.</p>
            </div>
          </div>

          {/* Interactive Vector Map */}
          <div className="contact-map-wrap">
            <svg viewBox="0 0 400 250" className="contact-map-svg" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="250" fill="var(--color-beige)" />
              {/* Streets lines */}
              <line x1="0" y1="50" x2="400" y2="50" stroke="var(--color-ivory)" strokeWidth="8" />
              <line x1="0" y1="180" x2="400" y2="180" stroke="var(--color-ivory)" strokeWidth="12" />
              <line x1="120" y1="0" x2="120" y2="250" stroke="var(--color-ivory)" strokeWidth="10" />
              <line x1="300" y1="0" x2="300" y2="250" stroke="var(--color-ivory)" strokeWidth="8" />
              {/* Park patches */}
              <rect x="20" y="70" width="80" height="90" rx="4" fill="var(--color-olive)" opacity="0.15" />
              <rect x="140" y="10" width="140" height="30" rx="4" fill="var(--color-olive)" opacity="0.15" />
              {/* Pin */}
              <g className="contact-map-pin" transform="translate(120, 110)">
                <circle cx="0" cy="0" r="10" fill="var(--color-terracotta)" opacity="0.3" />
                <path d="M0,-16 C-6,-16 -10,-12 -10,-6 C-10,2 0,14 0,14 C0,14 10,2 10,-6 C10,-12 6,-16 0,-16 Z" fill="var(--color-terracotta)" stroke="var(--color-cocoa)" strokeWidth="1.5" />
                <circle cx="0" cy="-6" r="4.5" fill="var(--color-ivory)" />
              </g>
            </svg>
          </div>
        </div>

        {/* Contact Form Card */}
        <form className="contact-form-card" onSubmit={handleSubmit}>
          <h2 className="contact-form-title">Consultation Request</h2>
          <p className="contact-form-desc">Provide details of your custom cake orders or private event consultations. Our bakers read requests daily.</p>
          
          <div className="contact-form-group">
            <label>Full Name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="contact-form-input" />
          </div>

          <div className="contact-form-group">
            <label>Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="contact-form-input" />
          </div>

          <div className="contact-form-group">
            <label>Subject</label>
            <input type="text" required value={subject} onChange={e => setSubject(e.target.value)} className="contact-form-input" />
          </div>

          <div className="contact-form-group">
            <label>Detailed Request</label>
            <textarea required value={msg} onChange={e => setMsg(e.target.value)} className="contact-form-input contact-form-textarea" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Send size={14} /> Send Inquiry
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
