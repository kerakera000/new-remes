// MypageComp.tsx

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserSubscriptions, SubscriptionData } from "../../lib/firebaseService";
import items from "../../assets/mypage/items.png";
import Vectorwhite from "../../assets/haeder/Vectorwhite.svg";
import Vectorred from "../../assets/haeder/Vectorred.svg";
import { Link } from "react-router-dom";

const MypageComp: React.FC = () => {
    const { user } = useAuth();
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            if (user) {
                try {
                    const subscriptions = await getUserSubscriptions(user.uid);
                    console.log("取得したサブスクリプション情報:", subscriptions);
                    setSubscriptionData(subscriptions);
                } catch (error) {
                    console.error("サブスクリプション情報の取得に失敗しました:", error);
                }
            }
        };

        fetchSubscriptions();
    }, [user]);

    // 日付をフォーマットする関数
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    };

    // 価格をフォーマットする関数
    const formatPrice = (amount: number) => {
        return `￥${amount.toLocaleString()}`;
    };

    return (
        <div className="mypageComp">
            <div className="contract">
                <h2 className="contract__title">契約内容</h2>
                <div className="contract__content">
                    {subscriptionData?.items && subscriptionData.items.length > 0 ? (
                        subscriptionData.items.map((item, index) => (
                            <div key={index} className="col first">
                                <img 
                                    className="img" 
                                    src={item.price.product.images[0] || items} 
                                    alt={item.price.product.name} 
                                />
                                <div className="textbox">
                                    <p className="day">
                                        契約開始日: {formatDate(item.current_period_start)}
                                    </p>
                                    <p className="title">
                                        {item.price.product.name}<br />
                                        {item.price.metadata.label}プラン
                                    </p>
                                    <p className="price">
                                        {formatPrice(item.price.unit_amount)}
                                        <span className="tax">(税込み)/月</span>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-contract">
                            <p className="no-contract__message">契約がまだありません</p>
                            <Link to="/items" className="rental">
                                商品一覧を見る
                                <img className="white" src={Vectorwhite} alt=">" />
                                <img className="red" src={Vectorred} alt=">" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MypageComp;
