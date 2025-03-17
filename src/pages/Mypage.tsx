// Mypage.tsx

import React, { useState } from "react";

import account1 from "../assets/mypage/Vector.svg";
import account2 from "../assets/mypage/weui_setting-outlined.svg";
import plan1 from "../assets/mypage/plan.svg";

import MypageComp from "../component/MyPageComp/MypageComp";
import AccountComp from "../component/MyPageComp/AccountComp";

const Mypage: React.FC = () => {
    const [Comp, setLocalComp] = useState('default'); // 状態管理

    // 表示するコンポーネントの制御
    const pageComp = () => {
        switch (Comp) {
            case 'SwichAccount':
                return <AccountComp />;  // アカウント設定ページ
            default:
                return <MypageComp />;  // MypageCompにsetLocalCompを渡す
        }
    };

    const handlePageAccount = async () => {
        setLocalComp('SwichAccount');  // アカウント設定ページへ遷移
    };

    const handlePagePlan = async () => {
        setLocalComp('default');
    };

    return (
        <div className="main_content Mypage">
            {pageComp()}
            <div className="setting">
                <div
                    className="setting__cont"
                    onClick={handlePageAccount} // アカウント設定ボタン
                >
                    <div className="imgbox">
                        <img className="imgaccount1" src={account1} alt="" />
                        <img className="imgaccount2" src={account2} alt="" />
                    </div>
                    <div className="textbox">
                        <p className="title">アカウント設定</p>
                        <p className="text">パスワード、住所、メールアドレス、<br />お支払い情報等の確認/変更</p>
                    </div>
                </div>

                <div
                    className="setting__cont"
                    onClick={handlePagePlan} // アカウント設定ボタン
                >
                    <div className="imgbox">
                        <img className="imgplan" src={plan1} alt="" />
                    </div>
                    <div className="textbox">
                        <p className="title">契約プランの確認</p>
                        <p className="text">契約プランの確認、解約はこちらから</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Mypage;
