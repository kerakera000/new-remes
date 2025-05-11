// App.tsx
import React from "react";
import { AlertProvider } from "./context/AlertContext";
import { ModalProvider } from "./context/ModalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";

import Layout from "./Layout";
import Home from "./pages/Home";
import Mypage from "./pages/Mypage";
import Contact from "./pages/Contact";
import Lineup from "./pages/Lineup";
import Category from "./pages/Lineup/Category";
import Detail from "./pages/Detail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import LegalNotice from "./pages/LegalNotice";

const App: React.FC = () => {

  return (
    <AlertProvider>
      <ModalProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="mypage" element={<Mypage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="lineup" element={<Lineup />} >
                <Route path="category" element={<Category />} />
              </Route>
              <Route path="detail/:id" element={<Detail />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="legal-notice" element={<LegalNotice />} />
            </Route>
          </Routes>
        </Router>
      </ModalProvider>
    </AlertProvider>
  );
};

export default App;
