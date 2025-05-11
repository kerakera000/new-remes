import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useModal } from "../context/ModalContext";
import { setCookie } from '../utils/cookies';
import { getProductById } from '../lib/firebaseService';

import arrowImg from "../assets/items/detailproduct/arrow.svg";

interface Product {
    id: string;
    name?: string;
    description?: string;
    price?: number;
    images?: string[];
    specs?: {
        [key: string]: string;
    };
    rentalOptions?: {
        period: string;
        price: number;
    }[];
}

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { openModal } = useModal();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedText, setSelectedText] = useState<string>("");
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProduct = async () => {
            if (!id) return;
            try {
                const productData = await getProductById(id);
                setProduct(productData);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const isSelected = selectedText !== "";

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (text: string, price: string) => {
        setSelectedText(text + (price ? " - " + price : ""));
        setIsOpen(false);
    };

    const handlePaymentClick = () => {
        if (!user) {
            setCookie('nextpage', 'form', 1);
            openModal('auth');
        } else {
            openModal('form');
        }
    };

    if (loading) {
        return <div>読み込み中...</div>;
    }

    if (!product) {
        return <div>商品が見つかりませんでした。</div>;
    }

    return (
        <div className="main_content">
            <div className="modaldetail page-detail">
                <div className="flexbox">
                    <div className="modaldetail__imgbox">
                        <img className="mainimg" src={product.images?.[0]} alt={product.name} />
                        <div className="subimg_box">
                            {product.images?.slice(1).map((image, index) => (
                                <img 
                                    key={index}
                                    className="subimg_box__img" 
                                    src={image} 
                                    alt={`${product.name} - ${index + 2}`} 
                                />
                            ))}
                        </div>
                    </div>

                    <div className="modaldetail__textbox">
                        <h2 className="title">{product.name}</h2>
                        <div className="tagbox">
                            <span className="tag">レンタル可能数5点</span>
                            <span className="tag">在庫残り3点</span>
                        </div>
                        <p className="text">{product.description}</p>
                        
                        {product.specs && (
                            <>
                                <p className="spec__title">スペック</p>
                                <div className="spec__tagbox">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <p key={key} className="tag">{key} : {value}</p>
                                    ))}
                                </div>
                            </>
                        )}

                        <h3 className="rental">レンタル期間</h3>

                        <div className={`custom_dropdown ${isOpen ? "active" : ""}`}>
                            <div className="dropdown" onClick={toggleDropdown}>
                                <span className="selecttext">{selectedText || "選択して下さい"}</span>
                                {isOpen && (
                                    <ul className="dropdown_menu">
                                        {product.rentalOptions?.map((option) => (
                                            <li key={option.period} onClick={() => selectOption(option.period, `￥${option.price.toLocaleString()} (税込み)/月`)}>
                                                <p className="text">{option.period}</p>
                                                <p className="price">
                                                    ￥{option.price.toLocaleString()}<span className="price__tax">(税込み)/月</span>
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

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
