import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import { PageTransition } from './components/Animations';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import BookNow from './pages/BookNow';
import NailCare from './pages/NailCare';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Account from './pages/Account';
import { PrivacyPolicy, TermsConditions, CookiePolicy } from './pages/Legal';

function LayoutWrapper() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  if (isAdmin) return <Admin />;
  return (
    <Layout>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/book" element={<BookNow />} />
          <Route path="/nail-care" element={<NailCare />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cookies" element={<CookiePolicy />} />
        </Routes>
      </PageTransition>
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<LayoutWrapper />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
