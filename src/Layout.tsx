import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/LayoutComp/Header";
import Footer from "./component/LayoutComp/Footer";

const Layout: React.FC = () => {
    return (
        <div>
            <Header />

            <main>
                <Outlet /> {/* 各ページのコンテンツがここに表示される */}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
