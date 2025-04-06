import React from "react";
import img1 from '../../../assets/item/black.jpg';
import img2 from '../../../assets/item/white.jpg';

const ItemComp: React.FC = () => {
    return (
        <a href="#" className="ItemComp">
            <div className="ItemComp_img">
                <img className="img1" src={img1} alt="img" />
                <img className="img2" src={img2} alt="img" />
            </div>
            <div className="ItemComp_text">
                <h3 className="title">CORSAIR K65 PLUS -Cherry Blossom</h3>
                <div className="price_box">
                    <p className="price"><span className="symbol">￥</span><span className="price_number">2500~</span></p>
                    <p className="price red"><span className="symbol">￥</span><span className="price_number">2500~</span></p>
                </div>
            </div>
        </a>
    );
};

export default ItemComp;