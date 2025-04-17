import React from "react";

import LineupSwiperComp from "../component/LineupComp/LineupSwiperComp";
import HotcategoryComp from "../component/LineupComp/HotcategoryComp";
import ItemSwiperComp from "../component/LineupComp/ItemSwiperComp";
import CategoryComp from "../component/LineupComp/CategoryComp";

import HomeAboutComp from "../component/HomeComp/AboutComp";
import HomeCustomerComp from "../component/HomeComp/CustomerComp";
import HomeFaqComp from "../component/HomeComp/FaqComp";
import AddjustComp from "../component/CommonComp/addjustComp";

const Lineup: React.FC = () => {
    return (
        <div className="main_content Lineup">
            {/* <!-- バナーお知らせ--> */}
            <LineupSwiperComp />

            {/* <!-- 人気カテゴリ --> */}
            <HotcategoryComp />

            {/* <!-- 商品スライド欄 --> */}
            <ItemSwiperComp />

            <AddjustComp height="120px" />

            {/* <!-- 新規商品 --> */}
            <CategoryComp />

            <AddjustComp height="120px" />

            {/* <!-- サービス内容・ご利用の流れ --> */}
            <HomeAboutComp />

            <AddjustComp height="200px" />

            {/* <!-- お客様の声 --> */}
            <HomeCustomerComp />

            {/* <!-- よくある質問 --> */}
            <HomeFaqComp />
        </div>
    );
};

export default Lineup;