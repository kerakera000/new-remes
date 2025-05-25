// App.tsx
import React from "react";
import { AlertProvider } from "./context/AlertContext";
import { ModalProvider } from "./context/ModalContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Layout from "./Layout";
import Home from "./pages/Home";
import Mypage from "./pages/Mypage";
import Contact from "./pages/Contact";
import Lineup from "./pages/Lineup";
import Category from "./pages/Lineup/Category";
import Detail from "./pages/Detail";
import Form from "./pages/Form";
import Check from "./pages/Check";
import Success from "./pages/Success";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import LegalNotice from "./pages/LegalNotice";

// 保護されたルートコンポーネント
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {

  return (
    <AuthProvider>
      <AlertProvider>
        <ModalProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="mypage" element={
                  <ProtectedRoute>
                    <Mypage />
                  </ProtectedRoute>
                } />
                <Route path="contact" element={<Contact />} />
                <Route path="lineup" element={<Lineup />} >
                  <Route path="category" element={<Category />} />
                </Route>
                <Route path="detail/:id" element={<Detail />} />
                <Route path="form" element={
                  <ProtectedRoute>
                    <Form />
                  </ProtectedRoute>
                } />
                <Route path="check" element={
                  <ProtectedRoute>
                    <Check />
                  </ProtectedRoute>
                } />
                <Route path="success" element={
                  <ProtectedRoute>
                    <Success />
                  </ProtectedRoute>
                } />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms-of-service" element={<TermsOfService />} />
                <Route path="legal-notice" element={<LegalNotice />} />
              </Route>
            </Routes>
          </Router>
        </ModalProvider>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
