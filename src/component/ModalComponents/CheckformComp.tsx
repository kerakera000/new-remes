// CheckformComp
import React, { Dispatch, SetStateAction } from "react";
import { useModal } from "../../context/ModalContext";

import item from "../../assets/items/detailproduct/item.svg";
import arrow1 from "../../assets/modalcomp/arrow1.svg";
import arrow2 from "../../assets/modalcomp/arrow2.svg";
import BreadcrumbComponent from "./BreadcrumbComponents/breadcrumb";

interface CheckformCompProps {
    setComp: Dispatch<SetStateAction<string>>;
    comp: string;
}

const CheckformComp: React.FC<CheckformCompProps> = () => {
    const { openModal } = useModal();

    return (
        <div className="modalcheck">
            {/* パンくずリスト */}
            <BreadcrumbComponent currentStep={2} />

            <div className="flexbox">
                <div className="formbox">
                    <div className="formbox__boxtype">
                        <h2 className="title">配送先情報</h2>
                        <p className="text">山田　太郎/ヤマダ　タロウ</p>
                        <p className="text">〒123-456</p>
                        <p className="text">東京都新宿区歌舞伎町1-1-1-1-1</p>
                        <p className="text">080-5059-8210</p>
                        <p className="text">AIOUE@gmail.com</p>
                        <button className="button">変更する</button>
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
                        <img className="img" src={item} alt="" />
                        <div className="textbox">
                            <p className="textbox__name">ROG Ally (2023) RC71L RC71L-Z1512</p>
                            <p className="textbox__contract_period">契約期間:1年</p>
                            <p className="textbox__price">￥14,500
                                <span className="tax">(税込み)/月</span>
                            </p>
                        </div>
                    </div>
                    <div className="order_item__paybox">
                        <p className="text">合計
                            <span className="text__price">￥14,500</span>
                            <span className="text__tax">(税込み)/月</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="submitbuttons">
                <div className="submitbuttons__button">
                    <button className="btn1" onClick={() => openModal('form')} >
                        <img className="btn1__img" src={arrow2} alt="戻る" />
                        <span className="btn1__text">戻る</span>
                    </button>
                    <button className="btn2">
                        <span className="btn2__text">確認する</span>
                        <img className="btn2__img" src={arrow1} alt="注文する" />
                    </button>
                </div>
            </div>
        </div>

    );
};

export default CheckformComp;