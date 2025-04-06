import React from "react";
import ItemComp from "./Category/ItemComp";

const CategoryComp: React.FC = () => {
    // サンプルデータ配列
    const items = [1, 2, 3, 4, 5];

    return (
        <div className="CategoryComp">
            {items.map((item, index) => (
                <ItemComp key={index} />
            ))}
        </div>
    );
};

export default CategoryComp;