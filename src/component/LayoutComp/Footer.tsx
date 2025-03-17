import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"

import vectorWhite from '../../assets/footer/Vectorwhite.svg';
import vector from '../../assets/footer/Vector.svg';
import logoWhite from '../../assets/footer/logowhite.svg';

const Footer: React.FC = () => {
    const location = useLocation();

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

    return (
        <footer className="footer">
            <div className="cont1">
                <h2 className="cont1__title">
                    レンタルで手軽に
                    <br />
                    ハイスペックPCを手に入れよう
                </h2>
                <div className="cont1__buttons">
                    <Link to="/contact" className="btn">
                        お問い合わせ
                        <img className="defaultimg" src={vectorWhite} alt="" />
                        <img className="hoverimg" src={vector} alt="" />
                    </Link>

                    <a href="#RENTAL" className="btn">
                        レンタルする
                        <img className="defaultimg" src={vectorWhite} alt="" />
                        <img className="hoverimg" src={vector} alt="" />
                    </a>
                </div>
            </div>

            <div className="cont2">
                <div className="link_box">
                    <img src={logoWhite} alt="Logo" />

                    <div className="cont2__linkbox">
                        <div className="cont2__linkbox__pagelink">
                            <Link to={{ pathname: "/", hash: "#ABOUT" }} className="link">サービス内容</Link>
                            <Link to={{ pathname: "/", hash: "#RENTAL" }} className="link">商品紹介</Link>
                            <Link to={{ pathname: "/", hash: "#FAQ" }} className="link">よくある質問</Link>
                            <Link to="/contact" className="link">お問い合わせ</Link>
                        </div>

                        <div className="cont2__linkbox__information">
                            <a className="link" href="">公式Instagram</a>
                            <div className="infobox">
                                <a className="link" href="">プライバシーポリシー</a>
                                <a className="link" href="">特定商取引に関する表記</a>
                            </div>
                        </div>
                    </div>
                </div>

                <a className="copyright" href="https://www.solvide.net/">
                    Copyright © 2024 solvide
                </a>
            </div>
        </footer>

    );
};

export default Footer;
