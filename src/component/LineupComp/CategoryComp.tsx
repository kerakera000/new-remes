import React from "react";
import ItemComp from "./Category/ItemComp";

const CategoryComp: React.FC = () => {
    // サンプルデータ配列
    const items = [1, 2, 3, 4, 5];

    return (
        <div className="CategoryComp">
            <h2 className="CategoryComp__title">新規商品</h2>
            <div className="CategoryComp__content">
                {items.map((item, index) => (
                    <ItemComp key={index} id={item.toString()} />
                ))}
            </div>
        </div>
    );
};

export default CategoryComp;
