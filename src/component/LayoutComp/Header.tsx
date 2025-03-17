import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { useAuth } from '../../context/AuthContext';
import { useModal } from "../../context/ModalContext";
import { setCookie } from '../../utils/cookies';

import logoBlack from "../../assets/haeder/logoblack.png";
import logoWhite from "../../assets/haeder/logowhite.svg";
import Vectorwhite from "../../assets/haeder/Vectorwhite.svg";
import Vectorred from "../../assets/haeder/Vectorred.svg";

const Header: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    const { user, loading } = useAuth();
    const { openModal } = useModal();

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    // ハッシュが変更されたら該当する要素にスクロールする
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    // マイページとお問い合わせに遷移する時にページトップにスクロール
    useEffect(() => {
        if (location.pathname === "/mypage" || location.pathname === "/contact") {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    // Linkをクリックした際にisActiveをfalseにする関数
    const handleLinkClick = () => {
        if (isActive) {
            setIsActive(false);
        }
    };

    // マイページのリンクをクリックしたときの処理
    const handleMypageClick = (event: React.MouseEvent) => {
        if (!user) {
            // サインインしていない場合、リンクのデフォルトの動作をキャンセルしてopenModalを実行
            event.preventDefault();
            setCookie('nextpage', 'mypage', 1);
            openModal('auth');
        } else {
            handleLinkClick();
        }

    };

    if (loading) {
        return (
            <header className="header">
                <Link to="/" className="logo" onClick={handleLinkClick}>
                    <img src={logoBlack} alt="Logo" />
                </Link>

                <div className={`buttons ${isActive ? "active" : ""}`} onClick={toggleActive}>
                    <span className="button button1"></span>
                    <span className="button button2"></span>
                    <span className="button button3"></span>
                </div>

                <nav className={`header__nav ${isActive ? "active" : ""}`}>
                    <Link to="/" className="item logo" onClick={handleLinkClick}>
                        <img src={logoWhite} alt="Logo" />
                    </Link>

                    <Link to={{ pathname: "/", hash: "#FAQ" }} className="item" onClick={handleLinkClick}>
                        認証確認・・・
                        <img className="white" src={Vectorwhite} alt=">" />
                    </Link>

                    <Link to={{ pathname: "/", hash: "#ABOUT" }} className="item" onClick={handleLinkClick}>
                        サービス内容
                        <img className="white" src={Vectorwhite} alt=">" />
                    </Link>

                    <Link to={{ pathname: "/", hash: "#FAQ" }} className="item" onClick={handleLinkClick}>
                        よくある質問
                        <img className="white" src={Vectorwhite} alt=">" />
                    </Link>

                    <Link to="/" className="item-typesp" onClick={handleLinkClick}>
                        公式Instagram
                        <img className="white" src={Vectorwhite} alt=">" />
                    </Link>

                    <Link to="/" className="item-typesp" onClick={handleLinkClick}>
                        プライバシーポリシー
                        <img className="white" src={Vectorwhite} alt=">" />
                    </Link>

                    <Link to="/" className="item-typesp" onClick={handleLinkClick}>
                        特定商取引に関する表記
                        <img className="white" src={Vectorwhite} alt=">" />
                    </Link>

                    <Link to="/contact" className="item" onClick={handleLinkClick}>
                        お問い合わせ
                        <img className="white" src={Vectorwhite} alt=">" />
                    </Link>

                    <Link to={{ pathname: "/", hash: "#RENTAL" }} className="rental" onClick={handleLinkClick}>
                        ラインナップ
                        <img className="white" src={Vectorwhite} alt=">" />
                        <img className="red" src={Vectorred} alt=">" />
                    </Link>
                </nav>
            </header>
        ); // 認証状態を確認中の表示
    }


    return (
        <header className="header">
            <Link to="/" className="logo" onClick={handleLinkClick}>
                <img src={logoBlack} alt="Logo" />
            </Link>

            <div className={`buttons ${isActive ? "active" : ""}`} onClick={toggleActive}>
                <span className="button button1"></span>
                <span className="button button2"></span>
                <span className="button button3"></span>
            </div>

            <nav className={`header__nav ${isActive ? "active" : ""}`}>
                <Link to="/" className="item logo" onClick={handleLinkClick}>
                    <img src={logoWhite} alt="Logo" />
                </Link>

                {/* 認証状態に応じて表示を切り替える */}
                <Link to="/mypage" className="item mypage" onClick={handleMypageClick}>
                    {user ? "マイページ" : "サインイン"}
                </Link>

                <Link to={{ pathname: "/", hash: "#ABOUT" }} className="item" onClick={handleLinkClick}>
                    サービス内容
                    <img className="white" src={Vectorwhite} alt=">" />
                </Link>

                <Link to={{ pathname: "/", hash: "#FAQ" }} className="item" onClick={handleLinkClick}>
                    よくある質問
                    <img className="white" src={Vectorwhite} alt=">" />
                </Link>

                <Link to="/" className="item-typesp" onClick={handleLinkClick}>
                    公式Instagram
                    <img className="white" src={Vectorwhite} alt=">" />
                </Link>

                <Link to="/" className="item-typesp" onClick={handleLinkClick}>
                    プライバシーポリシー
                    <img className="white" src={Vectorwhite} alt=">" />
                </Link>

                <Link to="/" className="item-typesp" onClick={handleLinkClick}>
                    特定商取引に関する表記
                    <img className="white" src={Vectorwhite} alt=">" />
                </Link>

                <Link to="/contact" className="item contact" onClick={handleLinkClick}>
                    お問い合わせ
                    <img className="white" src={Vectorwhite} alt=">" />
                </Link>

                <Link to={{ pathname: "/", hash: "#RENTAL" }} className="rental" onClick={handleLinkClick}>
                    ラインナップ
                    <img className="white" src={Vectorwhite} alt=">" />
                    <img className="red" src={Vectorred} alt=">" />
                </Link>
            </nav>
        </header>
    );
};

export default Header;
