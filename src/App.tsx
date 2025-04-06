// App.tsx
import React from "react";
import { AlertProvider } from "./context/AlertContext";
import { ModalProvider } from "./context/ModalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Mypage from "./pages/Mypage";
import Contact from "./pages/Contact";
import Lineup from "./pages/Lineup";
import Category from "./pages/Lineup/Category";

const App: React.FC = () => {

  return (
    <AlertProvider>
      <ModalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="mypage" element={<Mypage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="lineup" element={<Lineup />} >
                <Route path="category" element={<Category />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ModalProvider>
    </AlertProvider>
  );
};

export default App;
