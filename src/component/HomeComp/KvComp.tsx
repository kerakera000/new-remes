import React from "react";

import ScrollComp from "./KvComponents/ScrollComp"; // ScrollCompコンポーネントをインポート
import kvImage from "../../assets/main/kv.png"; // 画像のパスを適切にインポート
import group28Image from '../../assets/main/kvback.svg';

const KvComp: React.FC = () => {
    return (
        <div className="kv"> {/* クラス名はCSS Modulesを使わない場合 */}
            <p className="kv__title">GAME RENTAL SERVICE</p>

            <div className="kv__box" style={{ backgroundImage: `url(${group28Image})` }}>
                <div className="kv_main_content">
                    <div className="kv__box__cont">
                        <p className="back_lavel">
                            レンタル<span className="small">で</span>無駄なく
                        </p>
                        <p className="back_lavel">
                            快適なゲーミングライフ！
                        </p>

                        <p className="text">ゲーミング環境レンタルサービス</p>
                    </div>

                    <div className="kv__box__imgbox">
                        <img src={kvImage} alt="Gaming PC" />
                    </div>
                </div>

                <div className="kv__box__scroll">
                    <p className="text">SCROLL</p>
                    <ScrollComp /> {/* ScrollCompコンポーネントの使用 */}
                </div>
            </div>
        </div>

    );
};

export default KvComp;