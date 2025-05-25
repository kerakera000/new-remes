import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { createCheckoutSession } from "../lib/stripeService";

import item from "../assets/items/detailproduct/item.svg";
import arrow1 from "../assets/modalcomp/arrow1.svg";
import arrow2 from "../assets/modalcomp/arrow2.svg";
import BreadcrumbComponent from "../component/ModalComponents/BreadcrumbComponents/breadcrumb";

interface UserData {
    lastname?: string;
    firstname?: string;
    lastnamekana?: string;
    firstnamekana?: string;
    postcode?: string;
    prefectures?: string;
    municipalities?: string;
    BuildingNameRoomNumber?: string;
    phone?: string;
    email?: string;
}

interface ProductData {
    id: string;
    name: string;
    price: {
        id: string;
        labels: string[];
        unit_amount: number;
    };
    images: string[];
}

const Check: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const productData = location.state?.productData as ProductData;
    const [userData, setUserData] = useState<UserData>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('Check.tsx - 受け取った商品データ:', productData);

        const fetchUserData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const db = getFirestore();
                const docRef = doc(db, "customers", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as UserData;
                    setUserData(data);
                } else {
                    console.error("ユーザーデータが存在しません。");
                }
            }
        };

        fetchUserData();
    }, []);

    const handleBack = () => {
        window.history.back();
    };

    const handlePayment = async () => {
        try {
            setIsLoading(true);
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                alert('ログインが必要です');
                navigate('/login');
                return;
            }

            console.log('Product Data:', productData);
            console.log('Price ID:', productData?.price?.id);

            if (!productData?.price?.id) {
                throw new Error('商品情報が不正です: 価格IDが設定されていません');
            }

            const successUrl = `${window.location.origin}/success`;
            const cancelUrl = `${window.location.origin}/check`;

            await createCheckoutSession({
                priceId: productData.price.id, // 商品のStripe Price ID
                successUrl,
                cancelUrl
            });

        } catch (error) {
            console.error('決済処理中にエラーが発生しました:', error);
            alert('決済処理中にエラーが発生しました。もう一度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-check">
            {/* パンくずリスト */}
            <BreadcrumbComponent currentStep={2} />

            <div className="flexbox">
                <div className="formbox">
                    <div className="formbox__boxtype">
                        <h2 className="title">配送先情報</h2>
                        <p className="text">{userData.lastname} {userData.firstname} / {userData.lastnamekana} {userData.firstnamekana}</p>
                        <p className="text">〒{userData.postcode}</p>
                        <p className="text">{userData.prefectures}{userData.municipalities}{userData.BuildingNameRoomNumber}</p>
                        <p className="text">{userData.phone}</p>
                        <p className="text">{userData.email}</p>
                        <button className="button" onClick={handleBack}>変更する</button>
                    </div>

                    <div className="formbox__texttype">
                        <p className="text">
                            ご注文確定後2時間以内にお問い合わせいただければキャンセルが可能です。<br/><br/>

                            発送方法はヤマト運輸のネコポスになります。送料は全国一律500円で、5営業日以内（土日祝を除く）に商品を発送いたします。ご注文はすべての商品の在庫状況を確認次第、確定します。<br/><br/>

                            配送状況は、ご注文商品発送完了のお知らせメールに記載された追跡番号を使ってご確認いただけます。<br/><br/>

                            ご注文配送より7日以内であれば、購入された商品の返品が可能です。初期不良、別の商品が届いてしまった場合返品にかかる送料のみ無料です。その場合以外で着払いで発送した際後ほど請求させていただきます。セール品および返品不可と記載の商品は返品できません。予めご了承ください。
                            返品、交換の際はお問い合わせください。
                        </p>
                    </div>
                </div>

                <div className="order_item">
                    <h2 className="order_item__title">ご注文商品</h2>
                    <div className="order_item__content">
                        <img className="img" src={productData?.images[0] || item} alt="" />
                        <div className="textbox">
                            <p className="textbox__name">{productData?.name}</p>
                            <p className="textbox__contract_period">契約期間: {productData?.price.labels[0]}</p>
                            <p className="textbox__price">￥{productData?.price.unit_amount.toLocaleString()}
                                <span className="tax">(税込み)/月</span>
                            </p>
                        </div>
                    </div>
                    <div className="order_item__paybox">
                        <p className="text">合計
                            <span className="text__price">￥{productData?.price.unit_amount.toLocaleString()}</span>
                            <span className="text__tax">(税込み)/月</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="submitbuttons">
                <div className="submitbuttons__button">
                    <button className="btn1" onClick={handleBack}>
                        <img className="btn1__img" src={arrow2} alt="戻る" />
                        <span className="btn1__text">戻る</span>
                    </button>
                    <button 
                        className="btn2" 
                        onClick={handlePayment}
                        disabled={isLoading}
                    >
                        <span className="btn2__text">
                            {isLoading ? '処理中...' : '決済へ進む'}
                        </span>
                        <img className="btn2__img" src={arrow1} alt="注文する" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Check;
