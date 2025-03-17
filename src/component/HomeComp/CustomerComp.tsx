import React from "react";
import maskGroup1 from "../../assets/main/customer/Maskgroup.svg";
import maskGroup2 from "../../assets/main/customer/Maskgroup2.svg";
import maskGroup3 from "../../assets/main/customer/Maskgroup3.svg";
import maskGroup4 from "../../assets/main/customer/Maskgroup4.svg";

const CustomerComp: React.FC = () => {
    return (
        <div id="CUSTOMER" className="customer">
            <div className="customer__content">
                <h2 className="LineupTitle_jp">お客様の声</h2>
                <span className="LineupTitle_en">
                    CUSTOMER<br />
                    REVIEWS
                </span>

                <div className="customer__content__box">
                    {/* Card 1 */}
                    <div className="card">
                        <div className="imgbox">
                            <img className="img" src={maskGroup1} alt="Customer 1" />
                            <span className="age">20代男性</span>
                        </div>
                        <p className="text">
                            ASUS ROG Ally RC71Lは、Windows 11 OSと７インチのタッチパネルを搭載する究極のポータブルゲーム機です。
                            <span className="red">AMD社とASUS ROG</span>
                            がポータブルゲーム機用に開発を行った
                            <br />
                            <span className="age">20代 男性</span>
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="card">
                        <div className="imgbox">
                            <img className="img" src={maskGroup2} alt="Customer 2" />
                            <span className="age">20代男性</span>
                        </div>
                        <p className="text">
                            ASUS ROG Ally RC71Lは、Windows 11 OSと７インチのタッチパネルを搭載する究極のポータブルゲーム機です。
                            <span className="red">AMD社とASUS ROG</span>
                            がポータブルゲーム機用に開発を行った
                            <br />
                            <span className="age">20代 男性</span>
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="card">
                        <div className="imgbox">
                            <img className="img" src={maskGroup3} alt="Customer 3" />
                            <span className="age">20代男性</span>
                        </div>
                        <p className="text">
                            ASUS ROG Ally RC71Lは、Windows 11 OSと７インチのタッチパネルを搭載する究極のポータブルゲーム機です。
                            <span className="red">AMD社とASUS ROG</span>
                            がポータブルゲーム機用に開発を行った
                            <br />
                            <span className="age">20代 男性</span>
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="card">
                        <div className="imgbox">
                            <img className="img" src={maskGroup4} alt="Customer 4" />
                            <span className="age">20代男性</span>
                        </div>
                        <p className="text">
                            ASUS ROG Ally RC71Lは、Windows 11 OSと７インチのタッチパネルを搭載する究極のポータブルゲーム機です。
                            <span className="red">AMD社とASUS ROG</span>
                            がポータブルゲーム機用に開発を行った
                            <br />
                            <span className="age">20代 男性</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CustomerComp;
