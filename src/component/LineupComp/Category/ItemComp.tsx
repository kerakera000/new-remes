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
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>
            <div className="ItemComp_text" style={{
                padding: '1rem',
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <h3 className="title" style={{
                    margin: '0 0 0.5rem 0',
                    fontSize: '1rem',
                    fontWeight: 'normal'
                }}>{name}</h3>
                <div className="price_box">
                    <p className="price" style={{
                        margin: '0',
                        fontSize: '1.1rem',
                        fontWeight: 'bold'
                    }}>
                        <span className="symbol">￥</span>
                        <span className="price_number">{formattedPrice} ~</span>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ItemComp;
