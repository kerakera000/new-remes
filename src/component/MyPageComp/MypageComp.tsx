// MypageComp.tsx

import React, { useEffect } from "react";

import items from "../../assets/mypage/items.png";

const MypageComp: React.FC = () => {

    useEffect(() => {
        // onAuthStateChanged(auth, (user) => {
        //   if (user) {
        //     setUser(user);
        //   } else {
        //     navigate("/");
        //   }
        // });
    }, []);

    return (
        <div className="mypageComp">
            <div className="contract">
                <h2 className="contract__title">契約内容</h2>
                <div className="contract__content">
                    <div className="col first">
                        <img className="img" src={items} alt="" />
                        <div className="textbox">
                            <p className="day">契約開始日:2024年9月10日</p>
                            <p className="title">ROG Ally (2023) RC71L RC71L-Z1512<br />6ヶ月プラン</p>
                            <p className="price">￥14,500<span className="tax">(税込み)/月</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MypageComp;
