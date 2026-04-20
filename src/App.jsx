import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyWorkPage from './pages/MyWorkPage';

function App() {
  return (
    <Router>
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 md:pt-15">
        <Navbar />
      </div>
      
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-work" element={<MyWorkPage />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
