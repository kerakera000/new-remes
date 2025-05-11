import React from "react";
import { Link } from "react-router-dom";

interface ItemCompProps {
    id: string;
    name?: string;
    price?: number;
    images?: string[];
}

const ItemComp: React.FC<ItemCompProps> = ({ id, name, price, images }) => {
    // 価格を日本円形式にフォーマット
    const formattedPrice = price ? price.toLocaleString() : '価格未定';

    return (
        <Link to={`/detail/${id}`} className="ItemComp">
            <div className="ItemComp_img" >
                <img 
                    className="img1" 
                    src={images?.[0]} 
                    alt={name}
                />
                <img 
                    className="img2" 
                    src={images?.length === 1 ? images[0] : images?.[1]} 
                    alt={name}
                />
            </div>
            <div className="ItemComp_text" >
                <h3 className="title">{name}</h3>
                <div className="price_box">
                    <p className="price">
                        <span className="symbol">￥</span>
                        <span className="price_number">{formattedPrice} ~</span>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ItemComp;
