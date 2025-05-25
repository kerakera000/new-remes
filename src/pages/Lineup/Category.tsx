import React from "react";
import CategoryComp from "../../component/LineupComp/CategoryComp";

const Category: React.FC = () => {
    return (
        <div className="main_content">
            <CategoryComp category="all" title="全ての商品" />
        </div>
    );
};

export default Category;
