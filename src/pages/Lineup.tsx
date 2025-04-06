import React from "react";

import LineupSwiperComp from "../component/LineupComp/LineupSwiperComp";
import HotcategoryComp from "../component/LineupComp/HotcategoryComp";
import ItemSwiperComp from "../component/LineupComp/ItemSwiperComp";
import CategoryComp from "../component/LineupComp/CategoryComp";

const Lineup: React.FC = () => {
    return (
        <div className="main_content Lineup">
            <LineupSwiperComp />
            <HotcategoryComp />
            <ItemSwiperComp />
            <CategoryComp />
        </div>
    );
};

export default Lineup;