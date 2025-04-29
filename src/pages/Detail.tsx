import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useModal } from "../context/ModalContext";
import { setCookie } from '../utils/cookies';

import shopitemImg from "../assets/items/shopitem.svg";
import product1Img from "../assets/items/detailproduct/product1.png";
import product2Img from "../assets/items/detailproduct/product2.png";
import product3Img from "../assets/items/detailproduct/product3.png";
import arrowImg from "../assets/items/detailproduct/arrow.svg";

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { openModal } = useModal();
    const [isOpen, setIsOpen] = useState(false); // ドロップダウンメニューの開閉状態を管理
    const [selectedText, setSelectedText] = useState<string>(""); // 選択されたオプションのテキストを管理

    const isSelected = selectedText !== "";

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (text: string, price: string) => {
        setSelectedText(text + (price ? " - " + price : ""));
        setIsOpen(false); // ドロップダウンを閉じる
    };

    const handlePaymentClick = () => {
        if (!user) {
            setCookie('nextpage', 'form', 1);
            openModal('auth');
        } else {
            openModal('form');
        }
    };

    return (
        <div className="main_content">
            <div className="modaldetail page-detail">

                <div className="flexbox">
                    <div className="modaldetail__imgbox">
                        <img className="mainimg" src={shopitemImg} alt="Main Product" />
                        <div className="subimg_box">
                            <img className="subimg_box__img" src={product1Img} alt="Product 1" />
                            <img className="subimg_box__img" src={product2Img} alt="Product 2" />
                            <img className="subimg_box__img" src={product3Img} alt="Product 3" />
                        </div>
                    </div>

                    <div className="modaldetail__textbox">
                        <h2 className="title">ROG Ally (2023) RC71L RC71L-Z1512 - ID: {id}</h2>
                        <div className="tagbox">
                            <span className="tag">レンタル可能数5点</span>
                            <span className="tag">在庫残り3点</span>
                        </div>
                        <p className="text">
                            ASUS ROG Ally RC71Lは、Windows 11 OSと７インチのタッチパネルを搭載する究極のポータブルゲーム機です。AMD社とASUS ROGがポータブルゲーム機用に開発を行った先端のAMD Ryzen Z1 プロセッサーを搭載しています。
                        </p>
                        <div className="spec">
                            <p className="spec__title">スペック</p>
                            <div className="spec__tagbox">
                                <p className="tag">インチ : 7.0型（120Hz）</p>
                                <p className="tag">CPU : Ryzen Z1</p>
                                <p className="tag">OS : Windows 11 Home</p>
                                <p className="tag">メモリ : 16GB/16GB（標準/最大）</p>
                                <p className="tag">ストレージ : SSD : 512GB</p>
                            </div>
                        </div>

                        <h3 className="rental">レンタル期間</h3>

                        <div className={`custom_dropdown ${isOpen ? "active" : ""}`}>
                            <div className="dropdown" onClick={toggleDropdown}>
                                <span className="selecttext">{selectedText || "選択して下さい"}</span>
                                {isOpen && (
                                    <ul className="dropdown_menu">
                                        <li onClick={() => selectOption("1ヶ月", "￥14,500 (税込み)/月")}>
                                            <p className="text">1ヶ月</p>
                                            <p className="price">
                                                ￥14,500<span className="price__tax">(税込み)/月</span>
                                            </p>
                                        </li>
                                        <li onClick={() => selectOption("3ヶ月", "￥13,500 (税込み)/月")}>
                                            <p className="text">3ヶ月</p>
                                            <p className="price">
                                                ￥13,500<span className="price__tax">(税込み)/月</span>
                                            </p>
                                        </li>
                                        <li onClick={() => selectOption("6ヶ月", "￥12,000 (税込み)/月")}>
                                            <p className="text">6ヶ月</p>
                                            <p className="price">
                                                ￥12,000<span className="price__tax">(税込み)/月</span>
                                            </p>
                                        </li>
                                        <li onClick={() => selectOption("12ヶ月", "￥10,000 (税込み)/月")}>
                                            <p className="text">12ヶ月</p>
                                            <p className="price">
                                                ￥10,000<span className="price__tax">(税込み)/月</span>
                                            </p>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* お支払いボタン */}
                <button
                    className={`modaldetail__go_payment ${isSelected ? "active" : ""}`}
                    disabled={!isSelected}
                    onClick={handlePaymentClick}
                >
                    お支払い情報を入力する
                    <img className="mainimg" src={arrowImg} alt="Arrow" />
                </button>
            </div>
        </div>
    );
};

export default Detail;
