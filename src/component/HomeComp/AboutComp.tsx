import React from "react";
import aboutImg1 from "../../assets/main/About1.png";
import aboutImg2 from "../../assets/main/About2.png";
import aboutImg3 from "../../assets/main/About3.png";
import aboutImg4 from "../../assets/main/About4.png";
import aboutImg5 from "../../assets/main/About5.png";
import step1Img from "../../assets/main/step1.png";
import step2Img from "../../assets/main/step2.png";
import step3Img from "../../assets/main/step3.png";
import step4Img from "../../assets/main/step4.png";

const AboutComp: React.FC = () => {
    return (
        <div id="ABOUT" className="about">
            {/* サービス内容 */}
            <div className="about__textbox">
                <div className="imgbox">
                    <img className="img1" src={aboutImg1} alt="About 1" />
                    <img className="img2" src={aboutImg2} alt="About 2" />
                </div>

                <div className="content">
                    <h2 className="Abouttitle">ABOUT</h2>
                    <h3 className="subtitle">
                        購入<span className="small">から</span>レンタル
                        <span className="small">へ</span>
                        <br />
                        最強スペック<span className="small">を</span>すぐお手元に
                    </h3>
                    <p className="text">
                        ここには仮のテキストが入ります。ここには仮のテキストが入ります。ここには仮のテキストが入ります。ここには仮のテキストが入ります。ここには仮のテキストが入ります。ここには仮のテキストが入ります。ここには仮のテキストが入ります。ここには仮のテキストが入ります。
                    </p>
                    <img className="img5" src={aboutImg5} alt="About 5" />
                </div>

                <div className="imgbox">
                    <img className="img3" src={aboutImg3} alt="About 3" />
                    <img className="img4" src={aboutImg4} alt="About 4" />
                </div>

                <div className="spimgbox">
                    <img className="img1 img" src={aboutImg1} alt="About 1" />
                    <img className="img2 img" src={aboutImg2} alt="About 2" />
                    <img className="img3 img" src={aboutImg3} alt="About 3" />
                    <img className="img4 img" src={aboutImg4} alt="About 4" />
                    <img className="img5 img" src={aboutImg5} alt="About 5" />
                </div>
            </div>

            {/* ご利用の流れ */}
            <div className="about__flow">
                <h2 className="flowTitle">FLOW</h2>
                <div className="flow_box">
                    <div className="item">
                        <h3 className="title">STEP 01</h3>
                        <div className="img">
                            <img src={step1Img} alt="Step 1" />
                        </div>
                        <h4 className="subtitle">お好きな商品選択</h4>
                        <p className="text">
                            サイトの"商品紹介"欄から
                            お好きな商品と、レンタル
                            期間を選択します！
                        </p>
                    </div>

                    <div className="item">
                        <h3 className="title">STEP 02</h3>
                        <div className="img">
                            <img src={step2Img} alt="Step 2" />
                        </div>
                        <h4 className="subtitle">商品注文/決済</h4>
                        <p className="text">
                            商品選択後、サイトからお客様
                            情報を入力して注文完了となります！
                        </p>
                    </div>

                    <div className="item">
                        <h3 className="title">STEP 03</h3>
                        <div className="img">
                            <img src={step3Img} alt="Step 2" />
                        </div>
                        <h4 className="subtitle">お届け/プレイ</h4>
                        <p className="text">
                            注文完了から検品して１週間程度でお届けします。届いた瞬間からプレイ可能です！
                        </p>
                    </div>

                    <div className="item">
                        <h3 className="title">STEP 04</h3>
                        <div className="img">
                            <img src={step4Img} alt="Step 4" />
                        </div>
                        <h4 className="subtitle">レンタル期間終了後</h4>
                        <p className="text">
                            レンタル期間が終わったら配送した段ボールに付いている返送用紙で返送できます。
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AboutComp;
