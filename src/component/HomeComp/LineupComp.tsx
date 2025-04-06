// LineupComp.tsx

import { Link } from "react-router-dom"

import itemImage1 from "../../assets/items/shopitem.svg"; // 画像のインポート
import itemImage2 from "../../assets/items/shopitem2.svg";
import { useModal } from "../../context/ModalContext";

const LineupComp: React.FC = () => {
    const { openModal } = useModal();

    return (
        <div id="RENTAL" className="lineup">
            <h2 className="LineupTitle_jp">新規ラインナップ</h2>
            <span className="LineupTitle_en">NEW LINEUP</span>

            <div className="lineup__itembox">
                {/* 商品1 */}
                <div className="item">
                    <img className="item__spec" src={itemImage1} alt="Product 1" />
                    <p className="item__title">ROG Ally (2023) RC71L RC71L-Z1512</p>
                    <h2 className="item__tax">
                        ¥5,000<span className="text">(税込)~</span>
                    </h2>
                    <div className="item__btn">
                        <Link to="/lineup/category" className="sample_btn_type1">
                            一覧を見る
                        </Link>
                    </div>
                </div>

                {/* 商品2 */}
                <div className="item">
                    <img className="item__spec" src={itemImage2} alt="Product 2" />
                    <p className="item__title">ROG Ally (2023) RC71L RC71L-Z1512</p>
                    <h2 className="item__tax">
                        ¥5,000<span className="text">(税込)~</span>
                    </h2>
                    <div className="item__btn">
                        <Link to="/lineup/category" className="sample_btn_type1">
                            一覧を見る
                        </Link>
                    </div>
                </div>

                {/* 商品3 */}
                <div className="item">
                    <img className="item__spec" src={itemImage1} alt="Product 3" />
                    <p className="item__title">ROG Ally (2023) RC71L RC71L-Z1512</p>
                    <h2 className="item__tax">
                        ¥5,000<span className="text">(税込)~</span>
                    </h2>
                    <div className="item__btn">
                        <Link to="/lineup/category" className="sample_btn_type1">
                            一覧を見る
                        </Link>
                    </div>
                </div>

                {/* 商品4 */}
                <div className="item">
                    <img className="item__spec" src={itemImage2} alt="Product 4" />
                    <p className="item__title">ROG Ally (2023) RC71L RC71L-Z1512</p>
                    <h2 className="item__tax">
                        ¥5,000<span className="text">(税込)~</span>
                    </h2>
                    <div className="item__btn">
                        <Link to="/lineup/category" className="sample_btn_type1">
                            一覧を見る
                        </Link>
                    </div>
                </div>
            </div>

            <div className="all_btn">
                <Link to="/lineup" className="all_btn_link">
                    全ての商品を見る
                </Link>
            </div>
        </div>

    );
};

export default LineupComp;
